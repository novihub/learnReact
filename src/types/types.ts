export type ContactsType = {
	github: string
	vk: string
	facebook: string
	instagram: string
	twitter: string
	website: string
	youtube: string
	mainLink: string
}

export type PhotosType = {
	small: string | null
	large: string | null
}

export type ProfileType = {
	userId: number | null
	lookingForAJob: boolean
	lookingForAJobDescription: string | null
	fullName: string | null
	contacts: ContactsType
	photos: PhotosType
}

export type PostType = {
	id: number
	message: string
	likesCount: number
}

export type UserType = {
	name: string
	id: number
	photos: PhotosType | null
	status: string
	followed: boolean
}
