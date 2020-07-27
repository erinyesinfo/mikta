import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../../Actions';
import "./index.css";

/* ThirdParty-Library */
import LazyImage from "../../../../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class PostSearchModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = { showPostPhotos: false };
    };
    handleBack = () => this.setState({ showPostPhotos: false });
    handleGo = () => this.setState({ showPostPhotos: true });
    renderInput = formValues => {
        const { input, isTypeNumber, label } = formValues;
        if (isTypeNumber) {
            return (
                <div className='generateXPhotos'>
                    <label htmlFor='generateXPhotos'>{label}</label>
                    <input type='number' className='XPhotos'
                    id='generateXPhotos' {...input}
                        autoComplete="off" min={1} max={20} />
                </div>
            );
        } return (
            <input className='searchPhotos' id='searchPhotos' {...input}
            autoComplete="off" autoFocus placeholder='Search photos?' />
        );
    };
    onSubmit = formValues => {
        const { DBLoginStatus, LocalStorageLoginStatus } = this.props;
        let { searchNewPostPhotos, generateXPhotos } = formValues;
        if (!DBLoginStatus && !LocalStorageLoginStatus) return alert('Attention, you have to be log in in order to create post!')
        if (!searchNewPostPhotos) return null;
        if (this.props.UnsplashNewPostSearchPhotos.length > 0) {
            this.props.handleNewPostSearchPhotos('', []);
        }
        if (searchNewPostPhotos.length === 0) return;
        this.props.handleNewPostSearchPhotos(searchNewPostPhotos, generateXPhotos);
        formValues.searchNewPostPhotos = '';
        return this.handleGo();
    };
    render() {
        let inlineStylingLazyImage = { height: '200px', margin: '5px', minWidth: '150px' };
        const SearchPhotos = this.props.UnsplashNewPostSearchPhotos.map(img => {
            const selectPhoto = this.props.selectPhoto.find(data => data === img);
            // means already selected
            if (selectPhoto) {
                return (
                    <div onClick={() => this.props.handleSelectPhoto(img)}
                    className='searchPhoto-divImage bg-img-selectImage' key={img.id}>
                        <LazyImage ClickImage={null} classImage=''
                            srcImage={img.urls.regular}
                            altImage={img.description}
                            style={inlineStylingLazyImage}
                            imageRef={null}
                        />
                        <span>
                            Selected
                        </span>
                    </div>
                );
            } return (
                <div className='searchPhoto-divImage' key={img.id}>
                    <LazyImage ClickImage={() => this.props.handleSelectPhoto(img)}
                        classImage='' srcImage={img.urls.regular}
                        altImage={img.description}
                        style={inlineStylingLazyImage}
                        imageRef={null}
                    />
                </div>
            );
        });
        return (
            <div className='post-searchPhotos'>
                {this.state.showPostPhotos || (this.state.showPostPhotos && this.props.UnsplashNewPostSearchPhotos.length) > 0 ? (
                    this.state.showPostPhotos && this.props.UnsplashNewPostSearchPhotos.length === 0 ? (
                        <div className='post-searchPhoto-loading'>Loading...</div>
                    ):
                    <div>
                        <div className='post-div_btns'>
                            <button className='post-btnLeft'
                            onClick={this.handleBack} type='button'>
                                <i className="fas fa-arrow-left"></i>
                            </button>
                        </div>
                        <div>
                            <h1 className='post-searchPhotos-h1'>Select your photo</h1>
                        </div>
                        <div className='searchedPhotos'>
                            {SearchPhotos}
                        </div>
                    </div>
                ):(
                    <React.Fragment>
                        {this.props.UnsplashNewPostSearchPhotos.length > 0 ?
                            <div className='post-div_btns'>
                                <button className='post-btnRigth'
                                onClick={this.handleGo} type='button'>
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        :null}
                        <h1 className='post-searchPhotos-h1'>Search photos</h1>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                            className='post-formSearchPhotosStyle'>
                            <Field name='searchNewPostPhotos' component={this.renderInput} />
                            <Field name='generateXPhotos' component={this.renderInput}
                                isTypeNumber={true} label='Generate x photos' />
                                <button hidden type='submit'>Search</button>
                        </form>
                    </React.Fragment>
                )}
            </div>
        );
    };
};

const mapStateToProps = getState => {
    const postValues = { checkRandomImage: true, generateXPhotos: 10 };
    return {
        initialValues: postValues,
        DBLoginStatus: getState.DBLoginStatus,
        LocalStorageLoginStatus: getState.LocalStorageLoginStatus,
        UnsplashNewPostSearchPhotos: getState.UnsplashNewPostSearchPhotos,
    };
};

export default connect(mapStateToProps, actions)(reduxForm ({
    form: 'newPostForm-Modal', enableReinitialize: true})(PostSearchModalContent));
