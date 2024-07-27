import { Field } from 'redux-form'
import classes from './createFormsControls.module.css'

const Element =
	Element =>
	({ input, meta: { touched, error }, ...props }) => {
		const hasError = touched && error

		return (
			<div className={classes.Textarea + ' ' + (hasError && classes.error)}>
				<Element {...input} {...props} />
				{hasError && <span>{error}</span>}
			</div>
		)
	}

export const Textarea = Element('textarea')

export const Input = Element('input')

export const createField = (
	placeholder,
	name,
	validators,
	component,
	props = {},
	text = null
) => (
	<div>
		<Field
			validate={validators}
			placeholder={placeholder}
			name={name}
			component={component}
			{...props}
		/>
		{text}
	</div>
)
