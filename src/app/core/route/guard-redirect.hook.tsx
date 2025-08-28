import { useEffect } from 'react';

import { type NavigateOptions, useNavigate } from 'react-router';

interface RedirectHookProps {
  canAccessRoute: boolean;
  path: string;
  options?: NavigateOptions;
}

export const useGuardRedirect = ({ canAccessRoute, path, options }: RedirectHookProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!canAccessRoute) {
      navigate(path, {
        replace: true,
        ...options,
      });
    }
  }, [canAccessRoute, path, navigate, options]);
};
