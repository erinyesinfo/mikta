import React, { Component } from 'react';
import './Home_Shared.css';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';

/* Edit Modal */
import EditModal from './Modal/EditModal';
/* Edit Modal Content */
import EditModalContent from './Modal/ModalContent/EditModalContent';

/* helper */
import LazyImage from "../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class Home_Shared extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSetting: false,
            isEditModal: false,
            showEditModal: false
        };
        this.sharedImageRef = React.createRef();
        this.node = React.createRef();
    };
    UNSAFE_componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    };
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    };
    handleRef = node => this.node = node;
    handleClick = e => {
        if ( (this.node.contains(e.target)) ) return;
        return this.setState({ showSetting: false })
    };
    handleShowSetting = () => this.setState(st => ({ showSetting: !st.showSetting }) )
    handleRemove = () => {
        const { img } = this.props;
        this.setState({ showSetting: false });
        return this.props.removeSharedData(img.id);
    };
    toggleEditModal = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'hidden';
        this.setState({ isEditModal: true });
    };
    handleShowEditModal = () => this.setState({ showEditModal: true });
    handleCloseEditModal = () => {
        var element = document.querySelector("body");
        element.style.overflow = 'auto';
        this.setState({ showEditModal: false, isEditModal: false });
    };
    renderFormEditModal = () => {
        return <EditModalContent img={this.props.img}
                    handleCloseEditModal={this.handleCloseEditModal}
                />
    };
    renderEditModal = () => {
        return (
            <EditModal handleShowEditModal={this.handleShowEditModal} handleCloseEditModal={this.handleCloseEditModal}
            showEditModal={this.state.showEditModal} isEditModal={this.state.isEditModal}
            renderFormEditModal={this.renderFormEditModal} />
        );
    };
    handleEdit = () => this.setState({ showSetting: false }, this.toggleEditModal);
    handleClickRoute = () => {
        this.props.fetchUser(this.props.img.user);
        const replaceNames = this.props.img.user.name.replace(/[ ]/g, '_');
        this.props.history.push(`/@${replaceNames}`)
    };
    render() {
        const { img } = this.props;
        let emtyObject = {};
        if (!img.user) {
            // share your own data with upload image
            if (img.dataURL) {
                const inlineStylingLazyImage = { width: '100%', height: '300px' };
                const { profileImage, firstName, lastName } = this.props.initialProfileData;
                return (
                    <React.Fragment>
                        <div ref={this.sharedImageRef} className='shared-userProfile-container'>
                            <div className='shared-userProfile'>
                                <div className='shared-user'>
                                    <LazyImage ClickImage={null} srcImage={profileImage} 
                                        altImage={firstName} style={emtyObject} 
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
                                                        {firstName} {lastName}
                                                    </div>
                                                </span>
                                            )}
                                            <span className='shared-setting' ref={this.handleRef}>
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
                                    srcImage={img.urls.regular} 
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
                        {this.state.isEditModal ?
                            this.renderEditModal()
                        :null}
                    </React.Fragment>
                );
            }
            // share your own data without img
            const foundLikedImage = this.props.Post.find(
                data => data.id === this.props.img.id && data.likes === 1
            );
            const { profileImage, firstName, lastName } = this.props.initialProfileData;
            return (
                <React.Fragment>
                    <div className='shared-userProfile-container'>
                        <div className='shared-userProfile'>
                            <div className='shared-user'>
                                <LazyImage ClickImage={null}
                                    srcImage={profileImage} 
                                    altImage={firstName} style={emtyObject} 
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
                                                    {firstName} {lastName}
                                                </div>
                                            </span>
                                        )}
                                    <span className='shared-setting' ref={this.handleRef}>
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
                    {this.state.isEditModal ?
                        this.renderEditModal()
                    :null}
                </React.Fragment>
            );
        }
        const inlineStylingLazyImage = { width: '100%', height: '300px' };
        const { profileImage, firstName, lastName } = this.props.initialProfileData;
        // posted by me
        const imagePosted = this.props.Post.find(
            data => data.id === img.id && data.userPost === img.description
        );
        
        return (
            <React.Fragment>
                <div ref={this.sharedImageRef} className='shared-userProfile-container'>
                    <div className='shared-userProfile'>
                        <div className='shared-user'>
                            <LazyImage ClickImage={null} srcImage={profileImage} 
                                altImage={firstName} style={emtyObject} 
                                classImage='shared-profileImg' imageRef={null} />
                            <div className='shared-user-info'>
                                <div className='shared-user-info-profile'>
                                    {this.state.showSetting ?
                                        <span className='shared-myProfile'>
                                            ...
                                        </span>:imagePosted ? (
                                            <span className='shared-myProfile'>
                                                <div className='shared-myProfileLink'>
                                                    {firstName} {lastName}
                                                </div>
                                            </span>
                                    ):(
                                        <span className='shared-myProfile'>
                                            <div className='shared-myProfileLink'>
                                                {firstName} {lastName}&nbsp;
                                                <span className='opt shared-helper'>shared&nbsp;</span>
                                                <span className='shared-username shared-helper'>
                                                    <div onClick={this.handleClickRoute} className='shared-usernameLink'>
                                                        {img.user.name}
                                                    </div>
                                                </span>
                                            </div>
                                        </span>
                                    )}
                                    <span className='shared-setting' ref={this.handleRef}>
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
                {this.state.isEditModal ?
                    this.renderEditModal()
                :null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    return {
        initialProfileData: getState.ProfileData,
        SharedData: getState.SharedData,
        Post: getState.newPost,
    };
};

export default connect(mapStateToProps, actions)(Home_Shared);
