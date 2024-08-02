import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { compose } from 'redux';
import {
  getStatus,
  savePhoto,
  saveProfile,
  setUserProfile,
  updateStatus
} from '../../redux/profile-reducer';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';
import Preloader from '../common/Preloader/Preloader';
import Profile from './Profile';

interface ProfileContainerProps {
  profile: ProfileType | null;
  status: string;
  authorizedUserId: number | null;
  isAuth: boolean;
  setUserProfile: (userId: number) => Promise<void>;
  getStatus: (userId: number) => Promise<void>;
  updateStatus: (status: string) => Promise<void>;
  savePhoto: (file: File) => Promise<void>;
  saveProfile: (profile: ProfileType) => Promise<void>;
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
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useParams<{ userId: string }>();

  const userToLoad = userId ? Number(userId) : authorizedUserId;

  useEffect(() => {
    const fetchData = async () => {
      if (userToLoad) {
        setIsLoading(true);
        try {
          await setUserProfile(userToLoad);
          await getStatus(userToLoad);
          setIsOwner(Number(userToLoad) === Number(authorizedUserId));
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [userToLoad, setUserProfile, getStatus, authorizedUserId]);

  if (!isAuth && !userToLoad) {
    return <Navigate to="/login" />;
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
  );
};

const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

export default compose(
  connect(mapStateToProps, {
    setUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  })
)(ProfileContainer);
