import type * as React from 'react';

import { paginationStrings } from './pagination.component.strings';
import { link, style } from './pagination.component.style';

const strings = paginationStrings.pagination;

export interface PageItemProps {
  active?: boolean;
  page: string;
  onClick: (page: number) => void;
}

const BOUNDARY_COUNT = 2; // Edge item plus possible separator
const SEPARATOR = '...';
const START_PAGE = 1;

const PaginationItem: React.FC<PageItemProps> = props => {
  const { separator } = style();

  if (props.page === SEPARATOR) {
    return <p className={separator()}>{props.page}</p>;
  }

  const { active } = props;

  const handleClick = () => {
    props.onClick(Number.parseInt(props.page));
  };
  return (
    <button onClick={handleClick} className={link({ active })} type="button" aria-current={active ? 'page' : undefined}>
      {props.page}
    </button>
  );
};

export interface PaginationProps {
  current: number;
  total: number;
  siblingCount: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = props => {
  const constructPaginationArray = (): string[] => {
    const paginationItems = [];
    const window = props.siblingCount * 2 + 1;
    const totalItems = window + BOUNDARY_COUNT * 2;

    if (props.total === 0) {
      return ['0'];
    }
    if (totalItems >= props.total) {
      return [...new Array(props.total)].map((_value, index) => (index + 1).toString());
    }

    const untiedFirstSibling = props.current - props.siblingCount;
    const canTieWindowAndLeftBoundary = untiedFirstSibling <= START_PAGE + BOUNDARY_COUNT;
    const canTieWindowAndRightBoundary = untiedFirstSibling >= props.total - BOUNDARY_COUNT - window + 1;

    const firstSibling =
      (canTieWindowAndLeftBoundary && START_PAGE + BOUNDARY_COUNT) ||
      (canTieWindowAndRightBoundary && props.total - BOUNDARY_COUNT - window + 1) ||
      untiedFirstSibling;

    paginationItems.push(START_PAGE.toString());

    if (canTieWindowAndLeftBoundary) {
      paginationItems.push((START_PAGE + 1).toString());
    } else {
      paginationItems.push(SEPARATOR);
    }

    for (let page = firstSibling; page < firstSibling + window; page++) {
      paginationItems.push(page.toString());
    }

    if (canTieWindowAndRightBoundary) {
      paginationItems.push((props.total - 1).toString());
    } else {
      paginationItems.push(SEPARATOR);
    }

    paginationItems.push(props.total.toString());
    return paginationItems;
  };

  const constructedPaginationArray = constructPaginationArray();

  const { ul, li } = style();

  return (
    <nav className="flex justify-center">
      <ul className={ul()} aria-label={strings.title}>
        {constructedPaginationArray.map((val: string, index: number) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li key={`name${index}`} className={li()}>
            <PaginationItem active={val === props.current.toString()} onClick={props.onPageChange} page={val} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
