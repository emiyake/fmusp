import { Link } from 'react-router';

import { AppIcon } from '@app/components';
import { Button } from '@atomic/atm.button';
import { FaIcon } from '@atomic/atm.fa-icon';
import { HamburgerButton } from '@atomic/atm.hamburger-button';
import { Flex } from '@atomic/obj.flex';
import { layoutStrings } from './layout.strings';
import { style } from './top-bar.component.style';

const strings = layoutStrings.topBar;

interface TopBarProps {
  onMobileMenuTap?: (active: boolean) => void;
  onLogout?: () => void;
  mobileMenuActive?: boolean;
}

export const TopBar: React.FC<TopBarProps> = props => {
  const handleHamburgerTap = () => {
    const toggleActive = !props.mobileMenuActive;
    props.onMobileMenuTap?.(toggleActive);
  };

  return (
    <header className={style().background()}>
      <div className={style().content()}>
        <Flex>
          <Flex>
            <Link to="/" className="-intro-x ml-md">
              <img data-cy="logo" alt={strings.logoAlt} className="h-[40px]" src={AppIcon.Logo} />
            </Link>
          </Flex>
          <Flex hAlign="end" className="hidden md:flex">
            <Button onClick={props.onLogout} link className="intro-x text-fixed-white">
              <FaIcon.SignOut />
              {strings.logout}
            </Button>
          </Flex>
          <Flex hAlign="end" vAlign="center" className="mr-md md:hidden">
            <HamburgerButton onClick={handleHamburgerTap} active={props.mobileMenuActive} />
          </Flex>
        </Flex>
      </div>
    </header>
  );
};
