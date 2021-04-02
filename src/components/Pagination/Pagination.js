import React from 'react';
import cx from 'classnames';
import pageBadges from './pagesBadges';

import './Pagination.scss';

const CN = 'pagination';

const Pagination = (props) => {
  const {
    currentPage, numberOfPages, setCurrentPage,
  } = props;

  

  const setPage = (e) => {
    setCurrentPage(+e.target.innerText);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderNumbers = () => {
    if (numberOfPages <= 1) return null;

    return (
      <nav className="paginator">
        {pageBadges({ currentPage, numberOfPages }).map((num, i) => (num ? (
          <button
            key={num}
            type="button"
            onClick={setPage}
            className={cx(`${CN}-nav-number`, {
              [`${CN}-nav-number--active`]: num === currentPage
            })}
          >
            {num}
          </button>
        ) : (
          <span key={`separator-${num + i}`} className="separator">
            ...
          </span>
        )))}
      </nav>
    );
  };

  return (
    <div className={`${CN}`}>
      {numberOfPages > 1 && (
        <div className={`${CN}-nav-numbers`}>
          <div
            onClick={goToPrevPage}
            className={cx(`${CN}-nav-arrow`, `${CN}-nav-arrow-left`, {
              [`${CN}-nav-arrow--disabled`]: currentPage === 1
            })}
          >
            <i className={`icon chevron left ${CN}-nav-arrow__icon`} />
          </div>
          {renderNumbers()}
          <div
            onClick={goToNextPage}
            className={cx(`${CN}-nav-arrow`, `${CN}-nav-arrow-right`, {
              [`${CN}-nav-arrow--disabled`]: currentPage === numberOfPages
            })}
          >
            <i className={`icon chevron right ${CN}-nav-arrow__icon`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
