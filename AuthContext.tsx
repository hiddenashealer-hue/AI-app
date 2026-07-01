import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  displayName: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isGuest: boolean;
  signIn: (displayName: string, avatar: string) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "@studyvid_auth";

const AVATARS = ["bookworm", "artist", "scientist", "explorer", "musician"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        setUser(parsed.user);
        setIsGuest(parsed.isGuest || false);
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (displayName: string, avatar: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      displayName,
      avatar,
    };
    try {
      await AsyncStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ user: newUser, isGuest: false }),
      );
      setUser(newUser);
      setIsGuest(false);
    } catch (error) {
      console.error("Failed to sign in:", error);
      throw error;
    }
  };

  const signInAsGuest = async () => {
    const guestUser: User = {
      id: `guest_${Date.now()}`,
      displayName: "Student",
      avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    };
    try {
      await AsyncStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ user: guestUser, isGuest: true }),
      );
      setUser(guestUser);
      setIsGuest(true);
    } catch (error) {
      console.error("Failed to sign in as guest:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      await AsyncStorage.removeItem("@studyvid_chat_history");
      await AsyncStorage.removeItem("@studyvid_saved_topics");
      await AsyncStorage.removeItem("@studyvid_video_projects");
      await AsyncStorage.removeItem("@studyvid_recent_searches");
      setUser(null);
      setIsGuest(false);
    } catch (error) {
      console.error("Failed to sign out:", error);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    try {
      await AsyncStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ user: updatedUser, isGuest }),
      );
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isGuest,
        signIn,
        signInAsGuest,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AVATARS };
