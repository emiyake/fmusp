import { useMutation } from '@app/data/graphql';
import {
  LoginDocument,
  type LoginMutation,
  type LoginMutationVariables,
} from '@app/data/graphql/generated/login.mutation';
import type { AppError } from '@app/model';
import { useUserStore } from '@app/stores';

interface LoginUseCaseParams {
  onCompleted?: () => void;
  onError?: () => void;
}

export function useLogin(params?: LoginUseCaseParams): {
  login: (variables?: LoginMutationVariables) => void;
  data?: LoginMutation;
  error?: AppError;
  loading: boolean;
} {
  const [, setUser] = useUserStore();
  const [login, { data, error, loading }] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
    onCompleted: loginResult => {
      setUser({
        ...loginResult?.login?.user,
        token: loginResult?.login?.token,
      });
      params?.onCompleted?.();
    },
    onError: params?.onError,
  });

  return {
    login,
    data,
    error,
    loading,
  };
}
