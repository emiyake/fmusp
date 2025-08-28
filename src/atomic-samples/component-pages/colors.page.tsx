import { Grid } from '@atomic/obj.grid';
import { ColorsSamples } from '@atomic/obj.theme/colors.samples';
import React from 'react';
import { tv } from 'tailwind-variants';

export const link = tv({
  base: '',
});

const useMutationObserver = (
  ref: any,
  callback: any,
  options = {
    characterData: false,
    childList: false,
    subtree: false,
    attributes: true,
  },
) => {
  React.useEffect(() => {
    if (ref) {
      const observer = new MutationObserver(callback);
      observer.observe(ref, options);
      return () => observer.disconnect();
    }
  }, [ref, options, callback]);
};

export const ColorsPage: React.FC = () => {
  const [key, setKey] = React.useState(Date.now());

  const el = document.querySelectorAll('html')[0];
  useMutationObserver(el, () => setKey(Date.now()));

  return (
    <Grid fluid key={key}>
      <ColorsSamples />
    </Grid>
  );
};
