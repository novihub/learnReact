import classes from './createFormsControls.module.css'

const Element =
	Element =>
	({input, meta, ...props}) => {
		const hasError = meta.touched && meta.error

		return (
			<div className={classes.Textarea + ' ' + (hasError && classes.error)}>
				<Element {...input} {...props}/>
				{hasError && <span>{meta.error}</span>}
			</div>
		)
	}

export const Textarea = Element('textarea')

export const Input = Element('input')