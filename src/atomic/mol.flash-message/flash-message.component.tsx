import * as React from 'react';

import { FaIcon } from '@atomic/atm.fa-icon';

import { type StyleVariants, style } from './flash-message.component.style';

export type FlashMessageType = StyleVariants['type'];

export interface FlashMessageProps extends StyleVariants {
  dismissible?: boolean;
  autoClose?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

interface FlashMessageState {
  hidden?: boolean;
  remove?: boolean;
}

const FlashIconTypes = {
  danger: FaIcon.FlashAlert,
  info: FaIcon.FlashInfo,
  success: FaIcon.FlashSuccess,
  warning: FaIcon.FlashWarning,
};

const timeToHide = 10 * 1000;

/**
 * This is an uncontrolled flash message.
 * It starts NOT hidden and after "timeToHide" seconds it is removed from DOM.
 * The user can also close it manually
 */
export class FlashMessage extends React.PureComponent<FlashMessageProps, FlashMessageState> {
  public static readonly defaultProps: Partial<FlashMessageProps> = {
    type: 'info',
    dismissible: true,
    autoClose: false,
  };

  private readonly timeoutList: ReturnType<typeof setTimeout>[] = [];

  constructor(props: FlashMessageProps) {
    super(props);

    this.state = {
      hidden: true,
      remove: false,
    };
  }

  componentDidMount() {
    this.startCloseTimer();
    setTimeout(() => this.setState({ hidden: false }), 1);
  }

  componentWillUnmount() {
    this.clearTimeoutList();
  }

  render() {
    const { children, dismissible, type, autoClose, ...other } = this.props;
    const Icon = FlashIconTypes[type ?? 'info'];
    return this.state.remove ? null : (
      <div className={style().fade({ visible: !this.state.hidden })}>
        <div className={style().wrapper({ type })} {...other}>
          <div className={style().content()}>
            <Icon className={style().icon()} />
            <div className="flex-1">{children}</div>
            {dismissible ? <FaIcon.Close className={style().close()} onClick={this.handleCloseClick} /> : null}
          </div>
        </div>
      </div>
    );
  }

  private readonly handleCloseClick = () => {
    this.startRemoveFromDomAnimation();
  };

  private readonly startCloseTimer = () => {
    if (this.props.autoClose) {
      const timeout = setTimeout(() => this.startRemoveFromDomAnimation(), timeToHide);
      this.timeoutList.push(timeout);
    }
  };

  private readonly startRemoveFromDomAnimation = () => {
    this.setState({ hidden: true }, () => {
      const timeout = setTimeout(() => this.removeFromDom(), 300);
      this.timeoutList.push(timeout);
    });
  };

  private readonly removeFromDom = () => {
    this.setState({ remove: true }, () => {
      this.clearTimeoutList();
      this.props.onClose?.();
    });
  };

  private readonly clearTimeoutList = () => {
    this.timeoutList.forEach((element: ReturnType<typeof setTimeout>) => clearTimeout(element));
  };
}
