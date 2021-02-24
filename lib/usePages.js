import { useCallback, useEffect, useState } from 'react';

export function pageState(list, page, perPage) {
  const total = Math.ceil(list.length / perPage);
  page = page < 1 ? 1 : page > total ? total : page;
  const offset = (page - 1) * perPage;
  const items = list.slice(offset, offset + perPage);

  return { list, total, page, items };
}

export default function usePages(list, initialPage = 1, perPage = 20) {
  const [state, setState] = useState(() => ({ list: [], total: 0, page: 1, items: [] }));

  const setPage = useCallback(
    (nextPage) => {
      setState(pageState(list, nextPage, perPage));
    },
    [setState, list, perPage]
  );

  useEffect(() => {
    setState(state => pageState(list, state.page, perPage));
  }, [setState, list, perPage]);

  useEffect(() => {
    setState(state => initialPage === state.page ? state : pageState(state.list, initialPage, perPage));
  }, [setState, initialPage, perPage]);

  return {
    length: state.list.length,
    total: state.total, page: state.page, items: state.items,
    setPage
  };
}
