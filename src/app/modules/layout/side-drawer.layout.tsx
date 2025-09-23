import { Outlet, useNavigate } from 'react-router';
import { tv } from 'tailwind-variants';

export const SideDrawerLayout = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate(-1);

  return (
    <button className={style()} onClick={handleClick} onKeyDown={handleClick} tabIndex={0} type="button">
      <Outlet context={{ handleClick }} />
    </button>
  );
};

const style = tv({
  base: 'absolute inset-0 bg-fixed-black/10 z-2 backdrop-blur-xs',
});
