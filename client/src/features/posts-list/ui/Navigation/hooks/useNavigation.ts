import { Dispatch, SetStateAction } from 'react';

type TProps = {
  page: number;
  totalPages: number;
  onSetPage: Dispatch<SetStateAction<number>>
}

export function useNavigation(props: TProps) {
  const { page, totalPages, onSetPage } = props;

  const prevPageButtonDisabled = page <= 1;
  const nextPageButtonDisabled = page >= totalPages;
  const hasMore = page < totalPages

  const handlePrevPageClick = () => {
    if (page <= 1) return;

    onSetPage((page) => page - 1)
  };

  const handleNextPageClick = () => {
    if (page >= totalPages) return;

    onSetPage((page) => page + 1)
  };

  const handleLoadMoreClick = () => {
    if (!hasMore) return

    onSetPage((page) => page + 1)
  };

  return {
    prevPageButtonDisabled,
    nextPageButtonDisabled,
    hasMore,
    handlePrevPageClick,
    handleNextPageClick,
    handleLoadMoreClick
  }
}