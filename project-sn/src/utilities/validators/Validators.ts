export type FieldsValidatorsType = (values: string) => string | undefined

export const required: FieldsValidatorsType = (values) => {

    if (values) return undefined

    return 'Field is require'
}

export const maxLengthCreator = (maxLength: number): FieldsValidatorsType => values => {

    if (values.length > maxLength) return `Max length ${maxLength} symbols`

    return undefined
}
