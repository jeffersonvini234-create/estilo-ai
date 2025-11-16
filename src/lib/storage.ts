import { GeneratedLook } from './types';

const STORAGE_KEY = 'estilo-ai-looks';

export const getAllLooks = (): GeneratedLook[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveLook = (look: GeneratedLook): void => {
  const looks = getAllLooks();
  looks.unshift(look);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(looks));
};

export const toggleFavorite = (id: string): void => {
  const looks = getAllLooks();
  const updated = looks.map(look => 
    look.id === id ? { ...look, isFavorite: !look.isFavorite } : look
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const deleteLook = (id: string): void => {
  const looks = getAllLooks();
  const filtered = looks.filter(look => look.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const getFavorites = (): GeneratedLook[] => {
  return getAllLooks().filter(look => look.isFavorite);
};
