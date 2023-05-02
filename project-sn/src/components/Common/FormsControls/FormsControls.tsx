import React from 'react'
import styles from './FormsControls.module.css'
import {Field, WrappedFieldProps} from "redux-form";
import {FieldsValidatorsType} from "../../../utilities/validators/Validators";
import {WrappedFieldMetaProps} from "redux-form/lib/Field";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {

    const hasError = touched && error;

    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {

    const {input, meta, ...restProps} = props

    return <FormControl {...props}>
        <textarea {...input} {...restProps} />
    </FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {

    const {input, meta, ...restProps} = props

    return <FormControl {...props}>
        <input {...input} {...restProps} />
    </FormControl>
}

 export function createField<FormTypesKey extends string>(validators: Array<FieldsValidatorsType>,
                            placeholder: string | undefined,
                            name: FormTypesKey,
                            component: React.FC<WrappedFieldProps> ,
                            text = '',
                            props = {}) {
    return (
        <div>
            <Field
                validate={validators}
                placeholder={placeholder}
                name={name}
                component={component}
                {...props}>

            </Field>{text}
        </div>
    )
}