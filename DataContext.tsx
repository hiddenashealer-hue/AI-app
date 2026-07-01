import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SavedTopic {
  id: string;
  title: string;
  category: string;
  timestamp: number;
}

export interface VideoProject {
  id: string;
  title: string;
  description: string;
  topic: string;
  duration: number;
  status: "draft" | "generating" | "completed";
  createdAt: number;
  updatedAt: number;
}

interface DataContextType {
  savedTopics: SavedTopic[];
  videoProjects: VideoProject[];
  recentSearches: string[];
  saveTopic: (topic: Omit<SavedTopic, "id" | "timestamp">) => Promise<void>;
  removeTopic: (id: string) => Promise<void>;
  addVideoProject: (project: Omit<VideoProject, "id" | "createdAt" | "updatedAt">) => Promise<VideoProject>;
  updateVideoProject: (id: string, updates: Partial<VideoProject>) => Promise<void>;
  removeVideoProject: (id: string) => Promise<void>;
  addRecentSearch: (query: string) => Promise<void>;
  clearRecentSearches: () => Promise<void>;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const TOPICS_KEY = "@studyvid_saved_topics";
const PROJECTS_KEY = "@studyvid_video_projects";
const SEARCHES_KEY = "@studyvid_recent_searches";

export function DataProvider({ children }: { children: ReactNode }) {
  const [savedTopics, setSavedTopics] = useState<SavedTopic[]>([]);
  const [videoProjects, setVideoProjects] = useState<VideoProject[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [topicsData, projectsData, searchesData] = await Promise.all([
        AsyncStorage.getItem(TOPICS_KEY),
        AsyncStorage.getItem(PROJECTS_KEY),
        AsyncStorage.getItem(SEARCHES_KEY),
      ]);

      if (topicsData) setSavedTopics(JSON.parse(topicsData));
      if (projectsData) setVideoProjects(JSON.parse(projectsData));
      if (searchesData) setRecentSearches(JSON.parse(searchesData));
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTopic = async (topic: Omit<SavedTopic, "id" | "timestamp">) => {
    const newTopic: SavedTopic = {
      ...topic,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    const updated = [newTopic, ...savedTopics];
    setSavedTopics(updated);
    await AsyncStorage.setItem(TOPICS_KEY, JSON.stringify(updated));
  };

  const removeTopic = async (id: string) => {
    const updated = savedTopics.filter((t) => t.id !== id);
    setSavedTopics(updated);
    await AsyncStorage.setItem(TOPICS_KEY, JSON.stringify(updated));
  };

  const addVideoProject = async (project: Omit<VideoProject, "id" | "createdAt" | "updatedAt">) => {
    const newProject: VideoProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const updated = [newProject, ...videoProjects];
    setVideoProjects(updated);
    await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    return newProject;
  };

  const updateVideoProject = async (id: string, updates: Partial<VideoProject>) => {
    const updated = videoProjects.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p
    );
    setVideoProjects(updated);
    await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
  };

  const removeVideoProject = async (id: string) => {
    const updated = videoProjects.filter((p) => p.id !== id);
    setVideoProjects(updated);
    await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
  };

  const addRecentSearch = async (query: string) => {
    const filtered = recentSearches.filter((s) => s.toLowerCase() !== query.toLowerCase());
    const updated = [query, ...filtered].slice(0, 10);
    setRecentSearches(updated);
    await AsyncStorage.setItem(SEARCHES_KEY, JSON.stringify(updated));
  };

  const clearRecentSearches = async () => {
    setRecentSearches([]);
    await AsyncStorage.removeItem(SEARCHES_KEY);
  };

  return (
    <DataContext.Provider
      value={{
        savedTopics,
        videoProjects,
        recentSearches,
        saveTopic,
        removeTopic,
        addVideoProject,
        updateVideoProject,
        removeVideoProject,
        addRecentSearch,
        clearRecentSearches,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}