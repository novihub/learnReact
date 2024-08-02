import React, { useState } from 'react';
import classes from './ProfileInfo.module.css';
import userPhoto from '../../../assets/user.png';
import Preloader from '../../common/Preloader/Preloader';
import ProfileDataForm from './ProfileDataForm/ProfileDataForm';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import { ProfileType, ProfileDataFormValues } from '../../../types/types';

type ProfileInfoProps = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<void>;
  isOwner: boolean;
};

const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const { photos } = props.profile;

  const onSubmit = (formData: ProfileDataFormValues) => {
    if (!props.profile) return;

    const updatedProfile: ProfileType = {
      ...props.profile,
      ...formData,
      id: props.profile.id, 
    };

    props.saveProfile(updatedProfile).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className={classes.Profile}>
      <div className={classes.Avatar}>
        <img src={photos.large || userPhoto} alt='Profile' />
        {props.isOwner && (
          <input type='file' onChange={onMainPhotoSelected} />
        )}
      </div>
      <div className={classes.ProfileInfo}>
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
        {editMode ? (
          <ProfileDataForm
            initialValues={props.profile as ProfileDataFormValues} 
            profile={props.profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            profile={props.profile}
            isOwner={props.isOwner}
            goToEditMode={() => setEditMode(true)}
          />
        )}
      </div>
    </div>
  );
};

type ContactProps = {
  contactTitle: string;
  contactValue: string;
};

const Contact: React.FC<ContactProps> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

type ProfileDataProps = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};

const ProfileData: React.FC<ProfileDataProps> = ({ profile, isOwner, goToEditMode }) => {
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
          <b>My professional skills:</b>
          {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me:</b> {profile.aboutMe}
      </div>
      <div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map(key => (
          <Contact
            key={key}
            contactTitle={key}
            contactValue={profile.contacts[key] || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileInfo;
