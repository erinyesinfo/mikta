import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../../../Actions';
import './Account.css';

/* Header */
import Header from '../../Header/Header';

/* helper */
import LazyImage from "../../../ThirdParty-Library/Lazy Image/LazyImage";

class Account extends Component {
    state = {
        isChangeImage: false,
        matches992: window.matchMedia("(max-width: 992px)").matches,
    }
    componentDidMount() {
        if (this.props.LogIn === false) {
            return this.props.history.push('/')
        }
        if (this.props.UserPhotos.length > 0) {
            this.props.fetchUserPhotos(true);
        }
        if (this.props.UserLikes.length > 0) {
            this.props.fetchUserLikes(true);
        }
        if (this.props.UserCollection.length > 0) {
            this.props.fetchUserCollection(true);
        }
        if (this.props.fetchCollectionPhotos.length > 0) {
            this.props.fetchUserCollectionPhotosDetailes(true);
            this.props.fetchUserCollectionPhotos(true);
        }
        
        window.addEventListener('resize', this.handler992);
        window.addEventListener('load', this.handler992);
        window.addEventListener('scroll', this.handler992);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handler992);
        window.removeEventListener('load', this.handler992);
        window.removeEventListener('scroll', this.handler992);
    }
    handler992 = () => this.setState({matches992: window.innerWidth < 992});
    handleChangeImage = () => this.setState({ isChangeImage: true });
    handleCancelChangeImage = () => this.setState({ isChangeImage: false });
    imagesExists = (url, callback) => {
        //if (isImage(profileImage) === false) return alert('Attention, profile image is not valid');
        // The "callback" argument is called with either true or false
        // depending on whether the image at "url" exists or not.
        var img = new Image();
        img.onload = function() { callback(true); };
        img.onerror = function() { callback(false); };
        img.src = url;
    }
    renderInput = (formValues) => {
        const { dvclassName, id, label, opt, input, className, placeholder } = formValues;
        if (formValues.isTextarea) {
            return (
                <div className={dvclassName}>
                    <label htmlFor={id}>{label}
                        <span className='optional'> {opt}</span>
                    </label>
                    <textarea {...input} autoComplete="off" className={className} id={id} 
                    placeholder={placeholder}></textarea>
                </div>
            );
        } else if (formValues.isCheckbox) {
            return (
                <div className={dvclassName}>
                    <input type='checkbox' {...input} className={className} id={id} />
                    <label className='lastLabel' htmlFor={id}>{label}
                    </label>
                    <div className='optional'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Messages will be sent to your email</div>
                </div>
            );
        } else if (formValues.isEmail) {
            return (
                <div className={dvclassName}>
                    <label htmlFor={id}>{label}
                        <span className='optional'> {opt}</span>
                    </label>
                    <input type='email' {...input} autoComplete="off" className={className} id={id} 
                    placeholder={placeholder} />
                </div>
            );
        } else if (formValues.isInterests) {
            return (
                <div className={dvclassName}>
                    <label htmlFor={id}>{label}
                        <span className='optional'> {opt}</span>
                    </label>
                    <input {...input} autoComplete="off" className={className} id={id} 
                    placeholder={placeholder} />
                </div>
            );
        }
        else if (formValues.isHidden) {
            return (
                <input type='text' {...input} autoComplete="off" className={className} id={id} 
                placeholder={placeholder} hidden />
            );
        }
        return (
            <div className={dvclassName}>
                <label htmlFor={id}>{label}
                    <span className='optional'> {opt}</span>
                </label>
                <input type='text' {...input} autoComplete="off" className={className} id={id} 
                placeholder={placeholder} autoFocus={input.name === 'profileImage' ? true: false} />
            </div>
        );
    };
    
    onSubmit = formValues => {
        let { firstName, lastName, profileImage
            /*, emailaddress*/, username, portfolio, location, instagramUsername, twitterUsername, /*bio,*/ interests
        } = formValues;
        // Sample usage
        return this.imagesExists(profileImage, exists => {
            if (exists) {
                if (!firstName || !lastName) return
                if (firstName.length < 3 || lastName.length < 3) {
                    return alert('Attention, check first and last name!');
                }
                if (firstName.length > 12) {
                    return alert('Attention, first name must be less than 12 character!');
                }
                if (lastName.length > 12) {
                    return alert('Attention, last name must be less than 12 character!');
                }
                formValues.firstName = firstName.replace(/[^a-zA-Z0-9]/g, '');
                formValues.lastName = lastName.replace(/[^a-zA-Z0-9]/g, '');
                //formValues.emailaddress = emailaddress.replace(/[^a-zA-Z0-9@.]/g, '');
                formValues.username = username.replace(/[^a-zA-Z0-9_]/g, '');
                formValues.portfolio = portfolio.replace(/[^a-zA-Z0-9]/g, '');
                formValues.location = location.replace(/[^a-zA-Z0-9]/g, '');
                formValues.instagramUsername = instagramUsername.replace(/[^a-zA-Z0-9_]/g, '');
                formValues.twitterUsername = twitterUsername.replace(/[^a-zA-Z0-9_]/g, '');
                //formValues.bio = bio.replace(/[^a-zA-Z0-9]/g, '');
                formValues.interests = interests.replace(/[^a-zA-Z0-9]/g, '');
                
                this.props.validateData(formValues);
                return this.props.history.push('/home')
            }
            alert('Attention, profile image is not valid');
            return this.state.isChangeImage ? 
                null
                :this.setState({ isChangeImage: true });
        });
    };
    render() {
        let emtyObject = {};
        const { profileImage } = this.props.initialValues;
        return (
            <React.Fragment>
                <Header history={this.props.history} />
                <div className='container-account'>
                    <div className='accountSettings'>
                        <h2>Account settings</h2>
                        <span>Edit profile</span>
                        {this.state.matches992 ?
                            <hr className='account-hr' />
                        :null}
                    </div>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='container-account-child'>
                        <div className='profileImg'>
                            <div className='innerProfileImg'>
                                <LazyImage ClickImage={null} srcImage={profileImage} 
                                    altImage={'profile-img'} style={emtyObject} 
                                    classImage='imgProfile' imageRef={null}
                                />
                                {/* <img className='imgProfile' src={profileImage}
                                alt='profile-img' /> */}
                                {this.state.isChangeImage ? (
                                    <div onClick={this.handleCancelChangeImage} 
                                    className='cancelProfileImgTag'>
                                        Cancel
                                    </div>
                                ):(
                                    <div onClick={this.handleChangeImage} className='changeProfileImgTag'>
                                        Change profile image
                                    </div>
                                )}
                            </div>
                        </div>
                        {this.state.isChangeImage ? (
                            <div className='inputs'>
                                <div>
                                    {/* Profile image */}
                                    <Field name="profileImage" component={this.renderInput} label="Profile image" className='profileImage' id="profileImage" dvclassName='profileImageDivInp' isHidden={false} />
                                </div>
                                <div className='innerFirstAndLastNameDivInp'>
                                    {/* First name */}
                                    <Field name="firstName" component={this.renderInput} label="First name" className='firstName' id="firstName" dvclassName='firstNameDivInp' />
                                    {/* Last name */}
                                    <Field name="lastName" component={this.renderInput} label="Last name" className='lastName' id="lastName" dvclassName='lastNameDivInp' />
                                </div>
                            </div>
                        ):(
                            <div className='inputs'>
                                <Field name="profileImage" component={this.renderInput} label="Profile image" className='profileImage' id="profileImage" dvclassName='profileImageDivInp' isHidden={true} />
                                {/* First name */}
                                <Field name="firstName" component={this.renderInput} label="First name" className='firstName' id="firstName" dvclassName='firstNameDivInp' />
                                {/* Last name */}
                                <Field name="lastName" component={this.renderInput} label="Last name" className='lastName' id="lastName" dvclassName='lastNameDivInp' />
                            </div>
                        )}
                        <div className='inputs-2'>
                            <div className='inputs-container'>
                                {/* Email address */}
                                <Field name="emailaddress" component={this.renderInput} label="Email address" id="emailaddress" dvclassName='emailDivInp' opt='(optional)' isEmail={true} />
                                {/* Username */}
                                <Field name="username" component={this.renderInput} label="Username" id="username" dvclassName='usernameDivInp' opt='(only letters, numbers, and underscores)' />
                            </div>
                            <div className='inputs-container'>
                                {/* Personal site/portfolio */}
                                <Field name="portfolio" component={this.renderInput} label="Personal site/portfolio" id="portfolio" dvclassName='portfolioDivInp' placeholder='https://' />
                                {/* Location */}
                                <Field name="location" component={this.renderInput} label="Location" id="location" dvclassName='locationDivInp' />
                            </div>
                            <div className='inputs-container'>
                                {/* Instagram username */}
                                <div className='helper-feature'>
                                    <Field name="instagramUsername" component={this.renderInput} label="Instagram username" id="instagramUsername" dvclassName='instagramUsernameDivInp' placeholder='@' />
                                    <div className='feature'>
                                        <span className='optional'> So that we can feature you (:</span>
                                    </div>
                                </div>
                                {/* Twitter username */}
                                <div className='helper-feature'>
                                    <Field name="twitterUsername" component={this.renderInput} label="Twitter username" id="twitterUsername" dvclassName='twitterUsernameDivInp' placeholder='@' />
                                    <div className='feature'>
                                        <span className='optional'> So that we can feature you (:</span>
                                    </div>
                                </div>
                            </div>
                            <div className='inputs-container'>
                                {/* Bio */}
                                <Field name="bio" component={this.renderInput} label="Bio" id="bio" dvclassName='bioDivInp' isTextarea={true} />
                                {/* Interests */}
                                <Field name="interests" component={this.renderInput} label="Interests" id="interests" dvclassName='interestsDivInp' opt='(maximum 5)' isInterests={true} />
                            </div>
                        </div>
                        {/* CheckMessage */}
                        <Field name="checkMessage" component={this.renderInput} label="Display a 'Message' button on your profile" id="checkMessage" dvclassName='messaging' isCheckbox={true} />
                        <div className='updateBtn'>
                            <button type='submit'>
                                Update Account
                            </button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (getState) => {
    return {
        initialValues: getState.ProfileData,
        LogIn: getState.isLogIn,
        /* Username */
        UserPhotos: getState.fetchUserPhotos,
        UserLikes: getState.fetchUserLikes,
        UserCollection: getState.fetchUserCollection,
        // collection detail page
        fetchCollectionPhotos: getState.fetchUserCollectionPhotos,
    }
}

export default connect(mapStateToProps, actions)(reduxForm ({form: 'profileForm', enableReinitialize: true})(Account));