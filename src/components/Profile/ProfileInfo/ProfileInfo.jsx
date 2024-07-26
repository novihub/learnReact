import React, { useState } from 'react'
import userPhoto from '../../../assets/user.png'
import Preloader from '../../common/Preloader/Preloader'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'
import classes from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks'

const ProfileInfo = props => {
	let [editMode, setEditMode] = useState(false)

	if (!props.profile) {
		return <Preloader />
	}

	const onMainPhotoSelected = e => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0])
		}
	}

	const { photos = {} } = props.profile

	const onSubmit = formData => {
		props.saveProfile(formData).then(() => {
			setEditMode(false)
		})
	}

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
				{editMode ? (
					<ProfileDataForm
						initialValues={props.profile}
						profile={props.profile}
						onSubmit={onSubmit}
					/>
				) : (
					<ProfileData
						profile={props.profile}
						isOwner={props.isOwner}
						goToEditMode={() => {
							setEditMode(true)
						}}
					/>
				)}

				{/* <h5>Contacts: </h5>
				<p>{'facebook: ' + props.profile.contacts.facebook}</p>
				<p>{'vk: ' + props.profile.contacts.vk}</p>
				<p>{'twitter: ' + props.profile.contacts.twitter}</p>
				<p>{'instagram: ' + props.profile.contacts.instagram}</p>
				<p>{'youtube: ' + props.profile.contacts.youtube}</p>
				<p>{'github: ' + props.profile.contacts.github}</p> */}
			</div>
		</div>
	)
}

const Contact = ({ contactTitle, contactValue }) => {
	return (
		<div>
			<b>{contactTitle}</b>: {contactValue}
		</div>
	)
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
	return (
		<div>
			{isOwner && <button onClick={goToEditMode}>Edit</button>}
			<div>
				<b>Full Name: </b>
				{profile.fullName}
			</div>
			<div>
				<b>Looking for a job: </b>
				{profile.lookingForAJob ? 'yes' : 'no'}
			</div>
			{profile.lookingForAJob && (
				<div>
					<b>My professional skills :</b>
					{profile.lookingForAJobDescription}
				</div>
			)}
			<div>
				<b>About me :</b> {profile.aboutMe}
			</div>
			<div>
				<b>Contacts: </b>{' '}
				{Object.keys(profile.contacts).map(key => (
					<Contact
						key={key}
						contactTitle={key}
						contactValue={profile.contacts[key]}
					/>
				))}
			</div>
		</div>
	)
}

export default ProfileInfo
