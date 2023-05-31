export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type ContactsType = {
    github: null | string
    vk: null | string
    facebook: null | string
    instagram: null | string
    twitter: null | string
    website: null | string
    youtube: null | string
    mainLink: null | string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType | null
    photos: PhotosType | null
    aboutMe: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
