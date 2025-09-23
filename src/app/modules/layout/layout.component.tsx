import { AuthRoutes } from '@app/modules/auth/auth.routes';
import { userStoreInstance } from '@app/stores/user-store';
import { Drawer } from '@atomic/atm.drawer';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { style } from './layout.component.style';
import { layoutStrings } from './layout.strings';
import { Menu } from './menu.component';
import { TopBar } from './top-bar.component';

const strings = layoutStrings.layout;

interface LayoutProps {
  links: any;
}

export const Layout: React.FC<LayoutProps> = ({ links }) => {
  const mainRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState<boolean>(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Intentional
  React.useEffect(() => {
    const executeScroll = () => {
      mainRef?.current?.scrollIntoView();
    };
    if (mainRef.current) {
      executeScroll();
    }
  }, [pathname]);

  const handleLogout = () => {
    if (confirm(strings.logout)) {
      navigate(AuthRoutes.Login);
      userStoreInstance.remove();
    }
  };

  return (
    <>
      <div ref={mainRef} />
      <div className={style().wrapper()}>
        <TopBar onMobileMenuTap={setActive} mobileMenuActive={active} onLogout={handleLogout} />
        <div className="flex">
          <aside className={style().aside()}>
            <Menu links={links} onSelect={() => setActive(false)} />
          </aside>
          <main className={style().main()}>
            <Outlet />
          </main>
        </div>
        <Drawer active={active} onOverlayClick={() => setActive(false)}>
          <Menu links={links} onSelect={() => setActive(false)} />
        </Drawer>
      </div>
    </>
  );
};
