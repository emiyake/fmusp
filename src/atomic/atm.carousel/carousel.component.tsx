import * as React from 'react';

import { style } from './carousel.component.style';

const hasWindow = () => typeof window !== 'undefined';

interface SiblingFrames {
  current?: React.ReactInstance;
  prev?: React.ReactInstance;
  next?: React.ReactInstance;
}

export interface CarouselProps {
  auto?: boolean;
  infinite?: boolean;
  interval?: number;
  duration?: number;
  minMove?: number;
  children?: any;
  onIndexChanged?: any;
}

export const Carousel: React.FC<CarouselProps> = ({
  auto = false,
  interval = 1000,
  infinite = true,
  duration = 300,
  minMove = 40,
  ...props
}) => {
  const [frames, setFrames] = React.useState<any[]>(props.children);

  const _mounted = React.useRef(false);
  const _touchDown = React.useRef(false);
  const _startX = React.useRef(0);
  const _deltaX = React.useRef(0);

  const _movingFrames = React.useRef<SiblingFrames>({ current: undefined, prev: undefined, next: undefined });
  const _currentIndex = React.useRef(0);

  const _wrapper = React.useRef<HTMLDivElement>(null);
  const _frameWidth = React.useRef(0);
  const _slideTimeoutID = React.useRef<number | undefined>(undefined);

  const _frameRefs = React.useRef<Map<string, React.RefObject<HTMLDivElement | null>>>(
    new Map<string, React.RefObject<HTMLDivElement | null>>(),
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Intentional
  React.useEffect(() => {
    _mounted.current = true;
    if (hasWindow()) {
      window.addEventListener('mouseup', handleTouchEnd, false);
      window.addEventListener('touchend', handleTouchEnd, false);
    }
    return () => {
      clearAutoTimeout();
      _mounted.current = false;
      if (hasWindow()) {
        window.removeEventListener('mouseup', handleTouchEnd, false);
        window.removeEventListener('touchend', handleTouchEnd, false);
      }
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Intentional
  React.useEffect(() => {
    if (auto) {
      prepareAutoSlide();
    } else {
      clearAutoTimeout();
    }
  }, [auto]);

  React.useEffect(() => {
    if (props.children?.length !== frames?.length) {
      setFrames(props.children);
    }
  }, [props.children, frames?.length]);

  const handleTouchStart = (e: any) => {
    if (frames.length < 2) {
      return;
    }

    _touchDown.current = true;

    clearAutoTimeout();
    prepareSiblingFrames();

    const { pageX } = e.touches?.[0] || e;
    _startX.current = pageX;
    _deltaX.current = 0;
  };

  const handleTouchMove = (e: any) => {
    if (e.touches?.length > 1 || !_touchDown.current) {
      return;
    }

    clearAutoTimeout();

    const { pageX } = e.touches?.[0] || e;
    _deltaX.current = pageX - _startX.current;

    // when reach frames edge in non-loop mode, reduce drag effect.
    if (!infinite) {
      if (_currentIndex.current === frames.length - 1) {
        if (_deltaX.current < 0) {
          _deltaX.current /= 3;
        }
      }
      if (_currentIndex.current === 0) {
        if (_deltaX.current > 0) {
          _deltaX.current /= 3;
        }
      }
    }

    moveFramesBy(_deltaX.current);
  };

  const handleTouchEnd = () => {
    if (!_touchDown.current) {
      return;
    }
    _touchDown.current = false;

    const direction = decideEndPosition();
    if (direction) {
      transitFramesTowards(direction);
    }
    setTimeout(() => prepareAutoSlide(), duration);
  };

  // auto slide to 'next' or 'prev'
  const autoSlide = (rel: string) => {
    clearAutoTimeout();
    transitFramesTowards(rel === 'prev' ? 'right' : 'left');

    // prepare next move after animation
    setTimeout(() => prepareAutoSlide(), duration);
  };

  const decideEndPosition = () => {
    if (infinite === false) {
      if (_currentIndex.current === 0 && _deltaX.current > 0) {
        return 'origin';
      }
      if (_currentIndex.current === frames.length - 1 && _deltaX.current < 0) {
        return 'origin';
      }
    }
    if (Math.abs(_deltaX.current) < minMove) {
      return 'origin';
    }
    return _deltaX.current > 0 ? 'right' : 'left';
  };

  const moveFramesBy = (deltaX: number) => {
    const { prev, current, next } = _movingFrames.current;

    translateXY(current, deltaX, 0, 0);
    if (deltaX < 0) {
      translateXY(next, deltaX + _frameWidth.current, 0, 0);
    } else {
      translateXY(prev, deltaX - _frameWidth.current, 0, 0);
    }
  };

  const prepareAutoSlide = () => {
    if (frames.length < 2) {
      return;
    }

    clearAutoTimeout();
    prepareSiblingFrames();

    // auto slide only avalible in loop mode
    if (_mounted.current && infinite && auto) {
      _slideTimeoutID.current = setTimeout(autoSlide, interval);
    }
  };

  const clearAutoTimeout = () => {
    clearTimeout(_slideTimeoutID.current);
  };

  const updateFrameSize = () => {
    const { width } = hasWindow() ? window.getComputedStyle(_wrapper.current as Element) : { width: '0' };
    _frameWidth.current = Number.parseFloat(width.split('px')[0]);
  };

  const prepareSiblingFrames = () => {
    updateFrameSize();

    _movingFrames.current = {
      current: _frameRefs.current.get(`f${getFrameId()}`)?.current ?? undefined,
      prev: _frameRefs.current.get(`f${getFrameId('prev')}`)?.current ?? undefined,
      next: _frameRefs.current.get(`f${getFrameId('next')}`)?.current ?? undefined,
    };

    if (!infinite) {
      if (_currentIndex.current === 0) {
        _movingFrames.current.prev = undefined;
      }
      if (_currentIndex.current === frames.length - 1) {
        _movingFrames.current.next = undefined;
      }
    }

    //prepare frames position
    translateXY(_movingFrames.current.current, 0, 0, 0);
    translateXY(_movingFrames.current.prev, -_frameWidth.current, 0, 0);
    translateXY(_movingFrames.current.next, _frameWidth.current, 0, 0);
    return _movingFrames.current;
  };

  const getFrameId = (pos?: string): number => {
    const total = frames.length;
    switch (pos) {
      case 'prev':
        return (_currentIndex.current - 1 + total) % total;
      case 'next':
        return (_currentIndex.current + 1) % total;
      default:
        return _currentIndex.current;
    }
  };

  const transitFramesTowards = (direction: string) => {
    const { prev, current, next } = _movingFrames.current;

    let newCurrentId = _currentIndex.current;
    switch (direction) {
      case 'left':
        translateXY(current, -_frameWidth.current, 0, duration);
        translateXY(next, 0, 0, duration);
        newCurrentId = getFrameId('next');
        break;
      case 'right':
        translateXY(current, _frameWidth.current, 0, duration);
        translateXY(prev, 0, 0, duration);
        newCurrentId = getFrameId('prev');
        break;
      default:
        // back to origin
        translateXY(current, 0, 0, duration);
        translateXY(prev, -_frameWidth.current, 0, duration);
        translateXY(next, _frameWidth.current, 0, duration);
    }
    _currentIndex.current = newCurrentId;
    props.onIndexChanged?.(_currentIndex.current);
  };

  return (
    // TODO: keyboard support
    <div
      aria-label="carousel"
      role="listbox"
      className={style()}
      ref={_wrapper}
      onTouchStart={handleTouchStart}
      onMouseDown={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseMove={handleTouchMove}>
      {frames.map((frame, i) => {
        if (!_frameRefs.current.get(`f${i}`)) {
          _frameRefs.current.set(`f${i}`, React.createRef<HTMLDivElement>());
        }
        return (
          <div
            ref={_frameRefs.current.get(`f${i}`)}
            // biome-ignore lint/suspicious/noArrayIndexKey: Intentional
            key={i}
            style={
              i === 0
                ? {
                    zIndex: frames.length - i,
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                  }
                : {
                    zIndex: frames.length - i,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    overflow: 'hidden',
                  }
            }>
            {frame}
          </div>
        );
      })}
    </div>
  );
};

function translateXY(el: any, x: number, y: number, duration: number) {
  if (!el) {
    return;
  }

  el.style.opacity = '1';

  // animation
  el.style.transitionDuration = `${duration}ms`;
  el.style.webkitTransitionDuration = `${duration}ms`;

  el.style.transfrom = `translate(${x}px, ${y}px)`;
  el.style.webkitTransform = `translate(${x}px, ${y}px) translateZ(0)`;
}
