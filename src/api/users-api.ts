import { GetItemsType, instance, ResponseType } from './api'

export const usersAPI = {
	getUsers(currentPage: number, pageSize: number) {
		return instance
			.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
			.then(res => res.data)
	},
	follow(userID: number) {
		return instance
			.post<ResponseType>(
				`https://social-network.samuraijs.com/api/1.0/follow/${userID}`
			)
			.then(res => res.data)
	},
	unfollow(userID: number) {
		return instance
			.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userID}`)
			.then(res => res.data) as Promise<ResponseType>
	}
}
