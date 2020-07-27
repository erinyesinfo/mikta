import uuid from 'uuid/v4';//uuid generate random id's
import Server from '../API/Server';// mikta server api
import unsplash from '../API/Unsplash';// unsplash api

import {
    /* Login with mongo db */
    getDBLoginStatus_type, getDBUserData_type, getDBUserSharedData_type, getDBUserLikesData_type, getDBUserCollectionsData_type, getDBUserFollowingData_type,
    /* Login as guest with localstorage */
    getLocalStorageLoginStatus_type, getUserData_type, getUserSharedData_type, getUserLikesData_type, getUserCollectionsData_type, getUserFollowingData_type,
    /* All this methods works with both login methods(database, localStroge) */
    getHackerNewsApi_type, unsplash_getSearchedPhotos_type, getSearchedPhotosBool_type, getNewPost_UploadPhotos_type, getNewPost_type, unsplash_getPostSearchPhotos_type, getUserMessage_type, unsplash_getRandomPhotos_type, unsplash_getUser_type, unsplash_getUserPhotos_type, unsplash_getUserCollections_type, unsplash_getUserCollectionPhotos_type, getUserCollectionPhotos_type, unsplash_getUserLikes_type, getCollectionPhotosPreview_type, getComments_type,
} from './types';

/*
 * Login with mongo db
*/
export const handleDBloginStatus = bool => dispatch => {
    dispatch({ type: getDBLoginStatus_type, payload: bool });
};

// update data, db user after the app render
export const handleDidMountUserData = (userData, photo) => (dispatch, getState) => {
    const data = {
        ...userData,
        profileImage: photo === '' ? getState().DBUserData.profileImage:photo,
    };
    localStorage.setItem("data-db", JSON.stringify(data));
    dispatch({ type: getDBUserData_type, payload: data });
};

// user account data(memorise it in database)
export const handleUpdateDBUserData = data => dispatch => {
    localStorage.setItem("data-db", JSON.stringify(data));
    dispatch({ type: getDBUserData_type, payload: data });
};

// shared images, db user after the app render
export const handleDidMountSharedData = sharedsData => dispatch => {
    const data = sharedsData;
    localStorage.setItem("shareData-db", JSON.stringify(data));
    return dispatch({ type: getDBUserSharedData_type, payload: data });
};
// shareData
export const handleUpdateShareDataDB = (formValues, imageData, id, description, likes) => async (dispatch, getState) => {
    let d = new Date(), hours = d.getHours(), minutes = d.getMinutes();
    var dd = d.getDate();
    var mm = d.getMonth()+1; //January is 1!
    var yyyy = d.getFullYear();

    if (dd<10) dd = '0'+dd
    if (mm<10) mm = '0'+mm
    if (hours < 10) { hours = '0' + hours}
    if (minutes < 10) { minutes = '0' + minutes}

    const day = mm + '-' + dd + '-' + yyyy;
    const time = `${hours}:${minutes} H/MN`;
    // image is null(add 2 more argument(5 argument)), share data without image
    if ((typeof(formValues) === "string" || formValues === null) && imageData === null && id.length !== 0) {
        const data = {
            myDescription: formValues,
            imageData, // null
            id,
            description,
            likes,
            time,
            day,
        };
        const moreData = [ ...getState().DBUserSharedData, data ];
        localStorage.setItem("shareData-db", JSON.stringify(moreData));
        dispatch({ type: getDBUserSharedData_type, payload: moreData });
        // save to db
        return await Server.post("/data-shared", moreData);
    }
    // share image data, only two argument(description typeof is string, img typeof is object)
    else if ((typeof(formValues) === "string" || typeof(formValues) === 'undefined') && typeof(imageData) === 'object') {
        let filterImageData;
        if (imageData.user) {
            filterImageData = {
                id: imageData.id,
                description: imageData.description,
                urls: {
                    full: imageData.urls.full,
                    regular: imageData.urls.regular,
                    small: imageData.urls.small,
                },
                likes: imageData.likes,
                user: {
                    id: imageData.user.id,
                    username: imageData.user.username,
                    name: imageData.user.name,
                    first_name: imageData.user.first_name,
                    last_name: imageData.user.last_name,
                    twitter_username: imageData.user.twitter_username,
                    instagram_username: imageData.user.instagram_username,
                    portfolio_url: imageData.user.portfolio_url,
                    location: imageData.user.location,
                    bio: imageData.user.bio,
                    total_photos: imageData.user.total_photos,
                    total_likes: imageData.user.total_likes,
                    total_collections: imageData.user.total_collections,
                    profile_image: imageData.user.profile_image,
                    accepted_tos: imageData.user.accepted_tos,
                }
            };
        } else {
            filterImageData = {
                id: imageData.id,
                description: imageData.description,
                dataURL: imageData.dataURL,
                file: imageData.file,
                likes: imageData.likes
            };
        }
        const data = { myDescription: formValues, ...filterImageData, time, day };
        const uniqueData = handleUniqueData(getState().DBUserSharedData, data);
     
        window.localStorage.setItem("shareData-db", JSON.stringify(uniqueData));
        dispatch({ type: getDBUserSharedData_type, payload: uniqueData });
        // save to db
        return await Server.post("/data-shared", uniqueData);
    }
    // edit shared image data, only two argument(description typeof is string, id typeof is string)
    else if (typeof(formValues) === "string" && typeof(imageData) === 'string') {
        const _id = imageData, myDescription = formValues;
        if (_id.length === 0) return null;
        const edited = getState().DBUserSharedData.map(data => {
            if (myDescription === data.description) {
                return { ...data, myDescription: null }
            } else {
                if (data.id === _id) {
                    return { ...data, myDescription }
                } return data
            }
        });
        
        localStorage.setItem("shareData-db", JSON.stringify(edited));
        dispatch({ type: getDBUserSharedData_type, payload: edited });
        // save to db
        return await Server.post("/data-shared", edited);
    }
    // remove shared data, only one argument(id typeof string)    
    const _id = formValues;
    if (_id.length === 0) return null;
    const removed = getState().DBUserSharedData.filter(data => data.id !== _id);
    
    localStorage.setItem("shareData-db", JSON.stringify(removed));
    dispatch({ type: getDBUserSharedData_type, payload: removed });
    // save to db
    await Server.post("/data-shared", removed);
};

// liked images, db user after the app render
export const handleDidMountLikesData = imagesData => dispatch => {
    const data = imagesData;
    localStorage.setItem("likesData-db", JSON.stringify(data));
    return dispatch({ type: getDBUserLikesData_type, payload: data });
};
// add liked images */
export const handleUpdateLikesDataDB = imageData => async (dispatch, getState) => {
    // remove this image from my data
    if (typeof(imageData) === 'string') {
        const id = imageData;
        if (id.length === 0) return null;
        const removed = getState().DBUserLikesData.filter(data => data.id !== id);
        localStorage.setItem("likesData-db", JSON.stringify(removed));
        dispatch({ type: getDBUserLikesData_type, payload: removed });
        // save to db
        return await Server.post("/data-likes", removed);
    }
    // typeof(imageData) === 'object' add new image
    let filterImageData = {
        id: imageData.id,
        created_at: imageData.created_at,
        width: imageData.width,
        height: imageData.height,
        description: imageData.description,
        alt_description: imageData.alt_description ? imageData.alt_description:'',
        urls: {
            full: imageData.urls.full,
            regular: imageData.urls.regular,
            small: imageData.urls.small,
        },
        likes: imageData.likes,
        user: {
            id: imageData.user.id,
            username: imageData.user.username,
            name: imageData.user.name,
            first_name: imageData.user.first_name,
            last_name: imageData.user.last_name,
            twitter_username: imageData.user.twitter_username,
            instagram_username: imageData.user.instagram_username,
            portfolio_url: imageData.user.portfolio_url,
            location: imageData.user.location,
            bio: imageData.user.bio,
            total_photos: imageData.user.total_photos,
            total_likes: imageData.user.total_likes,
            total_collections: imageData.user.total_collections,
            profile_image: imageData.user.profile_image,
            accepted_tos: imageData.user.accepted_tos,
        },
        exif: {
            make: imageData.exif ? imageData.exif.make ? imageData.exif.make:'':'',
            model: imageData.exif ? imageData.exif.model ? imageData.exif.model:'':'',
            exposure_time: imageData.exif ? imageData.exif.exposure_time ? imageData.exif.exposure_time:'':'',
            aperture: imageData.exif ? imageData.exif.aperture ? imageData.exif.aperture:'':'',
            focal_length: imageData.exif ? imageData.exif.focal_length ? imageData.exif.focal_length:'':'',
            iso: imageData.exif ? imageData.exif.iso ? imageData.exif.iso:'':'',
        },
        views: imageData.views,
        downloads: imageData.downloads,
    };
    const data = handleUniqueData(getState().DBUserLikesData, filterImageData);
    localStorage.setItem("likesData-db", JSON.stringify(data));
    dispatch({ type: getDBUserLikesData_type, payload: data });
    // save to db
    return await Server.post("/data-likes", data);
};

// collection images, db user after the app render
export const handleDidMountCollectionsData = collectionsData => dispatch => {
    const data = collectionsData;
    localStorage.setItem("collectionData-db", JSON.stringify(data));
    return dispatch({ type: getDBUserCollectionsData_type, payload: data });
};
// Collection: add, update, remove
export const handleUpdateCollectionsDataDB = (name, description, img, thisData, fullData) => async (dispatch, getState) => {
    //or (name, true, imgsrc, thisData, fulldata)
    if (description === true && typeof(img) === 'string') {
        // img === src img
        const removed = getState().DBUserCollectionsData.map(data => {
            if (data.name === name) {
                if (fullData.id === data.id) {
                    if (data.preview_photos.length === 1) {
                        return { ...data, preview: '', preview_photos: [] };
                    } else if (data.preview_photos.length > 1) {
                        return { ...data, preview: thisData.preview_photos[0].preview };
                    }
                } else {
                    if (data.preview_photos.length === 1) {
                        return { ...data, preview: fullData.urls.regular, preview_photos: [ fullData, data.img ] };
                    } else if (data.preview_photos.length > 1) {
                        return { ...data, preview: thisData.preview_photos[0].preview };
                    }
                } return data;
            } return data;
        });
        localStorage.setItem("collectionData-db", JSON.stringify(removed));
        dispatch({ type: getDBUserCollectionsData_type, payload: removed });
        // save to db
        return await Server.post("/data-collection", removed);
    } else if (description === false && typeof(img) === 'string') {
        // img === src img(string),
        const add = getState().DBUserCollectionsData.map(data => {
            if (data.name === name) {
                if (fullData.id === data.id) {
                    if (data.preview_photos.length === 0) {
                        return {
                            ...data,
                            preview: img,
                            preview_photos: [ data.img ]
                        };
                    } else {
                        if (data.preview_photos.length > 1) {
                            const find = data.preview_photos.find(findData => findData.id === fullData.id);
                            if (find) {
                                const findIndex = data.preview_photos.findIndex(findData => findData.id === fullData.id);
                                if (find && findIndex === 0) {
                                    return {
                                        ...data, 
                                        preview_photos: data.preview_photos.filter(
                                            filterData => filterData.urls.regular !== data.img.urls.regular),
                                        preview: data.preview_photos[1].urls.regular,
                                        img: {
                                            description: data.preview_photos[1].description,
                                            urls: data.preview_photos[1].urls
                                        }
                                    };
                                } return { 
                                    ...data,
                                    preview_photos: data.preview_photos.filter(
                                        filterData => filterData.urls.regular !== data.img.urls.regular),
                                    preview: data.preview_photos[0].urls.regular,
                                    img: {
                                        description: data.preview_photos[0].description,
                                        urls: data.preview_photos[0].urls
                                    }
                                };
                            } return { 
                                ...data, 
                                preview_photos: data.preview_photos.filter(
                                    filterData => filterData.urls.regular !== data.img.urls.regular),
                                preview: data.preview_photos[1].urls.regular,
                                img: {
                                    description: data.preview_photos[1].description,
                                    urls: data.preview_photos[1].urls
                                }
                            };
                        } return { 
                            ...data, 
                            preview: '', 
                            preview_photos: [],
                        };
                    }
                } else {
                    let filterFullData = {
                        id: fullData.id,
                        created_at: fullData.created_at,
                        width: fullData.width,
                        height: fullData.height,
                        description: fullData.description,
                        alt_description: fullData.alt_description ? fullData.alt_description:'',
                        urls: {
                            full: fullData.urls.full,
                            regular: fullData.urls.regular,
                            small: fullData.urls.small,
                        },
                        likes: fullData.likes,
                        user: {
                            id: fullData.user.id,
                            username: fullData.user.username,
                            name: fullData.user.name,
                            first_name: fullData.user.first_name,
                            last_name: fullData.user.last_name,
                            twitter_username: fullData.user.twitter_username,
                            instagram_username: fullData.user.instagram_username,
                            portfolio_url: fullData.user.portfolio_url,
                            location: fullData.user.location,
                            bio: fullData.user.bio,
                            total_photos: fullData.user.total_photos,
                            total_likes: fullData.user.total_likes,
                            total_collections: fullData.user.total_collections,
                            profile_image: fullData.user.profile_image,
                            accepted_tos: fullData.user.accepted_tos,
                        },
                        exif: {
                            make: fullData.exif ? fullData.exif.make ? fullData.exif.make:'':'',
                            model: fullData.exif ? fullData.exif.model ? fullData.exif.model:'':'',
                            exposure_time: fullData.exif ? fullData.exif.exposure_time ? fullData.exif.exposure_time:'':'',
                            aperture: fullData.exif ? fullData.exif.aperture ? fullData.exif.aperture:'':'',
                            focal_length: fullData.exif ? fullData.exif.focal_length ? fullData.exif.focal_length:'':'',
                            iso: fullData.exif ? fullData.exif.iso ? fullData.exif.iso:'':'',
                        },
                        views: fullData.views,
                        downloads: fullData.downloads,
                    };
                    if (data.preview_photos.length === 0) {
                        return { 
                            ...data,
                            preview: filterFullData.urls.regular,
                            preview_photos: [ filterFullData ],
                            img: {
                                description: filterFullData.description,
                                urls: filterFullData.urls
                            }
                        };
                    } else if (data.preview_photos.length === 1) {
                        if (data.preview === filterFullData.urls.regular) {
                            return { 
                                ...data,
                                preview: '',
                                preview_photos: [],
                            };
                        } return {
                            ...data,
                            preview: filterFullData.urls.regular,
                            preview_photos: [ filterFullData, ...data.preview_photos ]
                        };
                    } else if (data.preview_photos.length > 1) {
                        if (data.preview === filterFullData.urls.regular) {
                            return {
                                ...data,
                                preview_photos: data.preview_photos.filter(
                                filterData => filterData.urls.regular !== filterFullData.urls.regular),
                                preview: data.preview_photos[1].urls.regular,
                            };
                        }
                        const isDuplicate = data.preview_photos.find(isData => isData.id === filterFullData.id);
                        if (isDuplicate) {
                            return {
                                ...data,
                                preview_photos: data.preview_photos.filter(filterData => filterData.urls.regular !== filterFullData.urls.regular),
                            };
                        } return { 
                            ...data,
                            preview: filterFullData.urls.regular,
                            img: {
                                description: filterFullData.description,
                                urls: filterFullData.urls
                            },
                            preview_photos: [ filterFullData, ...data.preview_photos ]
                        };
                    }
                }
            } return data;
        });
        localStorage.setItem("collectionData-db", JSON.stringify(add));
        dispatch({ type: getDBUserCollectionsData_type, payload: add });
        // save to db
        return await Server.post("/data-collection", add);
    }

    // little trick to edit(just to prevent writing another function)
    if (typeof(thisData) === 'boolean' && thisData === true) {
        const edit = getState().DBUserCollectionsData.map(data => {
            if (data.id === img.id) {
                return { ...data, name };
            } return data;
        });

        localStorage.setItem("collectionData-db", JSON.stringify(edit));
        dispatch({ type: getDBUserCollectionsData_type, payload: edit });
        // save to db
        return await Server.post("/data-collection", edit);
    }

    // if name is an object trick this to delete(just to prevent writing another function)
    if (typeof(name) === 'object') {
        const removed = getState().DBUserCollectionsData.filter(data => data.id !== name.id);
        localStorage.setItem("collectionData-db", JSON.stringify(removed));
        dispatch({ type: getUserCollectionsData_type, payload: removed });
        // save to db
        await Server.post("/data-collection", removed);
        return window.location.href = '/home/collections';
    }

    if (name.length === 0) return null;
    let filterImg = {
        id: img.id,
        created_at: img.created_at,
        width: img.width,
        height: img.height,
        description: img.description,
        alt_description: img.alt_description ? img.alt_description:'',
        urls: {
            full: img.urls.full,
            regular: img.urls.regular,
            small: img.urls.small,
        },
        likes: img.likes,
        user: {
            id: img.user.id,
            username: img.user.username,
            name: img.user.name,
            first_name: img.user.first_name,
            last_name: img.user.last_name,
            twitter_username: img.user.twitter_username,
            instagram_username: img.user.instagram_username,
            portfolio_url: img.user.portfolio_url,
            location: img.user.location,
            bio: img.user.bio,
            total_photos: img.user.total_photos,
            total_likes: img.user.total_likes,
            total_collections: img.user.total_collections,
            profile_image: img.user.profile_image,
            accepted_tos: img.user.accepted_tos,
        },
        exif: {
            make: img.exif ? img.exif.make ? img.exif.make:'':'',
            model: img.exif ? img.exif.model ? img.exif.model:'':'',
            exposure_time: img.exif ? img.exif.exposure_time ? img.exif.exposure_time:'':'',
            aperture: img.exif ? img.exif.aperture ? img.exif.aperture:'':'',
            focal_length: img.exif ? img.exif.focal_length ? img.exif.focal_length:'':'',
            iso: img.exif ? img.exif.iso ? img.exif.iso:'':'',
        },
        views: img.views,
        downloads: img.downloads,
    };
    const data = [ 
        {
            id: uuid().substr(0, 7),
            name,
            preview: filterImg.urls.regular,
            preview_photos: [ filterImg ],
            description,
            img: {
                description: filterImg.description,
                urls: filterImg.urls
            },
            ib: uuid()
        },
        ...getState().DBUserCollectionsData
    ];

    const isDuplicate = [...getState().DBUserCollectionsData].map(image => {
        if (image.name === name) return false;
        return true;
    });
    const isTrue = isDuplicate.every(isTrue => isTrue === true);
    const isUnique = isTrue ? data : [...getState().DBUserCollectionsData];

    localStorage.setItem("collectionData-db", JSON.stringify(isUnique));
    dispatch({ type: getDBUserCollectionsData_type, payload: isUnique });
    // save to db
    await Server.post("/data-collection", isUnique);
};

// following unsplash users, db user after the app render
export const handleDidMountFollowingData = followingData => dispatch => {
    const data = followingData;
    localStorage.setItem("following-db", JSON.stringify(data));
    return dispatch({ type: getDBUserFollowingData_type, payload: data });
};
// Following: add, remove
export const handleUpdataFollowingDataDB = (image, bool) => async (dispatch, getState) => {
    // based on second arg if it true add following to db
    if (getState().DBLogedIn === true && bool === true) {
        const data = handleUniqueData(getState().DBUserFollowingData, image);
        localStorage.setItem("following-db", JSON.stringify(data));
        dispatch({ type: getDBUserFollowingData_type, payload: data });
        // save to db
        return await Server.post("/data-following", data);
    }
    // based on second arg if it false remove folowing to db
    const removed = getState().DBUserFollowingData.filter(data => data.id !== image.id);
    localStorage.setItem("following-db", JSON.stringify(removed));
    dispatch({ type: getDBUserFollowingData_type, payload: removed });
    return await Server.post("/data-following", removed);
};





/*
 * Login as guest with localstorage
*/
export const handleLocalStorageloginStatus = booleanValue => dispatch => {
    // login with localstorage
    if (booleanValue === false) {
        dispatch({ type: getLocalStorageLoginStatus_type, payload: false });
        return window.location.href = "/";
    }
    localStorage.setItem("f11cce98b5b5", JSON.stringify(booleanValue) );
    dispatch({ type: getLocalStorageLoginStatus_type, payload: booleanValue });
};

// user account data(memorise it in localStorage)
export const handleUpdateUserData = data => dispatch => {
    localStorage.setItem("data", JSON.stringify(data));
    dispatch({ type: getUserData_type, payload: data });
};

// shareData 
export const handleUpdateShareData = (formValues, imageData, id, description, likes) => (dispatch, getState) => {
    let d = new Date(), hours = d.getHours(), minutes = d.getMinutes();
    var dd = d.getDate();
    var mm = d.getMonth()+1; //January is 1!
    var yyyy = d.getFullYear();

    if (dd<10) dd = '0'+dd
    if (mm<10) mm = '0'+mm
    if (hours < 10) { hours = '0' + hours}
    if (minutes < 10) { minutes = '0' + minutes}

    const day = mm + '-' + dd + '-' + yyyy;
    const time = `${hours}:${minutes} H/MN`;

    // image is null(add 2 more argument(5 argument)), share data without image
    if ((typeof(formValues) === "string" || formValues === null) && imageData === null && id.length !== 0) {
        const data = {
            myDescription: formValues,
            imageData, // null
            id,
            description,
            likes,
            time,
            day,
        };
        const moreData = [ ...getState().SharedData, data ];
        localStorage.setItem("shareData", JSON.stringify(moreData));
        return dispatch({ type: getUserSharedData_type, payload: moreData });
    }
    // share image data, only two argument(description typeof is string, img typeof is object)
    else if ((typeof(formValues) === "string" || typeof(formValues) === 'undefined') && typeof(imageData) === 'object') {
        let filterImageData;
        if (imageData.user) {
            filterImageData = {
                id: imageData.id,
                description: imageData.description,
                urls: {
                    full: imageData.urls.full,
                    regular: imageData.urls.regular,
                    small: imageData.urls.small,
                },
                likes: imageData.likes,
                user: {
                    id: imageData.user.id,
                    username: imageData.user.username,
                    name: imageData.user.name,
                    first_name: imageData.user.first_name,
                    last_name: imageData.user.last_name,
                    twitter_username: imageData.user.twitter_username,
                    instagram_username: imageData.user.instagram_username,
                    portfolio_url: imageData.user.portfolio_url,
                    location: imageData.user.location,
                    bio: imageData.user.bio,
                    total_photos: imageData.user.total_photos,
                    total_likes: imageData.user.total_likes,
                    total_collections: imageData.user.total_collections,
                    profile_image: imageData.user.profile_image,
                    accepted_tos: imageData.user.accepted_tos,
                }
            };
        } else {
            filterImageData = {
                id: imageData.id,
                description: imageData.description,
                dataURL: imageData.dataURL,
                file: imageData.file,
                likes: imageData.likes
            };
        }
        const data = { myDescription: formValues, ...filterImageData, time, day };
        const uniqueData = handleUniqueData(getState().SharedData, data);

        localStorage.setItem("shareData", JSON.stringify(uniqueData));
        return dispatch({ type: getUserSharedData_type, payload: uniqueData });
    }
    // edit shared image data, only two argument(description typeof is string, id typeof is string)
    else if (typeof(formValues) === "string" && typeof(imageData) === 'string') {
        const _id = imageData, myDescription = formValues;
        if (_id.length === 0) return null;
    
        const edited = getState().SharedData.map(data => {
            if (myDescription === data.description) {
                return { ...data, myDescription: null }
            } else {
                if (data.id === _id) {
                    return { ...data, myDescription }
                } return data
            }
        });
        
        localStorage.setItem("shareData", JSON.stringify(edited) );
        return dispatch({ type: getUserSharedData_type, payload: edited });
    }
    // remove shared data, only one argument(id typeof string)
    const _id = formValues;
    if (_id.length === 0) return null;
    const removed = getState().SharedData.filter(data => data.id !== _id);
    
    localStorage.setItem("shareData", JSON.stringify(removed));
    dispatch({ type: getUserSharedData_type, payload: removed });
};

// add liked images
export const handleUpdateLikesData = imageData => async (dispatch, getState) => {
    // remove this image from my data
    if (typeof(imageData) === 'string') {
        const id = imageData;
        if (id.length === 0) return null;
        const removed = getState().LikesData.filter(data => data.id !== id);
        localStorage.setItem("LikesData", JSON.stringify(removed));
        return dispatch({ type: getUserLikesData_type, payload: removed });
    }
    // typeof(imageData) === 'object' add new image
    let filterImageData = {
        id: imageData.id,
        created_at: imageData.created_at,
        width: imageData.width,
        height: imageData.height,
        description: imageData.description,
        alt_description: imageData.alt_description ? imageData.alt_description:'',
        urls: {
            full: imageData.urls.full,
            regular: imageData.urls.regular,
            small: imageData.urls.small,
        },
        likes: imageData.likes,
        user: {
            id: imageData.user.id,
            username: imageData.user.username,
            name: imageData.user.name,
            first_name: imageData.user.first_name,
            last_name: imageData.user.last_name,
            twitter_username: imageData.user.twitter_username,
            instagram_username: imageData.user.instagram_username,
            portfolio_url: imageData.user.portfolio_url,
            location: imageData.user.location,
            bio: imageData.user.bio,
            total_photos: imageData.user.total_photos,
            total_likes: imageData.user.total_likes,
            total_collections: imageData.user.total_collections,
            profile_image: imageData.user.profile_image,
            accepted_tos: imageData.user.accepted_tos,
        },
        exif: {
            make: imageData.exif ? imageData.exif.make ? imageData.exif.make:'':'',
            model: imageData.exif ? imageData.exif.model ? imageData.exif.model:'':'',
            exposure_time: imageData.exif ? imageData.exif.exposure_time ? imageData.exif.exposure_time:'':'',
            aperture: imageData.exif ? imageData.exif.aperture ? imageData.exif.aperture:'':'',
            focal_length: imageData.exif ? imageData.exif.focal_length ? imageData.exif.focal_length:'':'',
            iso: imageData.exif ? imageData.exif.iso ? imageData.exif.iso:'':'',
        },
        views: imageData.views,
        downloads: imageData.downloads,
    };
    const data = handleUniqueData(getState().LikesData, filterImageData);
    localStorage.setItem("LikesData", JSON.stringify(data));    
    dispatch({ type: getUserLikesData_type, payload: data });
};

// Collection: add, update, remove
export const handleUpdateCollectionsData = (name, description, img, thisData, fullData) => (dispatch, getState) => {
    //or (name, true, imgsrc, thisData, fulldata)
    if (description === true && typeof(img) === 'string') {
        // img === src img
        const removed = getState().CollectionsData.map(data => {
            if (data.name === name) {
                if (fullData.id === data.id) {
                    if (data.preview_photos.length === 1) {
                        return { ...data, preview: '', preview_photos: [] };
                    } else if (data.preview_photos.length > 1) {
                        return { ...data, preview: thisData.preview_photos[0].preview };
                    }
                } else {
                    if (data.preview_photos.length === 1) {
                        return { ...data, preview: fullData.urls.regular, preview_photos: [ fullData, data.img ] };
                    } else if (data.preview_photos.length > 1) {
                        return { ...data, preview: thisData.preview_photos[0].preview };
                    }
                } return data;
            } return data;
        });
        localStorage.setItem("CollectionData", JSON.stringify(removed));
        return dispatch({ type: getUserCollectionsData_type, payload: removed });
    } else if (description === false && typeof(img) === 'string') {
        // img === src img(string),
        const add = getState().CollectionsData.map(data => {
            if (data.name === name) {
                if (fullData.id === data.id) {
                    if (data.preview_photos.length === 0) {
                        return {
                            ...data,
                            preview: img,
                            preview_photos: [ data.img ]
                        };
                    } else {
                        if (data.preview_photos.length > 1) {
                            const find = data.preview_photos.find(findData => findData.id === fullData.id);
                            if (find) {
                                const findIndex = data.preview_photos.findIndex(findData => findData.id === fullData.id);
                                if (find && findIndex === 0) {
                                    return {
                                        ...data, 
                                        preview_photos: data.preview_photos.filter(
                                            filterData => filterData.urls.regular !== data.img.urls.regular),
                                        preview: data.preview_photos[1].urls.regular,
                                        img: {
                                            description: data.preview_photos[1].description,
                                            urls: data.preview_photos[1].urls
                                        }
                                    };
                                } return { 
                                    ...data,
                                    preview_photos: data.preview_photos.filter(
                                        filterData => filterData.urls.regular !== data.img.urls.regular),
                                    preview: data.preview_photos[0].urls.regular,
                                    img: {
                                        description: data.preview_photos[0].description,
                                        urls: data.preview_photos[0].urls
                                    }
                                };
                            } return { 
                                ...data, 
                                preview_photos: data.preview_photos.filter(
                                    filterData => filterData.urls.regular !== data.img.urls.regular),
                                preview: data.preview_photos[1].urls.regular,
                                img: {
                                    description: data.preview_photos[1].description,
                                    urls: data.preview_photos[1].urls
                                }
                            };
                        } return { 
                            ...data, 
                            preview: '', 
                            preview_photos: [],
                        };
                    }
                } else {
                    let filterFullData = {
                        id: fullData.id,
                        created_at: fullData.created_at,
                        width: fullData.width,
                        height: fullData.height,
                        description: fullData.description,
                        alt_description: fullData.alt_description ? fullData.alt_description:'',
                        urls: {
                            full: fullData.urls.full,
                            regular: fullData.urls.regular,
                            small: fullData.urls.small,
                        },
                        likes: fullData.likes,
                        user: {
                            id: fullData.user.id,
                            username: fullData.user.username,
                            name: fullData.user.name,
                            first_name: fullData.user.first_name,
                            last_name: fullData.user.last_name,
                            twitter_username: fullData.user.twitter_username,
                            instagram_username: fullData.user.instagram_username,
                            portfolio_url: fullData.user.portfolio_url,
                            location: fullData.user.location,
                            bio: fullData.user.bio,
                            total_photos: fullData.user.total_photos,
                            total_likes: fullData.user.total_likes,
                            total_collections: fullData.user.total_collections,
                            profile_image: fullData.user.profile_image,
                            accepted_tos: fullData.user.accepted_tos,
                        },
                        exif: {
                            make: fullData.exif ? fullData.exif.make ? fullData.exif.make:'':'',
                            model: fullData.exif ? fullData.exif.model ? fullData.exif.model:'':'',
                            exposure_time: fullData.exif ? fullData.exif.exposure_time ? fullData.exif.exposure_time:'':'',
                            aperture: fullData.exif ? fullData.exif.aperture ? fullData.exif.aperture:'':'',
                            focal_length: fullData.exif ? fullData.exif.focal_length ? fullData.exif.focal_length:'':'',
                            iso: fullData.exif ? fullData.exif.iso ? fullData.exif.iso:'':'',
                        },
                        views: fullData.views,
                        downloads: fullData.downloads,
                    };
                    if (data.preview_photos.length === 0) {
                        return { 
                            ...data,
                            preview: filterFullData.urls.regular,
                            preview_photos: [ filterFullData ],
                            img: {
                                description: filterFullData.description,
                                urls: filterFullData.urls
                            }
                        };
                    } else if (data.preview_photos.length === 1) {
                        if (data.preview === filterFullData.urls.regular) {
                            return { 
                                ...data,
                                preview: '',
                                preview_photos: [],
                            };
                        } return {
                            ...data,
                            preview: filterFullData.urls.regular,
                            preview_photos: [ filterFullData, ...data.preview_photos ]
                        };
                    } else if (data.preview_photos.length > 1) {
                        if (data.preview === filterFullData.urls.regular) {
                            return {
                                ...data,
                                preview_photos: data.preview_photos.filter(
                                filterData => filterData.urls.regular !== filterFullData.urls.regular),
                                preview: data.preview_photos[1].urls.regular,
                            };
                        }
                        const isDuplicate = data.preview_photos.find(isData => isData.id === filterFullData.id);
                        if (isDuplicate) {
                            return {
                                ...data,
                                preview_photos: data.preview_photos.filter(filterData => filterData.urls.regular !== filterFullData.urls.regular),
                            };
                        } return { 
                            ...data,
                            preview: filterFullData.urls.regular,
                            img: {
                                description: filterFullData.description,
                                urls: filterFullData.urls
                            },
                            preview_photos: [ filterFullData, ...data.preview_photos ]
                        };
                    }
                }
            } return data;
        });
        localStorage.setItem("CollectionData", JSON.stringify(add));
        return dispatch({ type: getUserCollectionsData_type, payload: add });
    }

    // little trick to edit(just to prevent writing another function)
    if (typeof(thisData) === 'boolean' && thisData === true) {
        const edit = getState().CollectionsData.map(data => {
            if (data.id === img.id) {
                return { ...data, name }
            } return data;
        });

        localStorage.setItem("CollectionData", JSON.stringify(edit));
        return dispatch({ type: getUserCollectionsData_type, payload: edit });
    }

    // name is an object trick this to delete(just to prevent writing another function)
    if (typeof(name) === 'object') {
        const removed = getState().CollectionsData.filter(data => data.id !== name.id);
        localStorage.setItem("CollectionData", JSON.stringify(removed));
        dispatch({ type: getUserCollectionsData_type, payload: removed });
        return window.location.href = '/home/collections';
    }

    if (name.length === 0) return null;
    let filterImg = {
        id: img.id,
        created_at: img.created_at,
        width: img.width,
        height: img.height,
        description: img.description,
        alt_description: img.alt_description ? img.alt_description:'',
        urls: {
            full: img.urls.full,
            regular: img.urls.regular,
            small: img.urls.small,
        },
        likes: img.likes,
        user: {
            id: img.user.id,
            username: img.user.username,
            name: img.user.name,
            first_name: img.user.first_name,
            last_name: img.user.last_name,
            twitter_username: img.user.twitter_username,
            instagram_username: img.user.instagram_username,
            portfolio_url: img.user.portfolio_url,
            location: img.user.location,
            bio: img.user.bio,
            total_photos: img.user.total_photos,
            total_likes: img.user.total_likes,
            total_collections: img.user.total_collections,
            profile_image: img.user.profile_image,
            accepted_tos: img.user.accepted_tos,
        },
        exif: {
            make: img.exif ? img.exif.make ? img.exif.make:'':'',
            model: img.exif ? img.exif.model ? img.exif.model:'':'',
            exposure_time: img.exif ? img.exif.exposure_time ? img.exif.exposure_time:'':'',
            aperture: img.exif ? img.exif.aperture ? img.exif.aperture:'':'',
            focal_length: img.exif ? img.exif.focal_length ? img.exif.focal_length:'':'',
            iso: img.exif ? img.exif.iso ? img.exif.iso:'':'',
        },
        views: img.views,
        downloads: img.downloads,
    };
    const data = [ 
        {
            id: uuid().substr(0, 7),
            name,
            preview: filterImg.urls.regular, 
            preview_photos: [ filterImg ],
            description,
            img: {
                description: filterImg.description,
                urls: filterImg.urls
            },
            ib: uuid()
        },
        ...getState().CollectionsData
    ];
    const isDuplicate = [...getState().CollectionsData].map(image => {
        if (image.name === name) return false;
        return true;
    });
    const isTrue = isDuplicate.every(isTrue => isTrue === true);
    const isUnique = isTrue ? data:[...getState().CollectionsData];

    localStorage.setItem("CollectionData", JSON.stringify(isUnique));
    dispatch({ type: getUserCollectionsData_type, payload: isUnique });
};

// Following: add, remove
export const handleUpdateFollowingData = (image, bool) => async (dispatch, getState) => {
    if (getState().DBLogedIn === false && bool === true) {// based on localstorage
        // based on second arg if it true add following
        const data = handleUniqueData(getState().FollowingData, image);
        localStorage.setItem("following", JSON.stringify(data));
        return dispatch({ type: getUserFollowingData_type, payload: data });
    }
    // remove based on second arg if it false remove following
    const removed = getState().FollowingData.filter(data => data.id !== image.id);
    localStorage.setItem("following", JSON.stringify(removed) );
    return dispatch({ type: getUserFollowingData_type, payload: removed });
};

const handleUniqueData = (stateData, newData) => {
    const data = [ ...stateData, newData ];
    const isDuplicate = [...stateData].map(state => {
        if (state.id === newData.id) return false;
        return true;
    });
    const isTrue = isDuplicate.every(isTrue => isTrue === true);
    const isUnique = isTrue ? data:[ ...stateData ];
    return isUnique;
};



/*
 *
 * All this methods works with both login methods(database, localStroge)
 * 
*/

export const handleHackerNewsApi = (newsData, isRefresh) => async (dispatch, getState) => {
    // refresh btn
    if (typeof(isRefresh) === 'boolean' && isRefresh === true) {
        while (getState().HackerNews.length >= 10) {
            getState().HackerNews.shift();
        }
        const results = { ...newsData };
        getState().HackerNews.shift();
        const data = [...getState().HackerNews].concat(results);

        localStorage.setItem("news", JSON.stringify(data) );
        return dispatch({ type: getHackerNewsApi_type, payload: data });
    }
    // more news btn
    else if (typeof(isRefresh) === 'boolean' && isRefresh === false) {
        const results = { ...newsData };
        const data = [...getState().HackerNews].concat(results);

        // no localStorage here
        return dispatch({ type: getHackerNewsApi_type, payload: data });
    }
    const results = { ...newsData };
    const data = [...getState().HackerNews].concat(results);

    localStorage.setItem("news", JSON.stringify(data) );    
    return dispatch({ type: getHackerNewsApi_type, payload: data });
};

// NewPost(post anything)
export const handleNewPost = (id, post, isRandom) => async (dispatch, getState) => {
    let d = new Date(), hours = d.getHours(), minutes = d.getMinutes();
    var dd = d.getDate();
    var mm = d.getMonth(); //January is 0!
    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December', 
    ];

    if (hours < 10) { hours = '0' + hours }
    if (minutes < 10) { minutes = '0' + minutes }

    const getHoursAndMinutes = `${hours}:${minutes}`;
    const time = `${months[mm]} ${dd} at ${getHoursAndMinutes}`;

    if (post.length === 0) return null;
    else if (id && typeof(post) === 'boolean' && post === true) {
        // remove post
        const data = getState().NewPost.filter(data => data.id !== id);
        return dispatch({ type: getNewPost_type, payload: data });
    } else if (id && post.length !== 0 && typeof(isRandom) === 'string' && isRandom === 'edit') {
        // edit post
        const data = getState().NewPost.map(data => {
            if (data.userPost === post) {
                return alert('Attention, you need to change your description don\'t leave it the same!');
            }
            else if (data.id === id) {
                return {
                    ...data,
                    userPost: post,
                    data: [
                        {
                            ...data.data[0],
                            description: post
                        }
                    ]
                };
            } return data;
        });
        return dispatch({ type: getNewPost_type, payload: data });
    } else if (isRandom instanceof Array && isRandom.every(data => data.hasOwnProperty("dataURL")) ) {
        // check if image uploaded
        const data = [
            {
                userPost: post,
                isRandom: "isUpload",
                id,
                data: isRandom.map(data => {
                    if (data.hasOwnProperty("dataURL")) {
                        return {
                            ...data,
                            id,
                            urls: { regular: data.dataURL },
                            description: post,
                            likes: 0
                        };
                    } return data;
                }),
                time,
            },
            ...getState().NewPost
        ];
        return dispatch({ type: getNewPost_type, payload: data });
    } else if (typeof(isRandom) === 'object') {
        // add your selected photo based on typeOf(object)
        const data = [
            {
                userPost: post,
                isRandom: 'selected photo',
                id,
                data: isRandom.map(data => {
                    if (data.description || !data.description) {
                        return { ...data, id, description: post, likes: 0 }
                    } return data;
                }),
                time
            },
            ...getState().NewPost
        ];  
        return dispatch({ type: getNewPost_type, payload: data });
    } else if (isRandom) {
        // random image is true
        const response = await unsplash.get('/photos/random', {
            params: { count: 1 }
        });
        const data = [
            {
                userPost: post,
                isRandom,
                id,
                data: response.data.map(data => {
                    if (data.description || !data.description) {
                        return { ...data, id, description: post, likes: 0 }
                    } return data;
                }),
                time,
            },
            ...getState().NewPost
        ];
        return dispatch({ type: getNewPost_type, payload: data });
    } else if (typeof(post) === 'number' && post === 0) {
        const disLike = getState().NewPost.map(post => {
            if (post.id === id) {
                return { ...post, likes: 0 }
            } return post;
        });
        return dispatch({ type: getNewPost_type, payload: disLike });
    } else if (typeof(post) === 'number' && post === 1) {
        const like = getState().NewPost.map(post => {
            if (post.id === id) {
                return { ...post, likes: 1 }
            } return post;
        });
        return dispatch({ type: getNewPost_type, payload: like });
    }
    // new post with no image
    const data = [
        { userPost: post, isRandom, id, data: [], likes: 0, time },
        ...getState().NewPost
    ];
    return dispatch({ type: getNewPost_type, payload: data });
};

// NewPost(ability to search)
export const handleNewPostSearchPhotos = (term, i) => async dispatch => {
    if (typeof(i) === 'object' && term.length === 0) {
        return dispatch({ type: unsplash_getPostSearchPhotos_type, payload: i });
    }
    const response = await unsplash.get('/search/photos', {
        params: { query: term, per_page: i }
    });
    dispatch({ type: unsplash_getPostSearchPhotos_type, payload: response.data.results });
};

// NewPost(ability to upload)
export const handleNewPostUploadPhotos = imageList => async dispatch => {
    if (imageList.length === 0) {
        return dispatch({ type: getNewPost_UploadPhotos_type, payload: [] });
    } else if (imageList.length === 1) {
        return dispatch({ type: getNewPost_UploadPhotos_type, payload: imageList });
    }
    dispatch({ type: getNewPost_UploadPhotos_type, payload: imageList });
};

// Unsplash search photos
export const fetchUnsplashSearchedPhotos = (term, i) => async (dispatch, getState) => {
    if (typeof(term) === "boolean" && term === true) {
        return dispatch({ type: unsplash_getSearchedPhotos_type, payload: [] });
    } else {
        const response = await unsplash.get('/search/photos', {
            params: { query: term, page: i }
        });
        const data = [...getState().UnsplashSearchedPhotos].concat(response.data.results);
        return dispatch({ type: unsplash_getSearchedPhotos_type, payload: data });
    }
};

// Check wether the search is on
export const handleIsSearchUnsplashPhotos = bool => dispatch => {
    dispatch({ type: getSearchedPhotosBool_type, payload: bool });
};

export const handleSendMessage = (id, message) => async (dispatch, getState) => {
    if (message.length === 0) return;
    let d = new Date(), hours = d.getHours(), minutes = d.getMinutes();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 1!
    var yyyy = today.getFullYear();

    if (dd<10) dd = '0'+dd
    if (mm<10) mm = '0'+mm

    const day = mm + '-' + dd + '-' + yyyy;
    const time = `${hours}:${minutes}`;

    const data = [ ...getState().UserMessage, { userMessage: message, id, day, time } ];
    return dispatch({ type: getUserMessage_type, payload: data });
};

export const fetchUnsplashRandomPhotos = (id, hide) => async (dispatch, getState) => {
    if (id && typeof(hide) === 'boolean' && hide === true) {
        const data = getState().UnsplashRandomPhotos.filter(data => data.id !== id);
        return  dispatch({ type: unsplash_getRandomPhotos_type, payload: data });
    } else if (id === 5) {
        const response = await unsplash.get('/photos/random', {
            params: { count: id }
        });
        const PhotosData = [...getState().UnsplashRandomPhotos].concat(response.data.map(data => {
            const duplicates = getState().UnsplashRandomPhotos.find(duplicateData => duplicateData.id === data.id)
            if (duplicates) {
                return false;
            } return data;
        }));
        return dispatch({ type: unsplash_getRandomPhotos_type, payload: PhotosData });
    }

    const response = await unsplash.get('/photos/random', {
        params: { count: 15 }
    });
    const PhotosData = [...getState().UnsplashRandomPhotos].concat(response.data.map(data => {
        const duplicates = getState().UnsplashRandomPhotos.find(duplicateData => duplicateData.id === data.id)
        if (duplicates) {
            return false;
        } return data;
    }));
    dispatch({ type: unsplash_getRandomPhotos_type, payload: PhotosData });
};

export const fetchUnsplashUser = username => async dispatch => {
    const response = await unsplash.get(`/users/${username}`).catch(e => {
        if (e.message.includes('404') || e.name === 'Error') {
            dispatch({ type: unsplash_getUser_type, payload: [ e.name ] });
            return '';
        }
    });
    let data = {
        id: response.data.id,
        username: response.data.username,
        name: response.data.name,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        twitter_username: response.data.twitter_username,
        instagram_username: response.data.instagram_username,
        portfolio_url: response.data.portfolio_url,
        location: response.data.location,
        bio: response.data.bio,
        total_photos: response.data.total_photos,
        total_likes: response.data.total_likes,
        total_collections: response.data.total_collections,
        profile_image: response.data.profile_image,
        accepted_tos: response.data.accepted_tos,
    };
    dispatch({ type: unsplash_getUser_type, payload: data });
};

export const handleUpdateUnsplashUser = user => dispatch => {
    let data = {
        id: user.id,
        username: user.username,
        name: user.name,
        first_name: user.first_name,
        last_name: user.last_name,
        twitter_username: user.twitter_username,
        instagram_username: user.instagram_username,
        portfolio_url: user.portfolio_url,
        location: user.location,
        bio: user.bio,
        total_photos: user.total_photos,
        total_likes: user.total_likes,
        total_collections: user.total_collections,
        profile_image: user.profile_image,
        accepted_tos: user.accepted_tos,
    };
    dispatch({ type: unsplash_getUser_type, payload: data });
};

/* fetch Unsplash User Photos */
export const fetchUnsplashUserPhotos = (username, i) => async (dispatch, getState) => {
    if (typeof(username) === 'boolean' && username === true) {
        return dispatch({ type: unsplash_getUserPhotos_type, payload: [] });
    } else if (typeof(username) === 'string' && i === false) {
        const response = await unsplash.get(`/users/${username}/photos`,
        { params: { page: 1, per_page: 9 } });
        return dispatch({ type: unsplash_getUserPhotos_type, payload: response.data });
    }

    const response = await unsplash.get(`/users/${username}/photos`,
    {
        params: { page: i, per_page: 9 }
    });
    const data = [...getState().UnsplashUserPhotos].concat(response.data);
    dispatch({ type: unsplash_getUserPhotos_type, payload: data });
};

/* fetch Unsplash User Likes */
export const fetchUnsplashUserLikes = (username, i) => async (dispatch, getState) => {
    if (typeof(username) === 'boolean' && username === true) {
        return dispatch({ type: unsplash_getUserLikes_type, payload: [] });
    }

    const response = await unsplash.get(`/users/${username}/likes`,
    { params: { page: i, per_page: 9 } });
    const data = [...getState().UnsplashUserLikes].concat(response.data)
    dispatch({ type: unsplash_getUserLikes_type, payload: data });
};

/* fetch Unsplash User Collections */
export const fetchUnsplashUserCollections = (username, i) => async (dispatch, getState) => {
    if (typeof(username) === 'boolean' && username === true) {
        return dispatch({ type: unsplash_getUserCollections_type, payload: [] });
    }

    const response = await unsplash.get(`/users/${username}/collections`,
    { params: { page: i, per_page: 9 } });
    const data = [...getState().UnsplashUserCollections].concat(response.data)
    dispatch({ type: unsplash_getUserCollections_type, payload: data });
};

/* fetch Unsplash User Collections Photos
 *
 * Note:
 *   fetchUnsplashUserCollectionPhotos contains two functions(also meaning two action type)
 *     first: fetching from Unsplash user collection photos
 *     second: fetching from Unsplash the user with the collection id
*/
export const fetchUnsplashUserCollectionPhotos = (id, i) => async (dispatch, getState) => {
    if (typeof(id) === 'boolean' && id === true) {
        dispatch({ type: unsplash_getUserCollectionPhotos_type, payload: [] });
        return dispatch({ type: getUserCollectionPhotos_type, payload: [] });
    }

    const response = await unsplash.get(`/collections/${id}/photos`,
    {
        params: { page: i, per_page: 9 }
    }).catch(e => {
        if (e.message.includes('404') || e.name === 'Error') {
            dispatch({ type: unsplash_getUserCollectionPhotos_type, payload: [ e.name ] });
            return '';
        }
    });
    const data = [...getState().UnsplashCollectionPhotos].concat(response.data);
    dispatch({ type: unsplash_getUserCollectionPhotos_type, payload: data });
    const response_id = await unsplash.get(`/collections/${id}`);
    dispatch({ type: getUserCollectionPhotos_type, payload: response_id.data });
    return response_id.data;
};

export const handleClearCollectionPhotos = () => async dispatch => {
    dispatch({ type: getUserCollectionPhotos_type, payload: {} });
};

export const handleCollectionPhotosPreview = preview => async dispatch => {
    dispatch({ type: getCollectionPhotosPreview_type, payload: preview });
};

export const handleComment = (name, id, isEdit) => (dispatch, getState) => {
    if (name.length === 0) return null;
    // add like
    if (typeof(name) === 'boolean') {
        const isLike = getState().Comments.map(c => {
            if (`${c.comment}-id-${c.id}` === id) {
                return { ...c, like: !c.like }
            } return c;
        });
        return dispatch({ type: getComments_type, payload: isLike });
    } 
    // edit comment
    else if (isEdit && isEdit === 'edit') {
        const edited = getState().Comments.map(c => {
            if (`${c.comment}-id-${c.id}` === id) {
                return { ...c, comment: name };
            } return c;
        });
        return dispatch({ type: getComments_type, payload: edited });
    }
    // remove comment
    else if (name === 'remove') {
        const removed = getState().Comments.filter(c => `${c.comment}-id-${c.id}` !== id);
        return dispatch({  type: getComments_type, payload: removed });
    }
    // add comment
    let d = new Date(), hours = d.getHours(), minutes = d.getMinutes();
    var dd = d.getDate();
    var mm = d.getMonth()+1; //January is 1!
    var yyyy = d.getFullYear();

    if (dd<10) dd = '0'+dd
    if (mm<10) mm = '0'+mm

    if (hours < 10) { hours = '0' + hours}
    if (minutes < 10) { minutes = '0' + minutes}

    const day = mm + '-' + dd + '-' + yyyy;
    const time = `${hours}:${minutes} H/MN`;

    dispatch({
        type: getComments_type, payload: [ ...getState().Comments, 
            { 
                id,
                comment: name,
                like: false,
                time,
                day,
            }
        ]
    });
};
