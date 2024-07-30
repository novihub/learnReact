import axios from 'axios'
import { ProfileType } from '../types/types'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '870a1e02-6ff6-4f28-9b60-156aff8dc22e'
	}
})

export const usersAPI = {
	getUsers(currentPage: number, pageSize: number) {
		return instance
			.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(res => res.data)
	},
	follow(userID: number) {
		return instance.post(
			`https://social-network.samuraijs.com/api/1.0/follow/${userID}`
		)
	},
	unfollow(userID: number) {
		return instance.delete(
			`https://social-network.samuraijs.com/api/1.0/follow/${userID}`
		)
	}
}

export const profileAPI = {
	getProfile(userID: number) {
		return instance.get(
			`https://social-network.samuraijs.com/api/1.0/profile/${userID}`
		)
	},
	getStatus(userID: number) {
		return instance.get(`profile/status/` + userID)
	},
	updateStatus(status: number) {
		return instance.put(`profile/status`, { status })
	},
	savePhoto(file: any) {
		const formData = new FormData()
		formData.append('image', file)

		return instance.put(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},
	saveProfile(profile: ProfileType) {
		return instance.put(`profile`, profile)
	}
}

export const authAPI = {
	setAuthUserData() {
		return instance.get(`auth/me`)
	},
	login(email: string, password: string, rememberMe = false, captcha = null) {
		return instance.post(`auth/login`, { email, password, rememberMe, captcha })
	},
	logout() {
		return instance.delete(`auth/login`)
	}
}

export const securityAPI = {
	getCaptchaUrl() {
		return instance.get(`security/get-captcha-url`)
	}
}
