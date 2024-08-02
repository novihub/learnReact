import React from 'react'
import { Field } from 'redux-form'
import { FieldValidatorType } from '../../../utils/validators/validators'
import classes from './createFormsControls.module.css'

type ElementParamsType = {
	input: any
	meta: {
		touched: boolean
		error: string
	}
	children?: React.ReactNode
}

const Element =
	(Element: React.FC | string): React.FC<ElementParamsType> =>
	({ input, meta: { touched, error }, children, ...props }) => {
		const hasError = touched && error

		return (
			<div className={`${classes.Textarea} ${hasError ? classes.error : ''}`}>
				<Element {...input} {...props} />
				{hasError && <span>{error}</span>}
			</div>
		)
	}

export const Textarea = Element('textarea')

export const Input = Element('input')

export function createField<LoginFormValuesTypeKeys extends string>(
	placeholder: string,
	name: LoginFormValuesTypeKeys,
	validators: Array<FieldValidatorType>,
	component: string | React.FC<any>,
	props = {},
	text = ''
) {
	return (
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
}
