import { PhotosType, ProfileType } from '../types/types'
import { instance, ResponseType } from './api'

type SavePhotoResponseDataType = {
	photos: PhotosType
}

export const profileAPI = {
	getProfile(userID: number) {
		return instance.get<ProfileType>(
			`https://social-network.samuraijs.com/api/1.0/profile/${userID}`
		).then(res => res.data) as Promise<ProfileType>
	},
	getStatus(userID: number) {
		return instance.get<string>(`profile/status/` + userID).then(res => res.data)
	},
	updateStatus(status: string) {
		return instance.put<ResponseType>(`profile/status`, { status }).then(res => res.data)
	},
	savePhoto(file: any) {
		const formData = new FormData()
		formData.append('image', file)

		return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(res => res.data)
	},
	saveProfile(profile: ProfileType) {
		return instance.put(`profile`, profile)
	}
}
