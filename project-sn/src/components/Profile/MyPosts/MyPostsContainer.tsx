import { connect } from 'react-redux';
import {actions} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,

  }
}

let mapDispatchToProps = (dispatch) => {
  return {

    addPost: (newPostText) => {
      dispatch(actions.addPostActionCreator(newPostText))
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);




export default MyPostsContainer;