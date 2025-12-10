import React from 'react';
import { tv } from 'tailwind-variants';

interface PatientThumbProps {
  src?: string;
  alt?: string;
  size?: number | string; // e.g. 40, "2.5rem", "48px"
  className?: string;
}

// Removed dynamic bg colors: we'll use a single neutral token

function getInitials(name: string) {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const thumbClass = tv({
  base: 'rounded-full inline-block overflow-hidden bg-neutral-xsoft border border-neutral-soft',
  variants: {
    withImage: {
      true: 'object-cover',
      false: 'flex items-center justify-center text-neutral-strong  select-none',
    },
  },
});

export const PatientThumb: React.FC<PatientThumbProps> = ({
  src,
  alt = 'Patient Thumbnail',
  size = 120,
  className = '',
}) => {
  const resolvedSize = typeof size === 'number' ? `${size}px` : size;
  const hasImage = !!src;
  const fontSize = typeof size === 'number' ? `${Math.round(size / 3.5)}px` : `calc(${size} / 3.5)`;
  const [imageError, setImageError] = React.useState(false);

  // Resetar erro quando src mudar
  React.useEffect(() => {
    setImageError(false);
  }, [src]);

  if (hasImage && !imageError) {
    return (
      <img
        src={src}
        alt={alt}
        className={thumbClass({ withImage: true, className })}
        style={{
          width: resolvedSize,
          height: resolvedSize,
          display: 'inline-block',
        }}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <span
      className={thumbClass({ withImage: false, className })}
      style={{
        width: resolvedSize,
        height: resolvedSize,
        display: 'inline-flex',
        fontSize,
      }}
      role="img"
      title={alt}>
      {getInitials(alt)}
    </span>
  );
};
