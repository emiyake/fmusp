import { useNavigate, useSearchParams } from 'react-router';
import { NEXT_PATH_PARAM_NAME } from './guard-element.component';

interface UseNavigateToNextRouteParams {
  fallbackRoute: string;
}

export const useNavigateToNextRoute = ({ fallbackRoute }: UseNavigateToNextRouteParams = { fallbackRoute: '/' }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const navigateToNextRoute = () => {
    const nextPath = params.get(NEXT_PATH_PARAM_NAME);

    if (!nextPath) {
      navigate(fallbackRoute);
      return;
    }

    navigate(nextPath);
  };

  return { navigateToNextRoute };
};
