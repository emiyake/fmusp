import { useThemeStore } from '@app/stores/theme-store';
import { Divider, InputLabel, SwitchInput } from '@atomic';
import { Flex } from '@atomic/obj.flex';
import React from 'react';
import { NavLink } from 'react-router';
import { layoutStrings } from './layout.strings';
import { style, submenu } from './menu.component.style';

const strings = layoutStrings.menu;

type MenuLinkItem = {
  to?: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  separator?: boolean;
};

export type MenuLink = MenuLinkItem & { submenus?: MenuLinkItem[] };

interface MenuProps {
  links: MenuLink[];
  onSelect?: () => void;
}

export const Menu: React.FC<MenuProps> = ({ links, onSelect }) => {
  const [theme, setTheme] = useThemeStore();

  React.useEffect(() => {
    const setDarkModeClass = (activeDarkMode?: boolean) => {
      const el = document.querySelectorAll('html')[0];
      activeDarkMode ? el.classList.add('dark') : el.classList.remove('dark');
    };

    setDarkModeClass(theme?.darkMode);
  }, [theme?.darkMode]);

  return (
    <div className={style().wrapper()}>
      <menu className={style().ul()}>
        {links.map((link, i) => {
          if (link.separator) {
            return (
              <div className="pr-lg" key={link.to + i.toString()}>
                <Divider className="my-lg bg-fixed-black/10" />
              </div>
            );
          }
          return (
            link.to && (
              <li className={style().li()} key={link.to + i.toString()}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'peer link-active' : 'peer link')}
                  onClick={onSelect}>
                  <Flex>
                    <Flex noGrow vAlign="center">
                      {link.icon}
                    </Flex>
                    <Flex vAlign="center" className={style().content()}>
                      {link.content}
                    </Flex>
                  </Flex>
                </NavLink>
                {link.submenus && (
                  <menu className={submenu().root()}>
                    {link.submenus?.map(
                      submenus =>
                        submenus.to && (
                          <li className={submenu().li()} key={submenus.to}>
                            <NavLink
                              to={submenus.to}
                              className={({ isActive }) => (isActive ? 'link-active' : 'link')}
                              onClick={onSelect}>
                              <Flex>
                                <Flex noGrow vAlign="center">
                                  {submenus.icon}
                                </Flex>
                                <Flex vAlign="center" className={submenu().content()}>
                                  {submenus.content}
                                </Flex>
                              </Flex>
                            </NavLink>
                          </li>
                        ),
                    )}
                  </menu>
                )}
              </li>
            )
          );
        })}
      </menu>
      <Flex noGrow className="fixed bottom-lg">
        <SwitchInput
          id={1}
          ariaLabel={strings.toggleDarkMode}
          onChange={checked => setTheme({ ...theme, darkMode: checked })}
          checked={!!theme?.darkMode}
        />
        <InputLabel className={submenu().content()}>{strings.darkMode}</InputLabel>
      </Flex>
    </div>
  );
};
