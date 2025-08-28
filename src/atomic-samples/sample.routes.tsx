import type { MenuLink } from '@app/modules/layout/menu.component';
import { FaIcon } from '@atomic/atm.fa-icon';
import { Navigate, Route } from 'react-router';
import {
  AccordionsPage,
  BadgesPage,
  ButtonsPage,
  CardsPage,
  CarouselsPage,
  ChipsPage,
  ColorsPage,
  FlashPage,
  FormsPage,
  IconsPage,
  LoadingPage,
  SampleIcon,
  StepperPage,
  TablesPage,
  TabsPage,
  TypographyPage,
} from './component-pages';

export const sampleMenuLinks: MenuLink[] = [
  { separator: true },
  {
    to: '/components',
    content: 'Components',
    icon: <SampleIcon.Components />,
    submenus: [
      { to: '/components/accordions', content: 'Accordions', icon: <FaIcon.Check /> },
      { to: '/components/badges', content: 'Badges', icon: <FaIcon.Check /> },
      { to: '/components/buttons', content: 'Buttons', icon: <FaIcon.Check /> },
      { to: '/components/cards', content: 'Cards', icon: <FaIcon.Check /> },
      { to: '/components/carousels', content: 'Carousels', icon: <FaIcon.Check /> },
      { to: '/components/chips', content: 'Chips', icon: <FaIcon.Check /> },
      { to: '/components/colors', content: 'Colors', icon: <FaIcon.Check /> },
      { to: '/components/flash', content: 'Flash messages', icon: <FaIcon.Check /> },
      { to: '/components/forms', content: 'Forms', icon: <FaIcon.Check /> },
      { to: '/components/icons', content: 'Icons', icon: <FaIcon.Check /> },
      { to: '/components/loading', content: 'Loading', icon: <FaIcon.Check /> },
      { to: '/components/stepper', content: 'Stepper', icon: <FaIcon.Check /> },
      { to: '/components/tables', content: 'Tables', icon: <FaIcon.Check /> },
      { to: '/components/tabs', content: 'Tabs', icon: <FaIcon.Check /> },
      { to: '/components/typography', content: 'Typography', icon: <FaIcon.Check /> },
    ],
  },
];

export const SampleRoutes = (
  <Route path={'/components'}>
    <Route index element={<Navigate to="/components/badges" replace />} />
    <Route path="accordions" element={<AccordionsPage />} />
    <Route path="badges" element={<BadgesPage />} />
    <Route path="buttons" element={<ButtonsPage />} />
    <Route path="cards" element={<CardsPage />} />
    <Route path="carousels" element={<CarouselsPage />} />
    <Route path="chips" element={<ChipsPage />} />
    <Route path="colors" element={<ColorsPage />} />
    <Route path="flash" element={<FlashPage />} />
    <Route path="forms" element={<FormsPage />} />
    <Route path="icons" element={<IconsPage />} />
    <Route path="loading" element={<LoadingPage />} />
    <Route path="stepper" element={<StepperPage />} />
    <Route path="tables" element={<TablesPage />} />
    <Route path="tabs" element={<TabsPage />} />
    <Route path="typography" element={<TypographyPage />} />
  </Route>
);
