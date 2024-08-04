import { Field, Form, Formik } from 'formik'
import React from 'react'
import { FilterType } from '../../redux/users-reducer'

const UsersSearchFormValidate = (values: any) => {
	const errors = {}
	// if (!values.email) {
	// 	errors.email = 'Required'
	// } else if (
	// 	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
	// ) {
	// 	errors.email = 'Invalid email address'
	// }
	return errors
}

// interface UsersSearchFormObjectType {
// 	term: string
// }

type UsersSearchFormPropsType = {
	onFilterChanged: (filter: FilterType) => void
	term: string
	isFollowed: boolean | null
}

const UsersSearchForm: React.FC<UsersSearchFormPropsType> = ({
	onFilterChanged,
	term,
	isFollowed
}) => {
	const submit = (
		values: FilterType,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
	) => {
		onFilterChanged(values)
		setSubmitting(false)
	}

	return (
		<div>
			<Formik
				initialValues={{ term, isFollowed }}
				validate={UsersSearchFormValidate}
				onSubmit={submit}
			>
				{({
					values,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting
					/* and other goodies */
				}) => (
					<Form onSubmit={handleSubmit}>
						<Field
							type='text'
							name='term'
							placeholder='Search'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.term}
						/>
						<Field as='select' name='isFollowed'>
							<option value='null'>All</option>
							<option value='true'>Followed</option>
							<option value='false'>Unfollowed</option>
						</Field>
						<button type='submit' disabled={isSubmitting}>
							Search
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default UsersSearchForm
