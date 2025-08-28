import * as React from 'react';

import { InView } from 'react-intersection-observer';

import { FaIcon } from '@atomic/atm.fa-icon';

import { style } from './lazy-load-image.component.style';

// https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Different_sizes
export interface LazyLoadResponsiveImageProps {
  srcset: string;
  sizes: string;
}

export interface LazyLoadImageProps {
  src: string;
  alt?: string;
  aspectRatio?: number;
  round?: boolean;
  responsive?: LazyLoadResponsiveImageProps;
  className?: string;
}

enum Status {
  Loading = 0,
  Error = 1,
  Loaded = 2,
}

interface ImageWrapperInterface {
  clientWidth: number;
}

export const LazyLoadImage: React.FC<LazyLoadImageProps> = props => {
  const imageWrapper = React.useRef<ImageWrapperInterface>({} as ImageWrapperInterface);
  const [status, setStatus] = React.useState(Status.Loading);
  const [imgHeight, setImgHeight] = React.useState(0);

  const handleError = () => {
    setStatus(Status.Error);
  };

  const handleLoad = () => {
    if (props.aspectRatio && imageWrapper.current) {
      const height = props.aspectRatio * imageWrapper.current.clientWidth;
      setImgHeight(height);
      setStatus(Status.Loaded);
    } else {
      setStatus(Status.Loaded);
    }
  };

  const referImageWrapper = (image: ImageWrapperInterface | null) => {
    if (image) {
      imageWrapper.current = image;
    }
  };

  return (
    <InView triggerOnce>
      {({ inView, ref }) => {
        return (
          <div ref={ref}>
            {status === Status.Loading && (
              <div
                className={style().placeholder()}
                style={{
                  paddingBottom: props.aspectRatio ? `${props.aspectRatio * 100}%` : 'auto',
                }}>
                <FaIcon.Image className={style().icon()} />
              </div>
            )}
            {status === Status.Error && (
              <div
                className={style().placeholder()}
                style={{
                  paddingBottom: props.aspectRatio ? `${props.aspectRatio * 100}%` : 'auto',
                }}>
                <FaIcon.CloudOff className={style().icon()} />
              </div>
            )}
            {((inView && status === Status.Loading) || status === Status.Loaded) && (
              <div ref={referImageWrapper}>
                <img
                  className={style().image({
                    loaded: status === Status.Loaded,
                    round: props.round,
                    className: props.className,
                  })}
                  style={{ height: imgHeight || 'auto' }}
                  src={props.src}
                  alt={props.alt}
                  onLoad={handleLoad}
                  onError={handleError}
                  srcSet={props.responsive?.srcset}
                  sizes={props.responsive?.sizes}
                />
              </div>
            )}
          </div>
        );
      }}
    </InView>
  );
};
