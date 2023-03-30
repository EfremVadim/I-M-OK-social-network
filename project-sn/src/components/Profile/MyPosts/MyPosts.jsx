import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";

const MyPosts = (props) => {

    let postsElements = props.posts.map(p =>
        <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

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

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newPostText' placeholder='Enter new text'/>
            </div>
            <div>
                <button>Add post</button>
            </div>

        </form>
    )
}

let AddNewPostReduxForm = reduxForm({form: 'myPostForm'})(AddNewPostForm)

export default MyPosts;
