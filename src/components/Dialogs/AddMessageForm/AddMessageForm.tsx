import { InjectedFormProps, reduxForm } from 'redux-form';
import { maxLength100, required } from '../../../utils/validators/validators';
import {
    Textarea,
    createField
} from '../../hoc/FormsControls/createFormsControls';
import { NewMessageFormType } from '../Dialogs';
import React from 'react';

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>;
type PropsType = {};

const AddMessageForm: React.FC<
    InjectedFormProps<NewMessageFormType, PropsType> & PropsType
> = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<NewMessageFormValuesKeysType>(
                'Enter your message',
                'newMessageBody',
                [required, maxLength100],
                Textarea
            )}
            <button>Enter</button>
        </form>
    );
};

const AddMessageFormRedux = reduxForm<NewMessageFormType>({
    form: 'dialogAddMessageForm'
})(AddMessageForm);

export default AddMessageFormRedux;
