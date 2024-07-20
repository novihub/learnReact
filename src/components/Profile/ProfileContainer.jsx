import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'
import { setUserProfile } from '../../redux/profile-reducer'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import Profile from './Profile'

const ProfileContainer = props => {
	let { userId } = useParams()
	if (!userId) {
		userId = 2
	}

	useEffect(() => {
		props.setUserProfile(userId)
		// usersAPI.getProfile(userId)
		//     .then((response) => {
		//         props.setUserProfile(response.data);
		//     });
	}, [userId, props.setUserProfile, props])

	return (
		<div>
			<Profile profile={props.profile} />
		</div>
	)
}

let mapStateToProps = state => ({
	profile: state.profilePage.profile
})

export default compose(
	connect(mapStateToProps, { setUserProfile }),
	withAuthRedirect
)(ProfileContainer)
