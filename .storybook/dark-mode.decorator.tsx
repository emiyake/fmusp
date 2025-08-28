import React from 'react';
import { useState } from 'react';
import { tv } from 'tailwind-variants';

export const DarkModeDecorator = (Story: any) => {
  const [isDarkMode, setIsDarkMode] = useState(!!document.querySelectorAll('html')[0]?.classList.contains('dark'));

  const toggleMode = () => {
    const nextMode = !isDarkMode;
    const el = document.querySelectorAll('html')[0];
    nextMode ? el.classList.add('dark') : el.classList.remove('dark');
    setIsDarkMode(nextMode);
  };

  return (
    <div className="bg-background-strong">
      <button onClick={toggleMode} type="button" className={style()}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Story />
    </div>
  );
};

const style = tv({
  base: [
    'mx-sm my-sm', // positioning
    'px-md py-sm border-none rounded bg-neutral-xxstrong text-neutral-soft ', // UI
  ],
});
