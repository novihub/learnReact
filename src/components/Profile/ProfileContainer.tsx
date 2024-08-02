import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { compose } from 'redux'
import {
	getStatus,
	savePhoto,
	saveProfile,
	setUserProfile,
	updateStatus
} from '../../redux/profile-reducer'
import { AppStateType } from '../../redux/redux-store'
import { ProfileType } from '../../types/types'
import Preloader from '../common/Preloader/Preloader'
import Profile from './Profile'

interface ProfileContainerProps {
	profile: ProfileType | null
	status: string
	authorizedUserId: number | null
	isAuth: boolean
	setUserProfile: (userId: number) => Promise<void>
	getStatus: (userId: number) => Promise<void>
	updateStatus: (status: string) => Promise<void>
	savePhoto: (file: any) => Promise<void>
	saveProfile: (profile: ProfileType) => Promise<void>
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
	setUserProfile,
	getStatus,
	profile,
	status,
	updateStatus,
	authorizedUserId,
	isAuth,
	savePhoto,
	saveProfile
}) => {
	const [isOwner, setIsOwner] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const { userId } = useParams()
	const userIdNumber = userId ? parseInt(userId, 10) : null

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				if (userIdNumber) {
					await setUserProfile(userIdNumber)
					const status = await getStatus(userIdNumber)
					setIsOwner(userIdNumber === authorizedUserId)
				}
			} finally {
				setIsLoading(false)
			}
		}
		if (userIdNumber) {
			fetchData()
		}
	}, [userIdNumber, setUserProfile, getStatus, authorizedUserId])

	if (!isAuth && userIdNumber) {
		return <Navigate to='/login' />
	}

	return (
		<>
			{isLoading ? (
				<Preloader />
			) : (
				<Profile
					isOwner={isOwner}
					profile={profile}
					status={status}
					updateStatus={updateStatus}
					savePhoto={savePhoto}
					saveProfile={saveProfile}
				/>
			)}
		</>
	)
}

const mapStateToProps = (state: AppStateType) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth
})

export default compose(
	connect(mapStateToProps, {
		setUserProfile,
		getStatus,
		updateStatus,
		savePhoto,
		saveProfile
	})
)(ProfileContainer)
