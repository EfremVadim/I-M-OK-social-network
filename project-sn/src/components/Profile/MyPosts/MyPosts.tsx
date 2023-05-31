import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import AddNewPostForm, {AddPostFormValuesType} from "./AddNewPostForm"
import {PostsType} from "../../../types/types";

type PropsType = {
    posts: Array<PostsType>
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = (props) => {

    let postsElements = props.posts.map(p =>
        <Post key={p.id}
              id={p.id}
              message={p.message}
              likesCount={p.likesCount}/>)

    let addNewPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <AddNewPostForm onSubmit={addNewPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts

