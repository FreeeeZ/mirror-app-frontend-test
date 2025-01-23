import { Dispatch, SetStateAction } from 'react';

import { useNavigation } from '@features/posts-list/ui/Navigation/hooks/useNavigation';

import Button from '@ui/kit/button/Button';

import classes from './Navigation.module.scss';

type TProps = {
  page: number;
  totalPages: number;
  navigationType: string;
  onSetPage: Dispatch<SetStateAction<number>>
}

export default function Navigation(props: TProps) {
  const { page, totalPages, navigationType, onSetPage } = props;

  const {
    hasMore,
    prevPageButtonDisabled,
    nextPageButtonDisabled,
    handlePrevPageClick,
    handleNextPageClick,
    handleLoadMoreClick
  } = useNavigation({ page, totalPages, onSetPage })

  return (
    <>
      {navigationType === 'pagination' && (
        <div className={classes.navigation_wrapper}>
          <Button onClick={handlePrevPageClick} disabled={prevPageButtonDisabled}>
            Назад
          </Button>
          <Button onClick={handleNextPageClick} disabled={nextPageButtonDisabled}>
            Вперед
          </Button>
        </div>
      )}
      {navigationType === 'load-more' && hasMore && (
        <div className={classes.navigation_wrapper}>
          <Button onClick={handleLoadMoreClick}>Load More</Button>
        </div>
      )}
    </>
  )
}