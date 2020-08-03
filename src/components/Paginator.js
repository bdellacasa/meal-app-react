import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '../styles/paginator.styles.scss';

const Paginator = ({ totalPages, maxPagesToShow, paginate }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [initialValue, setInitialValue] = useState(1);
    const [maxValue, setMaxValue] = useState(totalPages < maxPagesToShow ? totalPages : maxPagesToShow);

    let paginator = Array.from({ length: maxValue }, (_, index) => initialValue + index);

    return (
        <div className={"paginator-container"}>
            <Pagination>
                <PaginationItem disabled={currentPage <= 1}>
                    <PaginationLink onClick={e => {
                        paginate(currentPage - 1);
                        setCurrentPage(currentPage - 1);
                        if ((currentPage - 1) % maxPagesToShow === 0) {
                            setInitialValue(currentPage - maxPagesToShow)
                        }
                    }}
                        previous />
                </PaginationItem>

                {paginator.map((value, i) => {
                    return <PaginationItem active={value === currentPage} key={value}>
                        <PaginationLink onClick={e => {
                            paginate(value);
                            setCurrentPage(value);
                        }}>
                            {value}
                        </PaginationLink>
                    </PaginationItem>
                })}

                <PaginationItem disabled={totalPages < maxPagesToShow ? (currentPage > totalPages - 1) : (currentPage >= totalPages - 1)}>
                    <PaginationLink onClick={e => {
                        paginate(currentPage + 1);
                        setCurrentPage(currentPage + 1);
                        if (currentPage % maxPagesToShow === 0) {
                            setInitialValue(currentPage + 1);

                            //checks if it is the last series of pages and it is less than the maximum number of pages to show
                            if (currentPage + maxPagesToShow + 1 > totalPages) {
                                let diff = currentPage + maxPagesToShow + 1 - totalPages;
                                setMaxValue(maxPagesToShow - diff)
                            }
                        }
                    }}
                        next />
                </PaginationItem>
            </Pagination>
        </div>
    )
}

export default Paginator;