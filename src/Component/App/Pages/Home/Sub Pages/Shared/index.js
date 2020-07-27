import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import './index.css';

/* Edit Modal */
import EditModal from './Modal';
/* Edit Modal Content */
import EditModalContent from './Modal/Content';

/* helper */
import LazyImage from '../../../../../ThirdParty-Library/Lazy Image/LazyImage';

class Home_Shared extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSetting: false,
            isEditModal: false,
            showEditModal: false
        };
    };
    node = React.createRef();
    node2 = React.createRef();
    UNSAFE_componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    };
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    };
    handleRef = node => this.node = node;
    handleRef2 = node2 => this.node2 = node2;
    handleClick = e => {
        if (this.node2.contains(e.target)) return;
        return this.setState({ showSetting: false })
    };
    handleShowSetting = () => this.setState(st => ({ showSetting: !st.showSetting }) )
    handleRemove = () => {
        const { img } = this.props;
        this.setState({ showSetting: false });
        if (this.props.DBLoginStatus) return this.props.handleUpdateShareDataDB(img.id);
        return this.props.handleUpdateShareData(img.id);
    };
    handleShowEditModal = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'hidden';
        this.setState({ showEditModal: true });
    };
    handleCloseEditModal = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'auto';
        this.setState({ showEditModal: false });
    };
    renderFormEditModal = () => {
        return (
            <EditModalContent img={this.props.img}
                handleCloseEditModal={this.handleCloseEditModal}
            />
        );
    };
    renderEditModal = () => {
        return (
            <EditModal handleCloseEditModal={this.handleCloseEditModal}
            showEditModal={this.state.showEditModal}
            renderFormEditModal={this.renderFormEditModal} />
        );
    };
    handleEdit = () => this.setState({ showSetting: false }, this.handleShowEditModal);
    handleFetchUser = () => this.props.handleUpdateUnsplashUser(this.props.img.user);
    render() {
        let emtyObject = {};
        const { img } = this.props;
        const { firstname, lastname, profileImage } = this.props.UserData;
        if (!img.user) {
            // share your own data with upload image
            if (img.dataURL) {
                const inlineStylingLazyImage = { width: '100%', height: '300px' };
                return (
                    <React.Fragment>
                        <div ref={this.handleRef} className='shared-userProfile-container'>
                            <div className='shared-userProfile'>
                                <div className='shared-user'>
                                    <LazyImage ClickImage={null} srcImage={profileImage} 
                                        altImage={'profileImage'} style={emtyObject} draggable={false}
                                        classImage='shared-profileImg' imageRef={null} />
                                    <div className='shared-user-info'>
                                        <div className='shared-user-info-profile'>
                                            {this.state.showSetting ? (
                                                <span className='shared-myProfile'>
                                                    ...
                                                </span>
                                            ):(
                                                <span className='shared-myProfile'>
                                                    <div className='shared-myProfileLink'>
                                                        {firstname} {lastname}
                                                    </div>
                                                </span>
                                            )}
                                            <span className='shared-setting' ref={this.handleRef2}>
                                                <span className='toggleBtn' onClick={this.handleShowSetting}>...</span>
                                                {this.state.showSetting ? (
                                                    <div className='showSetting'>
                                                        <button onClick={this.handleEdit} type='button' className='editDescrition'>
                                                            <i className="fas fa-edit"></i> Edit
                                                        </button>
                                                        <button onClick={this.handleRemove} className='delete' type='button'>
                                                            <i className="fas fa-trash"></i> Remove
                                                        </button>
                                                    </div>
                                                ): null}
                                            </span>
                                        </div>
                                        <span className={this.state.showSetting ? 'hidden' :'shared-time'}>
                                            {img.time || null} {img.day || null}
                                        </span>
                                    </div>
                                </div>
                                <div className={'shared-lgDescription'}>
                                    {img.myDescription && img.myDescription.length !== 0 ? (
                                        <span>
                                            <span className='edited'>Edited: </span><span>{img.myDescription}</span>
                                        </span>
                                    ): <span>{img.description}</span>}
                                </div>
                                <LazyImage ClickImage={null}
                                    srcImage={img.dataURL} 
                                    altImage={img.file.name}
                                    // inline styling
                                    style={inlineStylingLazyImage} 
                                    classImage='shared-tagImages'
                                    imageRef={null}
                                />
                                <div className='shared-outil'>
                                    <div className='shared-like'>
                                        {this.props.likes ? (
                                            <span className='shared-sLike'>
                                                {img.likes + 1} <i className="fas fa-thumbs-up"></i> Like
                                            </span>
                                        ):(
                                            <span className='shared-sDisLike'>
                                                {img.likes} <i className="far fa-thumbs-up"></i> Like
                                            </span>
                                        )}
                                    </div>
                                    <label className='shared-comment'>
                                        <i className="far fa-comment"></i> Comment
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Modal */}
                        {this.state.showEditModal ?
                            this.renderEditModal()
                        :null}
                    </React.Fragment>
                );
            }
            // share your own data without img(find on NewPost)
            const foundLikedImage = this.props.NewPostData.find(
                data => data.id === this.props.img.id && data.likes === 1
            );
            return (
                <React.Fragment>
                    <div className='shared-userProfile-container'>
                        <div className='shared-userProfile'>
                            <div className='shared-user'>
                                <LazyImage ClickImage={null}
                                    srcImage={profileImage} draggable={false}
                                    altImage={'profileImage'} style={emtyObject} 
                                    classImage='shared-profileImg'
                                    imageRef={null}
                                />
                                <div className='shared-user-info'>
                                    <div className='shared-user-info-profile'>
                                        {this.state.showSetting ? (
                                            <span className='shared-myProfile'>
                                                ...
                                            </span>
                                        ):(
                                            <span className='shared-myProfile'>
                                                <div className='shared-myProfileLink'>
                                                    {firstname} {lastname}
                                                </div>
                                            </span>
                                        )}
                                    <span className='shared-setting' ref={this.handleRef2}>
                                        <span className='toggleBtn' onClick={this.handleShowSetting}>
                                            ...
                                        </span>
                                        {this.state.showSetting ? (
                                            <div className='showSetting'>
                                                <button onClick={this.handleEdit} type='button' className='editDescrition'>
                                                    <i className="fas fa-edit"></i> Edit
                                                </button>
                                                <button onClick={this.handleRemove} className='delete' type='button'>
                                                    <i className="fas fa-trash"></i> Remove
                                                </button>
                                            </div>
                                        ): null}
                                    </span>
                                    </div>
                                    <span className={this.state.showSetting ? 'hidden' :'shared-time'}>
                                        {img.time || null} {img.day || null}
                                    </span>
                                </div>
                            </div>
                            <div className={'shared-lgDescription'}>
                                {img.myDescription && img.myDescription.length !== 0 ? (
                                    <span>
                                        <span className='edited'>Edited: </span>
                                        <span>{img.myDescription}</span>
                                    </span>
                                ): <span>{img.description}</span>}
                            </div>
                            <div className='shared-outil'>
                                <div className='shared-like'>
                                    {foundLikedImage ? (
                                        <span className='shared-sLike'>
                                            {img.likes} <i className="fas fa-thumbs-up"></i> Like
                                        </span>
                                    ):(
                                        <span className='shared-sDisLike'>
                                            {img.likes} <i className="far fa-thumbs-up"></i> Like
                                        </span>
                                    )}
                                </div>
                                <label className='shared-comment'>
                                    <i className="far fa-comment"></i> Comment
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Modal */}
                    {this.state.showEditModal ?
                        this.renderEditModal()
                    :null}
                </React.Fragment>
            );
        }
        const inlineStylingLazyImage = { width: '100%', height: '300px' };
        // posted by me(find on NewPost)
        const imagePosted = this.props.NewPostData.find(
            data => data.id === img.id && data.userPost === img.description
        );
        return (
            <React.Fragment>
                <div ref={this.handleRef} className='shared-userProfile-container'>
                    <div className='shared-userProfile'>
                        <div className='shared-user'>
                            <LazyImage ClickImage={null} srcImage={profileImage} 
                                altImage={'profileImage'} style={emtyObject} draggable={false}
                                classImage='shared-profileImg' imageRef={null} />
                            <div className='shared-user-info'>
                                <div className='shared-user-info-profile'>
                                    {this.state.showSetting ?
                                        <span className='shared-myProfile'>
                                            ...
                                        </span>:imagePosted ? (
                                            <span className='shared-myProfile'>
                                                <div className='shared-myProfileLink'>
                                                    {firstname} {lastname}
                                                </div>
                                            </span>
                                    ):(
                                        <span className='shared-myProfile'>
                                            <div className='shared-myProfileLink'>
                                                {firstname} {lastname}&nbsp;
                                                <span className='opt shared-helper'>shared&nbsp;</span>
                                                <span className='shared-username shared-helper'>
                                                    <Link to={`/@${img.user.username}`} className='shared-usernameLink'
                                                        onClick={this.handleFetchUser}>
                                                        {img.user.name}
                                                    </Link>
                                                </span>
                                            </div>
                                        </span>
                                    )}
                                    <span className='shared-setting' ref={this.handleRef2}>
                                        <span className='toggleBtn' onClick={this.handleShowSetting}>...</span>
                                        {this.state.showSetting ? (
                                            <div className='showSetting'>
                                                <button onClick={this.handleEdit} type='button' className='editDescrition'>
                                                    <i className="fas fa-edit"></i> Edit
                                                </button>
                                                <button onClick={this.handleRemove} className='delete' type='button'>
                                                    <i className="fas fa-trash"></i> Remove
                                                </button>
                                            </div>
                                        ): null}
                                    </span>
                                </div>
                                <span className={this.state.showSetting ? 'hidden' :'shared-time'}>
                                    {img.time || null} {img.day || null}
                                </span>
                            </div>
                        </div>
                        <div className='shared-lgDescription'>
                            {img.myDescription && img.myDescription.length !== 0 ? (
                                <span>
                                    <span className='edited'>Edited: </span><span>{img.myDescription}</span>
                                </span>
                            ): <span>{img.description}</span>}
                        </div>
                        <LazyImage ClickImage={null}
                            srcImage={img.urls.regular} 
                            altImage={img.description}
                            // inline styling
                            style={inlineStylingLazyImage} 
                            classImage='shared-tagImages'
                            imageRef={null}
                        />
                        <div className='shared-outil'>
                            <div className='shared-like'>
                                {this.props.likes ? (
                                    <span className='shared-sLike'>
                                        {img.likes + 1} <i className="fas fa-thumbs-up"></i> Like
                                    </span>
                                ):(
                                    <span className='shared-sDisLike'>
                                        {img.likes} <i className="far fa-thumbs-up"></i> Like
                                    </span>
                                )}
                            </div>
                            <label className='shared-comment'>
                                <i className="far fa-comment"></i> Comment
                            </label>
                        </div>
                    </div>
                </div>
                {/* Modal */}
                {this.state.showEditModal ?
                    this.renderEditModal()
                :null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,//db login
            UserData: getState.DBUserData,//db user data
            SharedData: getState.DBUserSharedData,
            NewPostData: getState.NewPost,
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,
        UserData: getState.UserData,
        SharedData: getState.SharedData,
        NewPostData: getState.NewPost,
    };
};

export default connect(mapStateToProps, actions)(Home_Shared);
