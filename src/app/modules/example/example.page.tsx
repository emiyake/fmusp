import { WithGuardExampleRoutes } from '@app/modules/example/example.routes';
import { ExampleSubRoutesRouter } from '@app/modules/example/example-sub-routes/example-sub-routes.router';
import { userStoreInstance, useUserStore } from '@app/stores';
import { Button } from '@atomic/atm.button';
import { LinkButton } from '@atomic/atm.button/link-button.component';
import { H2, H4 } from '@atomic/atm.typography';
import { Grid, Row } from '@atomic/obj.grid';
import { Separator } from '@atomic/obj.separator';
import type React from 'react';
import { useNavigate } from 'react-router';

import { AuthRoutes } from '../auth/auth.routes';

const ExamplePage: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useUserStore();

  function handleSubmit() {
    userStoreInstance.remove();
    navigate(AuthRoutes.Login);
  }
  return (
    <Grid className="intro-y">
      <H2>Sample route</H2>

      <Separator />

      {!!user && (
        <Button variant="primary" onClick={handleSubmit}>
          Logout
        </Button>
      )}

      <Row cols={3}>
        <LinkButton to={WithGuardExampleRoutes.ExampleSubRoute} link>
          <H4>Example sub-route</H4>
        </LinkButton>

        <LinkButton to={WithGuardExampleRoutes.SecondExampleSubRoute} link>
          <H4>Second example sub-route</H4>
        </LinkButton>
      </Row>

      <ExampleSubRoutesRouter />
    </Grid>
  );
};

export default ExamplePage;
