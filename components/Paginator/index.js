import React from 'react';

import styles from '../../styles/Paginator.module.scss';

const Paginator = ({ total, page, onPage }) => (
  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
    <button onClick={onPage.bind(null, page - 1)} disabled={page === 1}
            className={[styles.page, styles.prev].join(' ')}>
      <span className="sr-only">Previous</span>
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
           aria-hidden="true">
        <path fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"/>
      </svg>
    </button>
    {Array.from({ length: total }).map((_, index) => {
      index++;
      return (
        <button key={index} onClick={onPage.bind(null, index)} disabled={page === index}
                className={[styles.page, page === index ? styles.active : ''].join(' ')}>
          {index}
        </button>
      );
    })}
    <button onClick={onPage.bind(null, page + 1)} disabled={page === total}
            className={[styles.page, styles.next].join(' ')}>
      <span className="sr-only">Next</span>
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
           aria-hidden="true">
        <path fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"/>
      </svg>
    </button>
  </nav>
);

export default Paginator;
