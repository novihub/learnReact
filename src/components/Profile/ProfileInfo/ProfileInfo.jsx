import React from 'react'
import Preloader from '../../common/Preloader/Preloader'
import classes from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatus'

const ProfileInfo = props => {
	if (!props.profile) {
		return <Preloader />
	}
	return (
		<div className={classes.Profile}>
			<img src={props.profile.photos.large} alt='IMG' />
			<div className={classes.ProfileInfo}>
				<ProfileStatus aboutMe={props.profile.aboutMe}/>
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
