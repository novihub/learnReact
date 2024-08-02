export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
	if (value) return undefined

	return 'Field is required'
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
	if (value && value.length > maxLength)
		return `Max length is ${maxLength} symbols`

	return undefined
}

export const maxLength10 = maxLengthCreator(10)
export const maxLength100 = maxLengthCreator(100)
