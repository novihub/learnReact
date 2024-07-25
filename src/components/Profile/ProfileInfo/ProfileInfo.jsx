import React from 'react'
import userPhoto from '../../../assets/user.png'
import Preloader from '../../common/Preloader/Preloader'
import classes from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks'

const ProfileInfo = props => {
	if (!props.profile) {
		return <Preloader />
	}

	const onMainPhotoSelected = e => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0])
		}
	}

	const { photos = {} } = props.profile

	return (
		<div className={classes.Profile}>
			<div className={classes.Avatar}>
				<img src={photos.large || userPhoto} alt='IMG' />
				{props.isOwner ? (
					<input type='file' onChange={onMainPhotoSelected} />
				) : null}
			</div>
			<div className={classes.ProfileInfo}>
				<ProfileStatusWithHooks
					aboutMe={props.profile.aboutMe}
					status={props.status}
					updateStatus={props.updateStatus}
				/>
				<h5>Contacts: </h5>
				<p>{'facebook: ' + props.profile.contacts.facebook}</p>
				<p>{'vk: ' + props.profile.contacts.vk}</p>
				<p>{'twitter: ' + props.profile.contacts.twitter}</p>
				<p>{'instagram: ' + props.profile.contacts.instagram}</p>
				<p>{'youtube: ' + props.profile.contacts.youtube}</p>
				<p>{'github: ' + props.profile.contacts.github}</p>
			</div>
		</div>
	)
}

export default ProfileInfo
