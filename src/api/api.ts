import axios from 'axios'
import { UserType } from '../types/types'

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '870a1e02-6ff6-4f28-9b60-156aff8dc22e'
	}
})

export enum ResultCodeEnum {
	Success = 0,
	Error = 1
}

export type GetItemsType = {
	items: Array<UserType>
	totalCount: number
	error: string | null
}

export type ResponseType<D = {}> = {
	data: D
	resultCode: ResultCodeEnum
	messages: Array<string>
}





