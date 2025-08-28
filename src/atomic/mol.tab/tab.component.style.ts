import { tv } from 'tailwind-variants';

export const ulStyle = tv({
  base: 'inline-flex flex-row m-0 p-0',
  variants: {
    full: {
      true: 'w-full',
    },
  },
});

export const linkItemStyle = tv({
  slots: {
    li: 'list-style-none [&+&]:ml-xl',
    label: [
      'inline-block relative text-neutral-strong p-md text-base cursor-pointer font-normal', // Label style
      'after:w-0 after:left-[50%]', //Underline default variant
      'after:transition-[width,left] after:ease-out after:duration-200', // Underline animation properties
      "after:bg-primary after:bottom-0 after:content-[''] after:block after:h-[2px] after:absolute", // Underline style
      '[&:hover:after]:w-full [&:hover:after]:left-[0%]', //Underline hover animation
    ],
  },
  variants: {
    active: {
      true: {
        label: ['text-neutral-xstrong font-medium', 'after:w-full after:left-[0%]'],
      },
    },
  },
});

export const boxItemStyle = tv({
  slots: {
    li: 'list-style-none [&+&]:ml-xl flex-1',
    button: [
      'rounded-lg w-full whitespace-nowrap',
      'block text-neutral-xstrong py-sm px-md text-base font-normal', // Label style
    ],
  },
  variants: {
    active: {
      true: {
        button: 'bg-primary text-fixed-white',
      },
    },
  },
});
