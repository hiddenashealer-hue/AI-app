import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ------------------------------------------
// Language Types
// ------------------------------------------

export type Language = "en" | "es" | "fr" | "hi" | "zh";


interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: "en", name: "English", nativeName: "English", flag: "GB" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "ES" },
  { code: "fr", name: "French", nativeName: "Français", flag: "FR" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "IN" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "CN" },
];

// ------------------------------------------
// Translation Keys Type
// ------------------------------------------

export type TranslationKey =
  | "discover"
  | "chat"
  | "library"
  | "profile"
  | "studyAssistant"
  | "searchTopics"
  | "voiceSearch"
  | "generateVideo"
  | "trending"
  | "recentSearches"
  | "noVideosYet"
  | "startCreating"
  | "settings"
  | "language"
  | "logout"
  | "send"
  | "typeMessage"
  | "askAnything"
  | "videoIdeas"
  | "explainTopic"
  | "savedTopics"
  | "recentProjects"
  | "welcome"
  | "getStarted"
  | "appDescription"
  | "signIn"
  | "continueAsGuest"
  | "selectLanguage"
  | "notifications"
  | "darkMode"
  | "about"
  | "helpSupport"
  | "title"
  | "description"
  | "duration"
  | "generate"
  | "preview"
  | "save"
  | "cancel"
  | "delete"
  | "edit"
  | "share"
  | "loading"
  | "error"
  | "tryAgain"
  | "noResults"
  | "recording"
  | "processing"
  | "science"
  | "math"
  | "history"
  | "geography"
  | "literature"
  | "art"
  | "music"
  | "technology"
  | "sports"
  | "languages";

// ------------------------------------------
// Translations
// ------------------------------------------

const translations: Record<Language, Record<TranslationKey, string>> = {
  // ---------------- English ----------------
  en: {
    discover: "Discover",
    chat: "Chat",
    library: "Library",
    profile: "Profile",
    studyAssistant: "Study Assistant",
    searchTopics: "Search topics...",
    voiceSearch: "Voice search",
    generateVideo: "Generate Video",
    trending: "Trending Topics",
    recentSearches: "Recent Searches",
    noVideosYet: "No videos yet",
    startCreating: "Start creating your first video",
    settings: "Settings",
    language: "Language",
    logout: "Log Out",
    send: "Send",
    typeMessage: "Type a message...",
    askAnything: "Ask me anything",
    videoIdeas: "Video ideas",
    explainTopic: "Explain a topic",
    savedTopics: "Saved Topics",
    recentProjects: "Recent Projects",
    welcome: "Welcome to StudyVid",
    getStarted: "Get Started",
    appDescription: "Create educational videos with AI assistance",
    signIn: "Sign In",
    continueAsGuest: "Continue as Guest",
    selectLanguage: "Select Language",
    notifications: "Notifications",
    darkMode: "Dark Mode",
    about: "About",
    helpSupport: "Help & Support",
    title: "Title",
    description: "Description",
    duration: "Duration",
    generate: "Generate",
    preview: "Preview",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    share: "Share",
    loading: "Loading...",
    error: "Something went wrong",
    tryAgain: "Try Again",
    noResults: "No results found",
    recording: "Recording...",
    processing: "Processing...",
    science: "Science",
    math: "Math",
    history: "History",
    geography: "Geography",
    literature: "Literature",
    art: "Art",
    music: "Music",
    technology: "Technology",
    sports: "Sports",
    languages: "Languages",
  },

  // ---------------- Spanish ----------------
  es: {
    discover: "Descubrir",
    chat: "Chat",
    library: "Biblioteca",
    profile: "Perfil",
    studyAssistant: "Asistente de Estudio",
    searchTopics: "Buscar temas...",
    voiceSearch: "Búsqueda por voz",
    generateVideo: "Generar Video",
    trending: "Temas Populares",
    recentSearches: "Búsquedas Recientes",
    noVideosYet: "Sin videos aún",
    startCreating: "Comienza a crear tu primer video",
    settings: "Configuración",
    language: "Idioma",
    logout: "Cerrar Sesión",
    send: "Enviar",
    typeMessage: "Escribe un mensaje...",
    askAnything: "Pregúntame lo que quieras",
    videoIdeas: "Ideas de video",
    explainTopic: "Explicar un tema",
    savedTopics: "Temas Guardados",
    recentProjects: "Proyectos Recientes",
    welcome: "Bienvenido a StudyVid",
    getStarted: "Comenzar",
    appDescription: "Crea videos educativos con IA",
    signIn: "Iniciar Sesión",
    continueAsGuest: "Continuar como Invitado",
    selectLanguage: "Seleccionar Idioma",
    notifications: "Notificaciones",
    darkMode: "Modo Oscuro",
    about: "Acerca de",
    helpSupport: "Ayuda y Soporte",
    title: "Título",
    description: "Descripción",
    duration: "Duración",
    generate: "Generar",
    preview: "Vista Previa",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    share: "Compartir",
    loading: "Cargando...",
    error: "Algo salió mal",
    tryAgain: "Intentar de Nuevo",
    noResults: "Sin resultados",
    recording: "Grabando...",
    processing: "Procesando...",
    science: "Ciencia",
    math: "Matemáticas",
    history: "Historia",
    geography: "Geografía",
    literature: "Literatura",
    art: "Arte",
    music: "Música",
    technology: "Tecnología",
    sports: "Deportes",
    languages: "Idiomas",
  },

  // ---------------- French ----------------
  fr: {
    discover: "Découvrir",
    chat: "Discussion",
    library: "Bibliothèque",
    profile: "Profil",
    studyAssistant: "Assistant d'étude",
    searchTopics: "Rechercher des sujets...",
    voiceSearch: "Recherche vocale",
    generateVideo: "Générer une Vidéo",
    trending: "Sujets Tendance",
    recentSearches: "Recherches Récentes",
    noVideosYet: "Pas encore de vidéos",
    startCreating: "Commencez à créer votre première vidéo",
    settings: "Paramètres",
    language: "Langue",
    logout: "Déconnexion",
    send: "Envoyer",
    typeMessage: "Tapez un message...",
    askAnything: "Demandez-moi n'importe quoi",
    videoIdeas: "Idées de vidéo",
    explainTopic: "Expliquer un sujet",
    savedTopics: "Sujets Sauvegardés",
    recentProjects: "Projets Récents",
    welcome: "Bienvenue sur StudyVid",
    getStarted: "Commencer",
    appDescription: "Créez des vidéos éducatives avec l'IA",
    signIn: "Se Connecter",
    continueAsGuest: "Continuer en tant qu'invité",
    selectLanguage: "Choisir la langue",
    notifications: "Notifications",
    darkMode: "Mode Sombre",
    about: "À Propos",
    helpSupport: "Aide & Support",
    title: "Titre",
    description: "Description",
    duration: "Durée",
    generate: "Générer",
    preview: "Aperçu",
    save: "Sauvegarder",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    share: "Partager",
    loading: "Chargement...",
    error: "Une erreur s'est produite",
    tryAgain: "Réessayer",
    noResults: "Aucun résultat",
    recording: "Enregistrement...",
    processing: "Traitement...",
    science: "Science",
    math: "Mathématiques",
    history: "Histoire",
    geography: "Géographie",
    literature: "Littérature",
    art: "Art",
    music: "Musique",
    technology: "Technologie",
    sports: "Sports",
    languages: "Langues",
  },

  // ---------------- Hindi ----------------
  hi: {
    discover: "खोजें",
    chat: "चैट",
    library: "पुस्तकालय",
    profile: "प्रोफ़ाइल",
    studyAssistant: "अध्ययन सहायक",
    searchTopics: "विषय खोजें...",
    voiceSearch: "वॉइस खोज",
    generateVideo: "वीडियो बनाएं",
    trending: "ट्रेंडिंग विषय",
    recentSearches: "हाल की खोजें",
    noVideosYet: "अभी कोई वीडियो नहीं",
    startCreating: "अपना पहला वीडियो बनाएं",
    settings: "सेटिंग्स",
    language: "भाषा",
    logout: "लॉग आउट",
    send: "भेजें",
    typeMessage: "संदेश टाइप करें...",
    askAnything: "कुछ भी पूछें",
    videoIdeas: "वीडियो आइडियाज़",
    explainTopic: "विषय समझाएँ",
    savedTopics: "सहेजे गए विषय",
    recentProjects: "हाल के प्रोजेक्ट",
    welcome: "StudyVid में आपका स्वागत है",
    getStarted: "शुरू करें",
    appDescription: "AI की मदद से शैक्षिक वीडियो बनाएं",
    signIn: "साइन इन करें",
    continueAsGuest: "मेहमान के रूप में जारी रखें",
    selectLanguage: "भाषा चुनें",
    notifications: "सूचनाएँ",
    darkMode: "डार्क मोड",
    about: "जानकारी",
    helpSupport: "मदद और सहायता",
    title: "शीर्षक",
    description: "विवरण",
    duration: "अवधि",
    generate: "बनाएं",
    preview: "पूर्वावलोकन",
    save: "सहेजें",
    cancel: "रद्द",
    delete: "हटाएं",
    edit: "संपादित करें",
    share: "साझा करें",
    loading: "लोड हो रहा है...",
    error: "कुछ गलत हो गया",
    tryAgain: "फिर से प्रयास करें",
    noResults: "कोई परिणाम नहीं",
    recording: "रिकॉर्डिंग...",
    processing: "प्रोसेसिंग...",
    science: "विज्ञान",
    math: "गणित",
    history: "इतिहास",
    geography: "भूगोल",
    literature: "साहित्य",
    art: "कला",
    music: "संगीत",
    technology: "प्रौद्योगिकी",
    sports: "खेल",
    languages: "भाषाएँ",
  },

  // ---------------- Chinese ----------------
  zh: {
    discover: "发现",
    chat: "聊天",
    library: "库",
    profile: "个人资料",
    studyAssistant: "学习助手",
    searchTopics: "搜索主题...",
    voiceSearch: "语音搜索",
    generateVideo: "生成视频",
    trending: "热门话题",
    recentSearches: "最近搜索",
    noVideosYet: "暂无视频",
    startCreating: "开始制作第一个视频",
    settings: "设置",
    language: "语言",
    logout: "退出登录",
    send: "发送",
    typeMessage: "输入消息...",
    askAnything: "问我任何问题",
    videoIdeas: "视频创意",
    explainTopic: "解释主题",
    savedTopics: "已保存主题",
    recentProjects: "最近项目",
    welcome: "欢迎使用 StudyVid",
    getStarted: "开始",
    appDescription: "使用 AI 创建教育视频",
    signIn: "登录",
    continueAsGuest: "以访客身份继续",
    selectLanguage: "选择语言",
    notifications: "通知",
    darkMode: "深色模式",
    about: "关于",
    helpSupport: "帮助与支持",
    title: "标题",
    description: "描述",
    duration: "时长",
    generate: "生成",
    preview: "预览",
    save: "保存",
    cancel: "取消",
    delete: "删除",
    edit: "编辑",
    share: "分享",
    loading: "加载中...",
    error: "出错了",
    tryAgain: "重试",
    noResults: "没有找到结果",
    recording: "录音中...",
    processing: "处理中...",
    science: "科学",
    math: "数学",
    history: "历史",
    geography: "地理",
    literature: "文学",
    art: "艺术",
    music: "音乐",
    technology: "技术",
    sports: "运动",
    languages: "语言",
  },
};

// ------------------------------------------
// Context & Provider
// ------------------------------------------

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem("app_language");
      if (saved) setLanguageState(saved as Language);
    };
    load();
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    await AsyncStorage.setItem("app_language", lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
