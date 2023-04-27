import React from 'react';
import styles from './Paginator.module.css';

type PropsType = {
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
}

const Paginator: React.FC<PropsType> = (
    {onPageChanged, currentPage, totalUsersCount, pageSize}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];

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
        <div className={styles.selectedItem}>
            {slicedPages.map(page => {
                return (<span
                    className={currentPage === page ? styles.selectedPage : undefined}
                    onClick={(e) => {
                        onPageChanged(page)
                    }}> {page}</span>)
            })}
        </div>
    )
}

export default Paginator;