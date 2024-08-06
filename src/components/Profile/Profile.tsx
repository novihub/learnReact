import React from 'react'
import { ProfileProps } from '../../types/types'
import classes from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile: React.FC<ProfileProps> = props => {
	return (
		<div className={classes.Profile}>
			<ProfileInfo
				profile={props.profile}
				status={props.status}
				updateStatus={props.updateStatus}
				isOwner={props.isOwner}
				savePhoto={props.savePhoto}
				saveProfile={props.saveProfile}
			/>
			{/* MyPostsContainer should be connected to Redux and not need additional props here */}
			{/* <MyPostsContainer isOwner={props.isOwner} posts={[]}/> */}
		</div>
	)
}

export default Profile
