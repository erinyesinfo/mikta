/*
 * Login with mongo db
*/
export const getDBLoginStatus_type = 'getDBLoginStatus_type';//Db
export const getDBUserData_type = 'getDBUserData_type';//User Data
export const getDBUserSharedData_type = 'getDBUserSharedData_type';//Shared Data
export const getDBUserLikesData_type = 'getDBUserLikesData_type';//Likes Data
export const getDBUserCollectionsData_type = 'getDBUserCollectionsData_type';//Collection Data
export const getDBUserFollowingData_type = 'getDBUserFollowingData_type';//Following Data


/*
 * Login as guest with localstorage
*/
export const getLocalStorageLoginStatus_type = 'getLocalStorageLoginStatus_type';//Localstorage
export const getUserData_type = 'getUserData_type';//User Data
export const getUserSharedData_type = 'getUserSharedData_type';//Shared Data
export const getUserLikesData_type = 'getUserLikesData_type';//Likes Data
export const getUserCollectionsData_type = 'getUserCollectionsData_type';//Collection Data
export const getUserFollowingData_type = 'getUserFollowingData_type';//Following Data


/*
 *
 * All this methods works with both login methods(database, localStroge) 
 * 
*/
export const getHackerNewsApi_type = 'getHackerNewsApi_type';//Hackernews Api

export const getNewPost_type = 'getNewPost_type';//Post anything
export const unsplash_getPostSearchPhotos_type = 'unsplash_getPostSearchPhotos_type';//Search image in your post
export const getNewPost_UploadPhotos_type = 'getNewPost_UploadPhotos_type';//newPost(ability to upload)

export const getSearchedPhotosBool_type = 'getSearchedPhotosBool_type';//check wether search is on
export const unsplash_getSearchedPhotos_type = 'unsplash_getSearchedPhotos_type';//Unsplash Photos
export const unsplash_getRandomPhotos_type = 'unsplash_getRandomPhotos_type';//Unsplash Random photos
export const getUserMessage_type = 'getUserMessage_type';//Send messages to user
export const unsplash_getUser_type = 'unsplash_getUser_type';//Unsplash User
export const unsplash_getUserPhotos_type = 'unsplash_getUserPhotos_type';//Unsplash User Photos
export const unsplash_getUserLikes_type = 'unsplash_getUserLikes_type';//Unsplash User Likes
export const unsplash_getUserCollections_type = 'unsplash_getUserCollections_type';//Unsplash User Collections
export const unsplash_getUserCollectionPhotos_type = 'unsplash_getUserCollectionPhotos_type';//Unsplash Users Collection Photos
export const getUserCollectionPhotos_type = 'getUserCollectionPhotos_type';

export const getCollectionPhotosPreview_type = 'getCollectionPhotosPreview_type';
export const getComments_type = 'getComments_type';//Comments
