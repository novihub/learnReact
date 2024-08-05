import { FilterType } from '../redux/users-reducer'
import { GetItemsType, instance, ResponseType } from './api'

export const usersAPI = {
	getUsers(
		currentPage: number,
		pageSize: number,
		filter: FilterType
	) {
		return instance
			.get<GetItemsType>(
				`users?page=${currentPage}&count=${pageSize}&term=${filter.term}&friend=${filter.isFollowed}`
			)
			.then(res => res.data)
	},
	follow(userID: number) {
		return instance.post<ResponseType>(
			`https://social-network.samuraijs.com/api/1.0/follow/${userID}`
		)
	},
	unfollow(userID: number) {
		return instance.delete(
			`https://social-network.samuraijs.com/api/1.0/follow/${userID}`
		)
	}
}
