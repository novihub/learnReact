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

export type ProfileType = {
	id: number
	fullName: string
	lookingForAJob: boolean
	lookingForAJobDescription: string
	aboutMe: string
	contacts: {
		[key: string]: string | undefined // Index signature
		facebook?: string
		vk?: string
		twitter?: string
		instagram?: string
		youtube?: string
		github?: string
	}
	photos: {
		large: string | null
		small: string | null
	}
}

export type StatusType = string

// types/types.ts

export type ProfileDataFormValues = {
	fullName: string
	lookingForAJob: boolean
	lookingForAJobDescription: string
	aboutMe: string
	contacts: {
		[key: string]: string 
	}
}

// types/types.ts

export type ProfileProps = {
	profile: ProfileType | null
	status: string
	updateStatus: (status: string) => void
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => Promise<void>
	isOwner: boolean
}
