import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    background: [
      'h-screen bg-background overflow-hidden relative',
      'before:mt-[-28%] before:mb-[-16%] before:ml-[-23%] before:absolute before:left-0 before:top-0 before:bottom-0',
      "before:content-[''] before:hidden before:w-[67%] before:rotate-[-4.5deg] before:rounded-[100%] before:bg-primary lg:before:block",
      'after:mt-[-20%] after:mb-[-13%] after:ml-[-23%] after:absolute after:left-0 after:top-0 after:bottom-0',
      "after:content-[''] after:hidden after:w-[67%] after:rotate-[-4.5deg] after:rounded-[100%] lg:after:block",
      'after:bg-fixed-black',
    ],
    content: 'relative z-10 flex w-full flex-col justify-center items-stretch h-screen',
    robot: 'w-[80%] ml-[10%]',
    logo: 'block mx-auto w-[50%] max-w-[200px] lg:hidden',
  },
});
