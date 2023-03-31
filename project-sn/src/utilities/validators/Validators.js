import React from 'react'

export const required = values => {

    if (values) return undefined

    return 'Field is require'
}

export const maxLengthCreator = maxLength => values => {

    if (values.length > maxLength) return `Max length ${maxLength} symbols`

    return undefined
}
