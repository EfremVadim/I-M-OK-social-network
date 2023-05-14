import profileReducer, {actions} from "./profile-reducer";
import {PostsType, ProfileType} from "../types/types";

let state = {
    posts: [
        {id: 1, message: 'Hello, how are you', likesCount: 333},
        {id: 2, message: 'It is my first post', likesCount: 777},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    fullName: null as string | null,
    userId: null as number | null,
    status: ''
}

it('should increment posts length', () => {

    // enter test data
    let action = actions.addPostActionCreator('Hey, are you awesome!');

    //create an action
    let newState = profileReducer(state, action)

    //expectation
    expect(newState.posts.length).toBe(3)
});

it('post message should be correct', () => {

    // enter test data
    let action = actions.addPostActionCreator('Hey, are you awesome!');

    //create an action
    let newState = profileReducer(state, action)

    //expectation
    expect(newState.posts[2].message).toBe('Hey, are you awesome!')
});

it('posts length should decrement after deleting post', () => {

    // enter test data
    let action = actions.deletePost(1)

    //create an action
    let newState = profileReducer(state, action)

    //expectation
    expect(newState.posts.length).toBe(1)
});
it("posts length shouldn't decremented if postId is incorrect", () => {

    // enter test data
    let action = actions.deletePost(333)

    //create an action
    let newState = profileReducer(state, action)

    //expectation
    expect(newState.posts.length).toBe(2)
});
