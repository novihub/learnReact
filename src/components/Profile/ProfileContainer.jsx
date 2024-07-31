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
import Preloader from '../common/Preloader/Preloader'
import Profile from './Profile'

const ProfileContainer = ({
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

	let { userId } = useParams()

	userId = userId || authorizedUserId

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				await setUserProfile(userId)
				await getStatus(userId)
				setIsOwner(String(userId) === String(authorizedUserId))
			} finally {
				setIsLoading(false)
			}
		}
		if (userId) {
			fetchData()
		}
	}, [userId, setUserProfile, getStatus, authorizedUserId])

	if (!isAuth && !userId) {
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

const mapStateToProps = state => ({
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
