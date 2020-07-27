import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

import HackerNews from './HackerNews';
import fetchPhotos from './fetchPhotos';
import isSearched from './isSearched';
import fetchRandomPhotos from './fetchRandomPhotos';
import newPost from './newPost';
import PostSearchPhotos from './PostSearchPhotos';
import UploadedPhotos from './UploadedPhotos';
import newMessage from './newMessage';
import fetchNames from './fetchNames';
import fetchUser from './fetchUser';
/* Photos */
import fetchUserPhotos from './fetchUserPhotos';
/* Likes */
import fetchUserLikes from './fetchUserLikes';
/* Collection */
import fetchUserCollection from './fetchUserCollection';
import fetchUserCollectionPhotos from './fetchUserCollectionPhotos';
import fetchUserCollectionPhotosDetailes from './fetchUserCollectionPhotosDetailes';
/* Comment */
import Comments from './Comments';
/* Log in */
import isLogIn from './isLogIn';
/* UnplashTerm */
import isUnplashTerm from './isUnplashTerm';
/* Profile Data */
import ProfileData from './ProfileData';
/* Shared Profile Data */
import SharedData from './SharedData';
/* get Likes data */
import getLikesData from './getLikesData';
/* Likes Photo */
import likePhoto from './likePhoto';
/* Collection Photo */
import Collection from './Collection';
/* Likes Profile Data */
import LikesData from './LikesData';
/* Following */
import isFollowing from './isFollowing';

export default combineReducers({
    form: formReducer,
    HackerNews,
    fetchPhotos,
    isSearched,
    fetchRandomPhotos,
    newPost,
    PostSearchPhotos,
    UploadedPhotos,
    newMessage,
    fetchNames,
    fetchUser,
    /* Photos */
    fetchUserPhotos,
    /* Likes */
    fetchUserLikes,
    /* Collection */
    fetchUserCollection,
    fetchUserCollectionPhotos,
    fetchUserCollectionPhotosDetailes,
    /* Comments */
    Comments,
    /* Log in */
    isLogIn,
    /* Unplash Term */
    isUnplashTerm,
    /* Profile Data */
    ProfileData,
    /* Shared Profile Data */
    SharedData,
    /* get Likes data */
    getLikesData,
    /* Collection Photo */
    Collection,
    /* Likes Photo */
    likePhoto,
    /* Likes Profile Data */
    LikesData,
    isFollowing,
});