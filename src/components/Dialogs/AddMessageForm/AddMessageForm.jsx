import { Field, reduxForm } from 'redux-form'
import { maxLength100, required } from '../../../utils/validators/validators'
import { Textarea } from '../../hoc/createFormsControls'

const AddMessageForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field
				component={Textarea}
				validate={[required, maxLength100]}
				name='newMessageBody'
				placeholder='Enter your message'
			></Field>
			<button>Enter</button>
		</form>
	)
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(
	AddMessageForm
)

export default AddMessageFormRedux
