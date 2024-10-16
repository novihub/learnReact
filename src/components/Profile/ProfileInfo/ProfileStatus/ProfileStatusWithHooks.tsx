import React, { useEffect, useState } from 'react';
import classes from './ProfileStatus.module.css';

interface ProfileStatusWithHooksProps {
  status: string;
  updateStatus: (status: string) => void;
}

const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksProps> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div className={classes.ProfileStatus}>
      {editMode ? (
        <div>
          <input
            autoFocus
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
            value={status}
          />
        </div>
      ) : (
        <div>
          <p onDoubleClick={activateEditMode}>{props.status || 'No status'}</p>
          {/* <p onDoubleClick={activateEditMode}>{props.aboutMe}</p> */}
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
