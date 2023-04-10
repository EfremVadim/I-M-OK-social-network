import React from 'react';
import styles from './Paginator.module.css';

const Paginator = ({onPageChanged, currentPage, totalUsersCount, pageSize}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let slicedPages;
    let curPage = currentPage;
    if (curPage - 3 < 0) {
        slicedPages = pages.slice(0, 5);
    } else {
        slicedPages = pages.slice(curPage - 3, curPage + 2);
    }

    return (
        <div>
            {slicedPages.map(p => {
                return (<span
                    className={currentPage === p ? styles.selectedPage : undefined}
                    onClick={(e) => {
                        onPageChanged(p)
                    }}> {p}</span>)
            })}
        </div>
    )
}

export default Paginator;