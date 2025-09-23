import { Navigate, Outlet, useLocation } from 'react-router';

export type RouteGuard = () => boolean;

export interface GuardElementProps {
  useGuard: RouteGuard;
  redirectPath: string;
  sendPreviousPath?: boolean;
}

export const NEXT_PATH_PARAM_NAME = 'nextPath';

export const GuardElement = (props: GuardElementProps) => {
  const location = useLocation();
  const authorized = props.useGuard();

  const oldParams = new URLSearchParams(location.search);

  let targetUrl = oldParams.get(NEXT_PATH_PARAM_NAME);

  if (!targetUrl) {
    targetUrl = props.redirectPath;

    if (props.sendPreviousPath) {
      const newParams = new URLSearchParams({
        nextPath: location.pathname + location.search,
      });
      targetUrl += `?${newParams.toString()}`;
    }
  }

  return authorized ? <Outlet /> : <Navigate to={targetUrl} />;
};
