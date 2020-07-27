import uuid from 'uuid/v4';// uuid generate random id's
import unsplash from '../API/Unsplash';
import Uinames from '../API/Uinames';
import { getHackerNews, getPhotos, getSearchedPhotos, getUploadPhotos, getNewPost, getPostSearchPhotos, getNewMessage, getRandomPhotos, getNames, getUser, getUserPhotos, getUserCollection, getUserCollectionPhotos, getUserCollectionPhotosDetailes, getUserLikes, getComments, getStatus, getStatusUnsplashTerm, getUserData, getUserSharedData, getUserLikesData, getCollection, getFollowing, } from './types';

export const getNews = (newsData, isRefresh) => async (dispatch, getState) => {
    // refresh btn
    if (typeof(isRefresh) === 'boolean' && isRefresh === true) {
        while (getState().HackerNews.length >= 10) {
            getState().HackerNews.shift();
        }
        const results = { ...newsData };
        getState().HackerNews.shift();
        const data = [...getState().HackerNews].concat(results);

        window.localStorage.setItem("news", JSON.stringify(data) );
        return dispatch({ type: getHackerNews, payload: data });
    }
    // more news btn
    else if (typeof(isRefresh) === 'boolean' && isRefresh === false) {
        const results = { ...newsData };
        const data = [...getState().HackerNews].concat(results);

        // no localStorage here
        return dispatch({ type: getHackerNews, payload: data });
    }
    const results = { ...newsData };
    const data = [...getState().HackerNews].concat(results);

    window.localStorage.setItem("news", JSON.stringify(data) );    
    return dispatch({ type: getHackerNews, payload: data });
};

export const fetchPhotos = (term, i) => async (dispatch, getState) => {
    if (typeof(term) === "boolean" && term === true) {
        return dispatch({ type: getPhotos, payload: [] });
    } else {
        // @todo
        const response = await unsplash.get('/search/photos', {
            params: { query: term, page: i }
        });

        if (response.status === 403) {
            const responseStatus = await unsplash.get('/search/photos', {
                params: { query: term, page: i }
            });
            if (responseStatus.status === 403) {
                const responseStatus2 = await unsplash.get('/search/photos', {
                    params: { query: term, page: i }
                });
                const data = [...getState().fetchPhotos].concat(responseStatus2.data.results);
                return dispatch({ type: getPhotos, payload: data });                
            }
            const data = [...getState().fetchPhotos].concat(responseStatus.data.results);
            return dispatch({ type: getPhotos, payload: data });
        }
        const data = [...getState().fetchPhotos].concat(response.data.results);
        return dispatch({ type: getPhotos, payload: data });
    }
};

export const isSearch = (bool) => dispatch => {

    dispatch({ type: getSearchedPhotos, payload: bool });
};

export const newPost = (id, post, isRandom) => async (dispatch, getState) => {
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
        const data = getState().newPost.filter(data => data.id !== id);
        return dispatch({ type: getNewPost, payload: data });
    } else if (id && post.length !== 0 && typeof(isRandom) === 'string' && isRandom === 'edit') {
        // edit post
        const data = getState().newPost.map(data => {
            if (data.userPost === post) {
                return alert('Attention, you need to change your description don\'t leave it the same!');
            }
            else if (data.id === id) {
                return { ...data, userPost: post };
            } return data;
        });
        return dispatch({ type: getNewPost, payload: data });
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
            ...getState().newPost
        ];
        return dispatch({ type: getNewPost, payload: data });
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
            ...getState().newPost
        ];  
        return dispatch({ type: getNewPost, payload: data });
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
            ...getState().newPost
        ];
        return dispatch({ type: getNewPost, payload: data });
    } else if (typeof(post) === 'number' && post === 0) {
        const disLike = getState().newPost.map(post => {
            if (post.id === id) {
                return { ...post, likes: 0 }
            } return post;
        });
        return dispatch({ type: getNewPost, payload: disLike });
    } else if (typeof(post) === 'number' && post === 1) {
        const like = getState().newPost.map(post => {
            if (post.id === id) {
                return { ...post, likes: 1 }
            } return post;
        });
        return dispatch({ type: getNewPost, payload: like });
    }
    // new post with no image
    const data = [
        { userPost: post, isRandom, id, data: [], likes: 0, time },
        ...getState().newPost
    ];
    return dispatch({ type: getNewPost, payload: data });
};

// newPost(ability to search)
export const searchPhotos = (term, i) => async (dispatch, getState) => {
    if (typeof(i) === 'object' && term.length === 0) {
        return dispatch({ type: getPostSearchPhotos, payload: i });
    }
    const response = await unsplash.get('/search/photos', {
        params: { query: term, per_page: i }
    });
    if (response.status === 403) {
        const responseStatus = await unsplash.get('/search/photos', {
            params: { query: term, per_page: i }
        });
        return dispatch({ type: getPostSearchPhotos, payload: responseStatus.data.results });
    }

    dispatch({ type: getPostSearchPhotos, payload: response.data.results });
};

// newPost(ability to upload)
export const uploadPhotos = (imageList) => async (dispatch, getState) => {
    if (imageList.length === 0) {
        return dispatch({ type: getUploadPhotos, payload: [] });
    } else if (imageList.length === 1) {
        return dispatch({ type: getUploadPhotos, payload: imageList });
    }

    dispatch({ type: getUploadPhotos, payload: imageList });
};

export const newMessage = (id, message) => async (dispatch, getState) => {
    if (message.length === 0) return;

    let d = new Date(), hours = d.getHours(), minutes = d.getMinutes();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd<10) dd = '0'+dd
    if (mm<10) mm = '0'+mm

    //if (hours < 10) { hours = '0' + hours}
    //if (minutes < 10) { minutes = '0' + minutes}

    const day = mm + '-' + dd + '-' + yyyy;
    //const time = `${hours}:${minutes} H/MN`;
    const time = `${hours}:${minutes}`;

    const data = [ ...getState().newMessage, { userMessage: message, id, day, time } ]
    return dispatch({ type: getNewMessage, payload: data });
};

export const fetchRandomPhotos = (id, hide) => async (dispatch, getState) => {

    if (id && typeof(hide) === 'boolean' && hide === true) {
        const data = getState().fetchRandomPhotos.filter(data => data.id !== id);
        return  dispatch({ type: getRandomPhotos, payload: data });
    }

    // @todo
    const response = await unsplash.get('/photos/random', {
    params: { count: 10 }
    });
    if (response.status === 403) {
        const responseStatus = await unsplash.get('/photos/random', {
            params: { count: 10 }
        });
        if (responseStatus.status === 403) {
            const responseStatus2 = await unsplash.get('/photos/random', {
                params: { count: 10 }
            });
            const PhotosDataStatus2 = [...getState().fetchRandomPhotos].concat(responseStatus2.data.map(data => {
                const duplicates = getState().fetchRandomPhotos.find(
                    duplicateData => duplicateData.id === data.id
                )
                if (duplicates) {
                    return false;
                } return data;
            }));
            return  dispatch({ type: getRandomPhotos, payload: PhotosDataStatus2 })
        }
        const PhotosDataStatus = [...getState().fetchRandomPhotos].concat(responseStatus.data.map(data => {
            const duplicates = getState().fetchRandomPhotos.find(duplicateData => duplicateData.id === data.id)
            if (duplicates) {
                return false;
            } return data;
        }));
        return  dispatch({ type: getRandomPhotos, payload: PhotosDataStatus })
    } else {
        //const PhotosData = [...getState().fetchRandomPhotos].concat(response.data);
        const PhotosData = [...getState().fetchRandomPhotos].concat(response.data.map(data => {
            const duplicates = getState().fetchRandomPhotos.find(duplicateData => duplicateData.id === data.id)
            if (duplicates) {
                return false;
            } return data;
        }));
        return dispatch({ type: getRandomPhotos, payload: PhotosData });
    }
};

export const fetchNames = () => async (dispatch, getState) => {
    const response = await Uinames.get('/', {
    params: { amount: 10 }
    });

    const data = [...getState().fetchNames].concat(response.data)
    dispatch({ type: getNames, payload: data });
};

export const fetchUser = data => (dispatch) => {
    window.localStorage.setItem("user", JSON.stringify(data) );
    dispatch({ type: getUser, payload: data });
};

/* fetchUserPhotos */

export const fetchUserPhotos = (username, i) => async (dispatch, getState) => {
    if (typeof(username) === 'boolean' && username === true) {
        return dispatch({ type: getUserPhotos, payload: [] });
    }

    const response = await unsplash.get(`/users/${username}/photos`,
    {
        params: { page: i, per_page: 9 }
    });
    if (response.status === 403) {
        const responseStatus = await unsplash.get(`/users/${username}/photos`, {
            params: { page: i, per_page: 9 }
        });
        const data = [...getState().fetchUserPhotos].concat(responseStatus.data)
        return dispatch({ type: getUserPhotos, payload: data });
    }
    const data = [...getState().fetchUserPhotos].concat(response.data)
    dispatch({ type: getUserPhotos, payload: data });
};

/* fetchUserLikes */

export const fetchUserLikes = (username, i) => async (dispatch, getState) => {
    if (typeof(username) === 'boolean' && username === true) {
        return dispatch({ type: getUserLikes, payload: [] });
    }

    const response = await unsplash.get(`/users/${username}/likes`,
    {
        params: { page: i, per_page: 9 }
    });
    if (response.status === 403) {
        const responseStatus = await unsplash.get(`/users/${username}/likes`, {
            params: { page: i, per_page: 9 }
        });
        const data = [...getState().fetchUserLikes].concat(responseStatus.data)
        return dispatch({ type: getUserLikes, payload: data });
    }
    const data = [...getState().fetchUserLikes].concat(response.data)
    dispatch({ type: getUserLikes, payload: data });
};

/* fetchUserCollection */

export const fetchUserCollection = (username, i) => async (dispatch, getState) => {
    if (typeof(username) === 'boolean' && username === true) {
        return dispatch({ type: getUserCollection, payload: [] });
    }

    const response = await unsplash.get(`/users/${username}/collections`,
    {
        params: { page: i, per_page: 9 }
    });
    if (response.status === 403) {
        const responseStatus = await unsplash.get(`/users/${username}/collections`, {
            params: { page: i, per_page: 9 }
        });
        const data = [...getState().fetchUserCollection].concat(responseStatus.data)
        return dispatch({ type: getUserCollection, payload: data });
    }
    const data = [...getState().fetchUserCollection].concat(response.data)
    dispatch({ type: getUserCollection, payload: data });
};

export const fetchUserCollectionPhotos = (id, i) => async (dispatch, getState) => {
    if (typeof(id) === 'boolean' && id === true) {
        window.localStorage.removeItem("collection-photos");
        return dispatch({ type: getUserCollectionPhotos, payload: [] });
    }

    const response = await unsplash.get(`/collections/${id}/photos`,
    {
        params: { page: i, per_page: 9 }
    });
    if (response.status === 403) {
        const responseStatus = await unsplash.get(`/collections/${id}/photos`, {
            params: { page: i, per_page: 9 }
        });
        const data = [...getState().fetchUserCollectionPhotos].concat(responseStatus.data);
        window.localStorage.setItem("collection-photos", JSON.stringify(data));
        return dispatch({ type: getUserCollectionPhotos, payload: data });
    }
    const data = [...getState().fetchUserCollectionPhotos].concat(response.data);
    window.localStorage.setItem("collection-photos", JSON.stringify(data));
    dispatch({ type: getUserCollectionPhotos, payload: data });
};

export const fetchUserCollectionPhotosDetailes = (id, title, name, srcImg, profile_imageLarge, total_photos) => 
    async (dispatch, getState) => {

    if (typeof(id) === 'boolean' && id === true) {
        window.localStorage.removeItem("collection-id-title-user");
        return dispatch({ 
            type: getUserCollectionPhotosDetailes, payload: {}
        });
    }

    const data = { id, title, name, srcImg, profile_imageLarge, total_photos };
    window.localStorage.setItem("collection-id-title-user", JSON.stringify(data));
    return dispatch({ 
        type: getUserCollectionPhotosDetailes, payload: data
    });
};

export const comments = (name, id) => (dispatch, getState) => {
    if (name.length === 0) return
    
    if (typeof(name) === 'boolean') {
        const isLike = getState().Comments.map(comment => {
            if (`${comment.comment}-id-${comment.id}` === id) {
                return { ...comment, like: !comment.like }
            } return comment
        })
    
        dispatch({ type: getComments, payload: isLike });
    }
    let d = new Date(), hours = d.getHours(), minutes = d.getMinutes();
    var dd = d.getDate();
    var mm = d.getMonth()+1; //January is 0!
    var yyyy = d.getFullYear();

    if (dd<10) dd = '0'+dd
    if (mm<10) mm = '0'+mm

    if (hours < 10) { hours = '0' + hours}
    if (minutes < 10) { minutes = '0' + minutes}

    const day = mm + '-' + dd + '-' + yyyy;
    const time = `${hours}:${minutes} H/MN`;

    dispatch({
        type: getComments, payload: [ ...getState().Comments, 
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

export const editComment = (commentValue, id) => (dispatch, getState) => {
    if (commentValue.length === 0) return

    const edited = getState().Comments.map(comment => {
        if (`${comment.comment}-id-${comment.id}` === id) {
            return { ...comment, comment: commentValue }
        } return comment
    })

    dispatch({ type: getComments, payload: edited });

};

export const removeComment = (commentValue) => (dispatch, getState) => {
    if (commentValue.length === 0) return

    const removed = getState().Comments.filter(
        comment => `${comment.comment}-id-${comment.id}` !== commentValue
    )

    dispatch({ 
        type: getComments, payload: removed
    });

};

export const validateData = (data) => (dispatch, getState) => {
    window.localStorage.setItem("data", JSON.stringify(data) );
    dispatch({ type: getUserData, payload: data });
};

export const isLogIn = booleanValue => dispatch => {
    window.localStorage.setItem("isLogIn", JSON.stringify(booleanValue) );
    dispatch({ type: getStatus, payload: booleanValue });
};

export const isUnsplashTerm = booleanValue => dispatch => {
    window.localStorage.setItem("isUnsplashTerm", JSON.stringify(booleanValue) );
    dispatch({ type: getStatusUnsplashTerm, payload: booleanValue });
};

/* shareData */
export const shareData = (formValues, imageData, id, description, likes) => (dispatch, getState) => {
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

    // imageData is null(add 2 more arg)
    if (imageData === null) {
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
        window.localStorage.setItem("shareData", JSON.stringify(moreData) );
        return dispatch({ type: getUserSharedData, payload: moreData });
    }
    
    let filterImageData = {
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
    const data = { myDescription: formValues, ...filterImageData, time, day };
    const moreData = [ ...getState().SharedData, data ];
    
    const isDuplicate = [...getState().SharedData].map(img => {
        if (img.id === filterImageData.id) return false
        return true
    });
    const isTrue = isDuplicate.every(isTrue => isTrue === true);
    //const UniqueData = [...moreData];
    const isUnique = isTrue ? moreData : [...getState().SharedData]
    window.localStorage.setItem("shareData", JSON.stringify(isUnique) );
    
    dispatch({ type: getUserSharedData, payload: isUnique });
};

export const editSharedData = (myDescription, id) => (dispatch, getState) => {
    if (id.length === 0) return

    const edited = getState().SharedData.map(data => {
        if (myDescription === data.description) {
            return { ...data, myDescription: null }
        } else {
            if (data.id === id) {
                return { ...data, myDescription }
            } return data
        }
    });
    
    window.localStorage.setItem("shareData", JSON.stringify(edited) );
    dispatch({ type: getUserSharedData, payload: edited });
};

export const removeSharedData = (id) => (dispatch, getState) => {
    if (id.length === 0) return
    
    const removed = getState().SharedData.filter(data => data.id !== id);
    
    window.localStorage.setItem("shareData", JSON.stringify(removed) );
    dispatch({ type: getUserSharedData, payload: removed });
};

/* likesData */
export const likesData = imageData => (dispatch, getState) => {
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
    const data = [ ...getState().LikesData, filterImageData ];

    const isDuplicate = [...getState().LikesData].map(img => {
        if (img.id === filterImageData.id) return false;
        return true;
    });
    const isTrue = isDuplicate.every(isTrue => isTrue === true);
    const isUnique = isTrue ? data : [...getState().LikesData]
    window.localStorage.setItem("LikesData", JSON.stringify(isUnique) );
    
    dispatch({ type: getUserLikesData, payload: isUnique });
};

export const removeLikesData = (id) => (dispatch, getState) => {
    if (id.length === 0) return null;
    
    const removed = getState().LikesData.filter(data => data.id !== id)
    
    window.localStorage.setItem("LikesData", JSON.stringify(removed) );
    dispatch({ type: getUserLikesData, payload: removed });
};

export const collection = (name, description, img, thisData, fullData) => (dispatch, getState) => {
    //or (name, true, imgsrc, thisData, fulldata)
    
    if (description === true && typeof(img) === 'string') {
        // img === src img
        const removed = getState().Collection.map(data => {
            if (data.name === name) {
                if (fullData.id === data.id) {
                    if (data.preview_photos.length === 1) {
                        return { ...data, preview: '', preview_photos: [] }
                    } else if (data.preview_photos.length > 1) {
                        return { ...data, preview: thisData.preview_photos[0].preview }
                    }
                } else {
                    if (data.preview_photos.length === 1) {
                        return { ...data, preview: fullData.urls.regular, preview_photos: [ fullData, data.img ] }
                    } else if (data.preview_photos.length > 1) {
                        return { ...data, preview: thisData.preview_photos[0].preview }
                    }
                } return data
            } return data
        });
        window.localStorage.setItem("CollectionData", JSON.stringify(removed) );
        return dispatch({ type: getCollection, payload: removed });
    } else if (description === false && typeof(img) === 'string') {
        // img === src img
        const add = getState().Collection.map(data => {
            if (data.name === name) {
                if (fullData.id === data.id) {
                    if (data.preview_photos.length === 0) {
                        return {
                            ...data, 
                            preview: img, 
                            preview_photos: [ data.img ] 
                        }
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
                                        // id: data.preview_photos[1].id,
                                        img: data.preview_photos[1],
                                    }
                                }
                                return { 
                                    ...data, 
                                    preview_photos: data.preview_photos.filter(
                                        filterData => filterData.urls.regular !== data.img.urls.regular),
                                    preview: data.preview_photos[0].urls.regular,
                                    // id: data.preview_photos[0].id,
                                    img: data.preview_photos[0]
                                }
                            }
                            return { 
                                ...data, 
                                preview_photos: data.preview_photos.filter(
                                    filterData => filterData.urls.regular !== data.img.urls.regular),
                                preview: data.preview_photos[1].urls.regular, 
                                //id: data.preview_photos[1].id,
                                img: data.preview_photos[1]
                             }
                        }
                        return { 
                            ...data, 
                            preview: '', 
                            preview_photos: [], 
                            // id: ''
                    }
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
                            img: filterFullData
                        }
                    } else if (data.preview_photos.length === 1) {
                        if (data.preview === filterFullData.urls.regular) {
                            return { 
                                ...data,
                                preview: '',
                                preview_photos: []
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
                                preview: data.preview_photos[1].urls.regular
                            }
                        }
                        const isDuplicate = data.preview_photos.find(isData => isData.id === filterFullData.id);
                        if (isDuplicate) {
                            return { 
                                ...data,
                                preview_photos: data.preview_photos.filter(filterData => filterData.urls.regular !== filterFullData.urls.regular),
                            }
                        } return { 
                            ...data,
                            preview: filterFullData.urls.regular,
                            img: filterFullData,
                            preview_photos: [ filterFullData, ...data.preview_photos ]
                        }
                    }
                }
            }
            return data
        });
        window.localStorage.setItem("CollectionData", JSON.stringify(add) );
        return dispatch({ type: getCollection, payload: add });
    }

    // little trick to edit
    if (typeof(thisData) === 'boolean' && thisData === true) {
        const edit = getState().Collection.map(data => {
            if (data.id === img.id) {
                return { ...data, name }
            } return data;
        });

        window.localStorage.setItem("CollectionData", JSON.stringify(edit) );
        return dispatch({ type: getCollection, payload: edit });
    }

    // name is an object to trick this to delete to prevent writing another function
    if (typeof(name) === 'object') {
        const removed = getState().Collection.filter(data => data.id !== name.id)

        window.localStorage.setItem("CollectionData", JSON.stringify(removed) );
    
        return dispatch({ type: getCollection, payload: removed });
    }

    if (name.length === 0) return null;
    const data = [ 
        {
            id: uuid(),
            name, 
            preview: img.urls.regular, 
            preview_photos: [ img ], 
            description, 
            img 
        },
        ...getState().Collection
    ];

    const isDuplicate = [...getState().Collection].map(image => {
        if (image.name === name) return false
        return true
    });
    const isTrue = isDuplicate.every(isTrue => isTrue === true);
    const isUnique = isTrue ? data : [...getState().Collection]
    window.localStorage.setItem("CollectionData", JSON.stringify(isUnique) );
    
    return dispatch({ type: getCollection, payload: isUnique });
};

export const Following = (image, bool) => (dispatch, getState) => {
    if (bool === true) {
        const data = [ ...getState().isFollowing, image ];
        const isDuplicate = [...getState().isFollowing].map(img => {
            if (img.id === image.id) return false
            return true
        });
        const isTrue = isDuplicate.every(isTrue => isTrue === true);
        const isUnique = isTrue ? data : [...getState().isFollowing]
        window.localStorage.setItem("isFollowing", JSON.stringify(isUnique) );
        
        return dispatch({ type: getFollowing, payload: isUnique });
    }
    // remove based on second arg if it false remove
    const removed = getState().isFollowing.filter(data => data.id !== image.id);

    window.localStorage.setItem("isFollowing", JSON.stringify(removed) );
    return dispatch({ type: getFollowing, payload: removed });
};