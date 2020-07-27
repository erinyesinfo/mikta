import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../../Actions';
import "./PostSearchModalContent.css";

/* ThirdParty-Library */
import LazyImage from "../../../../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class PostSearchModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPostPhotos: false,
        };
    };
    handleBack = () => this.setState({ showPostPhotos: false });
    handleGo = () => this.setState({ showPostPhotos: true });
    renderInput = (formValues) => {
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
        }
        return (
            <input className='searchPhotos' id='searchPhotos' {...input}
            autoComplete="off" autoFocus placeholder='Search photos?' />
        );
    };
    onSubmit = (formValues) => {
        const { LogIn } = this.props;
        let { searchPhotos, generateXPhotos } = formValues;
        if (!LogIn) return alert('Attention, you have to be log in in order to create post!')
        if (!searchPhotos) return null;
        if (this.props.PostSearchPhotos.length > 0) {
            this.props.searchPhotos('', []);
        }
        if (searchPhotos.length === 0) return;
        this.props.searchPhotos(searchPhotos, generateXPhotos);
        formValues.searchPhotos = '';
        return this.handleGo();
    };
    render() {
        let inlineStylingLazyImage = { height: '200px', margin: '5px', minWidth: '150px' };
        const SearchPhotos = this.props.PostSearchPhotos.map(img => {
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
                        {/* <img src={img.urls.regular} alt={img.description} /> */}
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
                    {/* <img onClick={() => this.handleSelectPhoto(img)}
                    src={img.urls.regular} alt={img.description} /> */}
                </div>
            );
        });
        return (
            <div className='post-searchPhotos'>
                {this.state.showPostPhotos || (this.state.showPostPhotos && this.props.PostSearchPhotos.length) > 0 ? (
                    this.state.showPostPhotos && this.props.PostSearchPhotos.length === 0 ? (
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
                        {this.props.PostSearchPhotos.length > 0 ?
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
                            <Field name='searchPhotos' component={this.renderInput} />
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

const mapStateToProps = (getState) => {
    const postValues = { checkRandomImage: true, generateXPhotos: 10 };
    return {
        initialValues: postValues,
        initialValuesProfileData: getState.ProfileData,
        LogIn: getState.isLogIn,
        PostSearchPhotos: getState.PostSearchPhotos,
    };
};

export default connect(mapStateToProps, actions)(reduxForm ({
    form: 'newPostForm-Modal', enableReinitialize: true})(PostSearchModalContent));
