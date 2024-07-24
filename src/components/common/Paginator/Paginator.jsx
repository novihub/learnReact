import React from 'react'
import classes from './Paginator.module.css'

const Paginator = ({
	totalUsersCount,
	pageSize,
	currentPage,
	onPageChanged
}) => {
	let pagesCount = Math.ceil(totalUsersCount / pageSize)

	let pages = []

	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	let slicedPages
	let curPage = currentPage
	curPage - 6 < 0
		? (slicedPages = pages.slice(0, 10))
		: (slicedPages = pages.slice(curPage - 6, curPage + 5))

	return (
		<div className={classes.PageNumbers}>
			{slicedPages.map(p => (
				<span
					onClick={e => onPageChanged(p)}
					className={`${classes.PageNumber} ${
						currentPage === p ? classes.selectedPage : ''
					}`}
				>
					{p}
				</span>
			))}
		</div>
	)
}

export default Paginator
