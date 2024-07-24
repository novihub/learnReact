import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { compose } from 'redux'
import {
	getStatus,
	setUserProfile,
	updateStatus
} from '../../redux/profile-reducer'
import Profile from './Profile'

const ProfileContainer = ({
	setUserProfile,
	getStatus,
	profile,
	status,
	updateStatus,
	authorizedUserId,
	isAuth
}) => {
	let { userId } = useParams()
	userId = userId || authorizedUserId

	useEffect(() => {
		if (userId) {
			setUserProfile(userId)
			getStatus(userId)
		}
	}, [userId, setUserProfile, getStatus])

	if (!isAuth && !userId) {
		return <Navigate to='/login' />
	}

	return (
		<div>
			<Profile profile={profile} status={status} updateStatus={updateStatus} />
		</div>
	)
}

const mapStateToProps = state => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth
})

export default compose(
	connect(mapStateToProps, { setUserProfile, getStatus, updateStatus })
)(ProfileContainer)
