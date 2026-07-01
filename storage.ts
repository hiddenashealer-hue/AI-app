// Lightweight storage helper with fallbacks:
// - React Native AsyncStorage if available at runtime
// - browser localStorage when present
// - in-memory fallback

type StorageLike = {
  getItem: (k: string) => Promise<string | null>;
  setItem: (k: string, v: string) => Promise<void>;
  removeItem: (k: string) => Promise<void>;
};

let backend: StorageLike | null = null;

function makeInMemory(): StorageLike {
  const map: Record<string, string> = {};
  return {
    getItem: async (k: string) => (k in map ? map[k] : null),
    setItem: async (k: string, v: string) => { map[k] = v; },
    removeItem: async (k: string) => { delete map[k]; },
  };
}

function detectBackend(): StorageLike {
  if (backend) return backend;

  // Try React Native AsyncStorage dynamically
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    if (AsyncStorage && AsyncStorage.getItem) {
      backend = {
        getItem: (k: string) => AsyncStorage.getItem(k),
        setItem: (k: string, v: string) => AsyncStorage.setItem(k, v),
        removeItem: (k: string) => AsyncStorage.removeItem(k),
      };
      return backend;
    }
  } catch (e) {
    // Not available, continue
  }

  // Try browser localStorage
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      backend = {
        getItem: async (k: string) => Promise.resolve(window.localStorage.getItem(k)),
        setItem: async (k: string, v: string) => Promise.resolve(window.localStorage.setItem(k, v)),
        removeItem: async (k: string) => Promise.resolve(window.localStorage.removeItem(k)),
      };
      return backend;
    }
  } catch (e) {
    // ignore
  }

  // Fallback
  backend = makeInMemory();
  return backend;
}

export async function storageGet(key: string): Promise<string | null> {
  const b = detectBackend();
  return b.getItem(key);
}

export async function storageSet(key: string, value: string): Promise<void> {
  const b = detectBackend();
  return b.setItem(key, value);
}

export async function storageRemove(key: string): Promise<void> {
  const b = detectBackend();
  return b.removeItem(key);
}
