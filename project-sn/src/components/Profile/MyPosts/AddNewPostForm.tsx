import {maxLengthCreator, required} from "../../../utilities/validators/Validators"
import {createField, GetStringKeys, Input} from "../../Common/FormsControls/FormsControls"
import {InjectedFormProps, reduxForm} from "redux-form"
import React from "react"

const maxLength30 = maxLengthCreator(30)

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddNewPostFormValuesTypeKeys>(
                    [required, maxLength30], 'Enter new post text', 'newPostText', Input)}
            </div>
            <div>
                <button>Add post</button>
            </div>

        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({form: 'myPostForm'})(AddNewPostForm)

type PropsType = {}
type AddNewPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>
export type AddPostFormValuesType = {
    newPostText: string
}
