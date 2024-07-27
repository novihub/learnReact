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
	let { userId } = useParams()
	userId = userId || authorizedUserId

	const [isOwner, setIsOwner] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

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

	if (!isAuth && !!userId) {
		return <Navigate to='/login' />
	}

	console.log(!isAuth)
	console.log(userId)
	// console.log('User ID:', userId);
	// console.log('Authorized User ID:', authorizedUserId);
	// console.log('Is Owner:', isOwner);

	// console.log('Profile:', profile);
	// console.log('Status:', status);
	// console.log('Authorized User ID:', authorizedUserId);
	// console.log('Is Auth:', isAuth);
	// console.log(typeof userId, typeof authorizedUserId);

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
