import { type IStore, LocalStore, useStore } from '@app/core/store';
import { LocalStorageKeys } from './storage-constants';

interface Theme {
  darkMode: boolean;
}

const LOCAL_STORAGE_THEME_KEY = LocalStorageKeys.Theme;

class ThemeStore extends LocalStore<Theme> implements IStore<Theme> {}

export const themeStoreInstance = new ThemeStore(LOCAL_STORAGE_THEME_KEY);

export const useThemeStore = (): [Theme | null | undefined, IStore.StateSetter<Theme>] =>
  useStore<Theme>(themeStoreInstance);
