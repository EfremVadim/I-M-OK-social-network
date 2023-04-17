import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilities/validators/Validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";

const MyPosts = (props) => {

    let postsElements = props.posts.map(p =>
        <Post key={p.id}
              id={p.id}
              message={p.message}
              likesCount={p.likesCount}/>)

    let addNewPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <AddNewPostReduxForm onSubmit={addNewPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};

const maxLength30 = maxLengthCreator(30)

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required, maxLength30]}
                       component={Textarea}
                       name='newPostText'
                       placeholder='Enter new text'/>
            </div>
            <div>
                <button>Add post</button>
            </div>

        </form>
    )
}

let AddNewPostReduxForm = reduxForm({form: 'myPostForm'})(AddNewPostForm)

export default MyPosts;
