import axios from 'axios'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '38578ceb-3e04-4b94-8d1d-f8a020ed5ed8'
	}
})

export const usersAPI = {
	getUsers(currentPage, pageSize) {
		return instance
			.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(res => res.data)
	}
}
