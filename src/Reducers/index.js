import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

/*
 * Login with mongo db
*/
import DBLoginStatus from './DB/DBLoginStatus';//Log in-db
import DBUserData from './DB/DBUserData';
import DBUserSharedData from './DB/DBUserSharedData';
import DBUserLikesData from './DB/DBUserLikesData';
import DBUserCollectionsData from './DB/DBUserCollectionsData';
import DBUserFollowingsData from './DB/DBUserFollowingsData';
import NavsLength from './DB/NavsLength';

/*
 * Login as guest with localstorage
*/
import LocalStorageLoginStatus from './LocalStroage/LocalStorageLoginStatus';//Log in-localstorage
import UserData from './LocalStroage/UserData';//User Data
import SharedData from './LocalStroage/SharedData';//Shared Data
import LikesData from './LocalStroage/LikesData';//Likes Data
import CollectionsData from './LocalStroage/CollectionsData';//Collection
import FollowingsData from './LocalStroage/FollowingsData';//Following Users

/*
 *
 * All this methods works with both login methods(database, localStroge)
 * 
*/
import HackerNews from './HackerNews';//Hackernews api
import UnsplashSearchedPhotos from './UnsplashSearchedPhotos';//Generate photos
import SearchedPhotosBool from './SearchedPhotosBool';//Search page
import UnsplashRandomPhotos from './UnsplashRandomPhotos';//Generate random photos
import NewPost from './NewPost';//Post anything
import UnsplashNewPostSearchPhotos from './UnsplashNewPostSearchPhotos';//Ability to search photos in newPost
import NewPostUploadedPhotos from './NewPostUploadedPhotos';//Ability to upload photos in newPost
import UserMessage from './UserMessage';//Send messages to users
import UnsplashUser from './UnsplashUser';//Users
import UnsplashUserPhotos from './UnsplashUserPhotos';//Photos
import UnsplashUserLikes from './UnsplashUserLikes';//Likes
import UnsplashUserCollections from './UnsplashUserCollections';// Collections
import UnsplashCollectionPhotos from './UnsplashCollectionPhotos';// Collections photos
import CollectionPhotos from './CollectionPhotos';
import CollectionPhotosPreview from './CollectionPhotosPreview';//collection photos preview helper
import Comments from './Comments';//Comments

export default combineReducers({
    form: formReducer,
    /* Login with mongo db */
    DBLoginStatus,
    DBUserData,
    DBUserSharedData,
    DBUserLikesData,
    DBUserCollectionsData,
    DBUserFollowingsData,
    NavsLength,
    /* Login as guest with localstorage */ 
    LocalStorageLoginStatus,
    UserData,
    SharedData,
    LikesData,
    CollectionsData,
    CollectionPhotos,
    FollowingsData,
    /* All this methods works with both login methods(database, localStroge) */
    HackerNews,
    UnsplashSearchedPhotos,
    SearchedPhotosBool,
    UnsplashRandomPhotos,
    NewPost,
    UnsplashNewPostSearchPhotos,
    NewPostUploadedPhotos,
    UserMessage,
    CollectionPhotosPreview,
    Comments,
    /* fetch from unsplash */
    UnsplashUser,
    UnsplashUserPhotos,
    UnsplashUserLikes,
    UnsplashUserCollections,
    UnsplashCollectionPhotos,
});