import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileProps } from '../../types/types'; 
import classes from './Profile.module.css';

const Profile: React.FC<ProfileProps> = (props) => {
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
      <MyPostsContainer isOwner={false} posts={[]} newPostText={''} addPost={function (newPostText: string): void {
				throw new Error('Function not implemented.')
			} } deletePost={function (postId: number): void {
				throw new Error('Function not implemented.')
			} } />
    </div>
  );
};

export default Profile;
