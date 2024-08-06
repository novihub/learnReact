import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { FilterType, getUsersAPI } from '../../redux/users-reducer'
import {
	getCurrentPage,
	getFilter,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers
} from '../../redux/users-selectors'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'
import classes from './Users.module.css'
import UsersSearchForm from './UsersSearchForm'
import Preloader from '../common/Preloader/Preloader'

interface PropsType {}

const Users: FC<PropsType> = () => {
	const totalUsersCount = useSelector(getTotalUsersCount)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)
	const users = useSelector(getUsers)
	const filter = useSelector(getFilter)
	const isFetching = useSelector(getIsFetching)

	const dispatch = useDispatch()
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		const params = new URLSearchParams()
		params.set('page', String(currentPage))
		params.set('count', String(pageSize))
		params.set('term', filter.term)
		params.set('friend', String(filter.isFollowed))

		navigate({
			pathname: '/users',
			search: params.toString()
		})
	}, [filter, currentPage, pageSize, navigate])

	useEffect(() => {
		const query = new URLSearchParams(location.search)
		let actualPage = currentPage
		let actualFilter = filter
		const queryFriend = query.get('friend')
		const queryPage = query.get('page')
		const queryTerm = query.get('term')

		if (queryPage) actualPage = +queryPage
		if (queryTerm) actualFilter = { ...actualFilter, term: queryTerm }

		switch (queryFriend) {
			case 'null':
				actualFilter = { ...actualFilter, isFollowed: null }
				break
			case 'true':
				actualFilter = { ...actualFilter, isFollowed: true }
				break
			case 'false':
				actualFilter = { ...actualFilter, isFollowed: false }
				break
			default:
				break
		}

		dispatch(getUsersAPI(actualPage, pageSize, actualFilter))
	}, [location.search, dispatch])

	const onPageChanged = (pageNumber: number) => {
		dispatch(getUsersAPI(pageNumber, pageSize, filter))
	}

	const onFilterChanged = (filter: FilterType) => {
		dispatch(getUsersAPI(1, pageSize, filter))
	}

	if (isFetching) return <Preloader />

	return (
		<div>
			<div>
				<h1>Search</h1>
				<UsersSearchForm onFilterChanged={onFilterChanged} filter={filter} />
			</div>
			<div className={classes.Users}>
				{users.map(u => (
					<User key={u.id} user={u} />
				))}
			</div>
			<Paginator
				totalUsersCount={totalUsersCount}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChanged={onPageChanged}
			/>
		</div>
	)
}

export default Users
