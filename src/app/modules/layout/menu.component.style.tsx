import { tv } from 'tailwind-variants';

const li = [
  'intro-x',
  'm-0 p-0 list-style-none cursor-pointer text-sm font-primary',
  '[&>a]:block [&>a]:py-[12px] [&>a]:pl-md [&>a]:relative',
  '[&>.link]:text-neutral-strong [&>.link]:opacity-80',
];

export const style = tv({
  slots: {
    wrapper: 'py-xl pl-md flex flex-col content-between min-h-full justify-between',
    logo: 'w-[100px] m-auto block',
    divider: [
      'intro-y',
      'relative py-xl px-md h-px w-full',
      "before:content-[''] before:h-px before:w-full before:bg-neutral-xsoft before:opacity-30 before:block",
    ],
    ul: 'p-0 flex flex-col gap-sm',
    li: [
      ...li,
      '[&>a]:rounded-lg [&>.link-active]:text-primary [&>.link-active]:opacity-100 [&>.link-active]:bg-background mr-[20px]',
      `[&>.link-active:after]:absolute [&>.link-active:after]:content-[''] [&>.link-active:after]:-top-md [&>.link-active:after]:w-[14px] [&>.link-active:after]:h-[80px] [&>.link-active:after]:bg-cover [&>.link-active:after]:bg-center [&>.link-active:after]:bg-menu-chevron [&>.link-active:after]:-right-lg`,
      '[&>a]:rounded-tl-xl [&>a]:rounded-bl-xl',

      //Another style of menu
      // '[&>.link-active]:text-primary [&>.link-active]:opacity-100 [&>.link-active]:bg-background',
      // `[&>.link-active:before]:absolute [&>.link-active:before]:content-[''] [&>.link-active:before]:w-[20px] [&>.link-active:before]:h-[20px] [&>.link-active:before]:bg-contain  [&>.link-active:before]:bg-menu-corner [&>.link-active:before]:top-[-20px] [&>.link-active:before]:right-0 [&>.link-active:before]:rotate-90`,
      // `[&>.link-active:after]:absolute [&>.link-active:after]:content-[''] [&>.link-active:after]:w-[20px] [&>.link-active:after]:h-[20px] [&>.link-active:after]:bg-contain  [&>.link-active:after]:bg-menu-corner [&>.link-active:after]:bottom-[-20px] [&>.link-active:after]:right-0`,
    ],
    content: 'whitespace-nowrap	sm:invisible sm:group-hover/aside:visible',
  },
});

export const submenu = tv({
  slots: {
    root: [
      'bg-background/50 rounded-lg py-sm opacity-0 mt-xs',
      'peer-[.link-active]:animate-fade-left peer-[.link-active]:block',
      'animate-duration-300 hidden',
    ],
    li: [...li, '[&>.link-active]:text-neutral-xstrong [&>.link-active]:font-medium'],
    content: [style().content()],
  },
});
