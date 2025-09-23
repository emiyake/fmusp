import { AuthRoutes } from '@app/modules/auth/auth.routes';
import { LinkButton } from '@atomic/atm.button/link-button.component';
import { H1 } from '@atomic/atm.typography';
import { Grid } from '@atomic/obj.grid';
import type React from 'react';

const HomePage: React.FC = () => {
  return (
    <Grid className="intro-y">
      <H1>Home page</H1>
      <LinkButton variant="primary" to={AuthRoutes.Guard}>
        Access a protected page
      </LinkButton>
    </Grid>
  );
};

export default HomePage;
