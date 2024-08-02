import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import {
  createField,
  Input,
  Textarea
} from '../../../hoc/FormsControls/createFormsControls';
import classes from '../../../Login/Login.module.css'; // Adjust the import path as needed
import { ProfileType } from '../../../../types/types'; // Adjust the import path as needed

interface ProfileDataFormProps {
  profile: ProfileType;
  error?: string;
}

type ProfileDataFormValues = {
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  aboutMe: string;
  contacts: {
    [key: string]: string;
  };
};

const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormValues, ProfileDataFormProps> & ProfileDataFormProps> = ({
  handleSubmit,
  profile,
  error
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <button>Save</button>
      {error && <div className={classes.FormSummaryError}>{error}</div>}
      <div>
        <b>Full Name: </b>
        {createField('Full name', 'fullName', [], Input)}
      </div>
      <div>
        <b>Looking for a job: </b>
        {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
      </div>
      <div>
        <b>My professional skills :</b>
        {createField(
          'My professional skills',
          'lookingForAJobDescription',
          [],
          Textarea
        )}
      </div>
      <div>
        <b>About me :</b>
        {createField('About me', 'aboutMe', [], Textarea)}
      </div>
      <div>
        <b>Contacts: </b>{' '}
        {Object.keys(profile.contacts).map(key => (
          <div key={key}>
            <b>
              {key}: {createField(key, `contacts.${key}`, [], Input)}
            </b>
          </div>
        ))}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<ProfileDataFormValues, ProfileDataFormProps>({
  form: 'edit-profile'
})(ProfileDataForm);

export default ProfileDataFormReduxForm;
