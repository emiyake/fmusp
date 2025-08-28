import { AppIcon } from '@app/components/app-icon.component';
import { Col, Grid, H1, Row } from '@atomic';
import type React from 'react';
import { style } from './auth-page-wrapper.component.style';

interface AuthPageWrapperProps extends React.PropsWithChildren {
  title: string;
}

export const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({ children, title }) => {
  return (
    <>
      <title>{title}</title>
      <div className={style().background()}>
        <Grid>
          <Row>
            <Col lg={5}>
              <div className="hidden h-screen overflow-hidden lg:flex">
                <div className={style().content()}>
                  <img className={style().robot()} src={AppIcon.LogoFull} alt="LogoFull" />
                </div>
              </div>
            </Col>
            <Col lg={2} />
            <Col lg={4}>
              <div className={style().content()}>
                <img className={style().logo()} src={AppIcon.LogoFull} alt="Logo" />
                <H1>{title}</H1>
                {children}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </>
  );
};
