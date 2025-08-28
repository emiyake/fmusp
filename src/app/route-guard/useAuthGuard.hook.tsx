import { useSyncTabLocalStorage } from '@app/core/storage';
import { useUserStore, userStoreInstance } from '@app/stores';
import { isTokenExpired } from '@utils/token.utils';

export const useAuthorized = () => {
  const [user] = useUserStore();
  const isAuthenticated = !isTokenExpired(user?.token);

  useSyncTabLocalStorage({
    storageKey: localStorage.User,
    onChange: () => userStoreInstance.refreshState(),
  });

  return isAuthenticated && !!user?.email;
};
