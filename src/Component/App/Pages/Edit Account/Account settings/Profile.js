import React, { Component } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import Server from '../../../../../API/Server';
import Interest from './Interest';

/* helper */
import LazyImage from '../../../../ThirdParty-Library/Lazy Image/LazyImage';

// Modal
import ModalEditPhoto from './Modal';
import ModalEditPhotoContent from './Modal/Content';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editPhoto: false,
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            portfolio: '',
            location: '',
            instagramUsername: '',
            twitterUsername: '',
            bio: '',
            interest: '',
            interests: [],
            interestsWidth: 7,
            interestsHeight: 0,
            tagsWidth: 0,
            tagsHeight: 0,
            profileImage: '',
            checkMessage: false,
            success: false,
            spinner: false,
            errors: []
        };
    };
    node = React.createRef();
    mode = React.createRef();
    handleRef = node => this.node = node;
    handleTagsRef = mode => this.mode = mode;
    componentDidMount() {
        const { firstname, lastname, email, username, portfolio, location, instagramUsername, twitterUsername, bio, interests, profileImage, checkMessage } = this.props.UserData;
        this.setState({
            firstname, lastname, email, username, portfolio, location, instagramUsername, twitterUsername, bio, interests, profileImage, checkMessage
        });
    };
    UNSAFE_componentWillMount() {
        window.addEventListener('load', this.handleTagsContainer);
        window.addEventListener('resize', this.handleTagsContainer);
    };
    componentWillUnmount() {
        window.addEventListener('load', this.handleTagsContainer);
        window.addEventListener('resize', this.handleTagsContainer);
    };
    handleSubmitPhoto = photo => this.setState({ profileImage: photo });
    handleChange = e => {
        if (e.target.name === "checkMessage") {
            return this.setState(st => ({ checkMessage: !st.checkMessage }));
        } else if (e.target.name === "bio") {
            const value = e.target.value.replace(/(\r\n|\n|\r|<|>)/gm, "");
            const sanitizeValue = value.replace(/ +/g, ' ');
            return this.setState({ bio: sanitizeValue });
        }
        const value = e.target.value.replace(/(\r\n|\n|\r|<|>|&)/gm, "");
        const sanitizeValue = value.replace(/ +/g, '');
        if (sanitizeValue.substring(0, 1) === " ") {// first character is whitespace
            const removeSpaceAtBeginning = sanitizeValue.charAt(0).replace(" ", "") + sanitizeValue.slice(1);
            return this.setState({
                [e.target.name]: removeSpaceAtBeginning.replace(/\/|\\/g, "")
            });
        }
        return this.setState({ [e.target.name]: sanitizeValue.replace(/\/|\\/g, "") });
    };
    handleCalculateInterests = (interestsWidth, remove) => {
        if (this.state.interests.length === 1) {
            return this.setState(st => ({ interestsWidth: st.interestsWidth + interestsWidth, interestsHeight: 1 }));
        } else if (!remove && (this.state.interestsWidth + interestsWidth + 90) >= this.node.clientWidth) {
            return this.setState(st => ({ interestsWidth: 7, interestsHeight: st.interestsHeight + 1 }));
        } else if (remove === true) {// only if the second argument is true then subtract
            return this.setState(st => ({ interestsWidth: (st.interestsWidth > interestsWidth ? st.interestsWidth - interestsWidth:interestsWidth - st.interestsWidth) }));
        }
        this.setState(st => ({ interestsWidth: st.interestsWidth + interestsWidth }));
    };
    handleKeyDownInterests = e => {
        e.currentTarget.style.height = "0px";
        e.currentTarget.style.height = (2+e.currentTarget.scrollHeight)+"px";
    };
    handleEnterInterests = e => {
        if (e.keyCode === 13 || e.which === 13) {
            const value = e.target.value;
            const duplicate = this.state.interests.find(interest => interest === value);            
            if (this.state.interests.length > 4 || duplicate) return null;
            if (value.length === 0) return null;
            return this.setState(st => ({
                interest: '',
                interests: [ ...st.interests, value ],
            }));
        } return null;
    };
    handleRemoveInterest = (Interest, interestsWidth) => this.setState({ interests: this.state.interests.filter(interest => interest !== Interest) }, () => this.handleCalculateInterests(interestsWidth, true));
    handleShowSpinner = () => this.setState({ spinner: true });
    handleCloseSpinner = () => this.setState({ spinner: false });
    handleSubmit = async e => {
        e.preventDefault();
        let { firstname, lastname, email, username, portfolio, location, instagramUsername, twitterUsername, bio, interests, profileImage, checkMessage } = this.state;

        let errors = [];
        // firsttname
        if (!firstname) {
            errors.push("First name can't be blank");
        } else if (firstname.length < 3) {
            errors.push("First name must be at least 3 characters.");
        } else if (firstname.length > 30) {
            errors.push("First name cannot exceed 30 characters.");
        }
        // lastname
        if (!lastname) {
            errors.push("Last name can't be blank");
        } else if (lastname.length < 3) {
            errors.push("Last name must be at least 3 characters.");
        } else if (lastname.length > 30) {
            errors.push("Last name cannot exceed 30 characters.");
        }
        // username
        if (!username) { errors.push("Username can't be blank"); }
        // email
        if (!email) {
            errors.push("Email can't be blank");
        } else if (!validator.isEmail(email)) {
            errors.push("You must provide a valid email address.")
        }
        // bio
        if (bio.length > 250) { errors.push("Bio is too long (maximum is 250 characters)"); }
        // check if there is no errors and clear errors if there is
        if (((firstname && firstname.length >= 3 && firstname.length <= 30) && (lastname && lastname.length >= 3 && lastname.length <= 30) && username && (email && validator.isEmail(email)) && bio.length <= 250) && this.state.errors.length !== 0) {
            this.setState({ errors: [] });
        }
        // if there is errors save them to state
        if (errors.length !== 0) {
            window.scrollTo(0,0);
            return this.setState({ errors });
        }
        let data = {
            firstname, lastname, email, username, portfolio, location, instagramUsername, twitterUsername, bio, interests, profileImage,
            checkMessage
        };
        await this.handleShowSpinner();
        if (this.props.DBLoginStatus) {
            let dbData = {
                firstname, lastname, email, username, portfolio, location, instagramUsername, twitterUsername, bio, interests, checkMessage
            };
            const api = await Server.post("/data-account", dbData);
            if (api.data === "success") {
                this.setState({ success: 'Account information has been changed successfully' }, this.handleCloseSpinner);
                const timeOut = setTimeout(() => {
                    if (this.state.success) {
                        this.setState({ success: false });
                    } return clearTimeout(timeOut);
                }, 2000);
                return this.props.handleUpdateDBUserData(data);
            } else {
                window.scrollTo(0,0);
                return this.setState({ errors: api.data }, this.handleCloseSpinner);
            }
        }
        return this.props.handleUpdateUserData(data);
    };
    handleShowEditPhoto = () => {
        let element = document.querySelector("body");
        element.style.overflow = 'hidden';
        this.setState({ editPhoto: true });
    };
    handleCloseEditPhoto = () => {
        let element = document.querySelector("body");
        element.style.overflow = 'auto';
        this.setState({ editPhoto: false });
    };
    renderModalEditPhotoContent = () => {
        return (
            <ModalEditPhotoContent editPhoto={this.state.editPhoto}
                handleSubmitPhoto={this.handleSubmitPhoto}
                handleCloseEditPhoto={this.handleCloseEditPhoto}
            />
        );
    };
    renderModalEditPhoto = () => {
        return (
            <ModalEditPhoto renderModalEditPhotoContent={this.renderModalEditPhotoContent}
                // edit photo
                handleCloseEditPhoto={this.handleCloseEditPhoto}
                editPhoto={this.state.editPhoto}
            />
        );
    };
    handleTagsContainer = () => {
        if (this.node === null || this.mode === null) return null;
        this.setState({ tagsHeight: this.mode.clientHeight, tagsWidth: (this.node.clientWidth-7) });
    };
    render() {
        let emtyObject = {};
        const { profileImage } = this.props.UserData;
        let intertestTextareaStyle = {
            paddingTop: this.mode.clientHeight !== 0 ? ((this.state.tagsHeight === 0 ? (this.mode.clientHeight):this.state.tagsHeight) + 20)+'px':'7px',
            height: this.mode.scrollHeight !== 0 ? ((this.state.tagsHeight === 0 ? (this.mode.clientHeight):this.state.tagsHeight) + 50)+'px':'32px',
        };
        let interestTags = { width: ((this.state.tagsWidth === 0 ? (this.node.clientWidth-7):this.state.tagsWidth))+'px' };
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className='container-edit-profile'>
                    {this.state.errors.length !== 0 ? (
                        <div className="edit-profile-errors">
                            <h3>{this.state.errors.length} {this.state.errors.length === 1 ? 'error':'errors'}:</h3>
                            <ul>{this.state.errors.map(err => <li key={err}>{err}</li>)}</ul>
                        </div>
                    ):null}
                    <div className='profileImg'>
                        <div className='innerProfileImg'>
                            <LazyImage ClickImage={null} style={emtyObject}
                                srcImage={profileImage} draggable={false}
                                altImage={'profileImage'} 
                                classImage='svg-profile' imageRef={null}
                            />
                            <div onClick={this.handleShowEditPhoto} className='changeProfileImgTag'>
                                Change profile image
                            </div>
                        </div>
                    </div>
                    <div className='inputs'>
                        {/* First name */}
                        <div className="firstNameDivInp">
                            <label htmlFor="firstname">
                                First name
                            </label>
                            <input type='text' name="firstname" className="firstName" id="firstname" autoComplete="off"
                                autoFocus onChange={this.handleChange} value={this.state.firstname}
                            />
                            {this.state.errors.map(err => {
                                if (err === "First name can't be blank"
                                || err === "First name must be at least 3 characters."
                                || err === "First name cannot exceed 30 characters.") {
                                    return <span className="edit-error" key={err}>{err}</span>
                                } return null;
                            })}
                        </div>
                        {/* Last name */}
                        <div className="lastNameDivInp">
                            <label htmlFor="lastName">
                                Last name
                            </label>
                            <input type='text' name="lastname" className="lastName" id="lastName" autoComplete="off"
                                onChange={this.handleChange} value={this.state.lastname}
                            />
                            {this.state.errors.map(err => {
                                if (err === "Last name can't be blank"
                                || err === "Last name must be at least 3 characters."
                                || err === "Last name cannot exceed 30 characters.") {
                                    return <span className="edit-error" key={err}>{err}</span>
                                } return null;
                            })}
                        </div>
                    </div>
                    <div className='inputs-2'>
                        <div className='inputs'>
                            {/* Email address */}
                            <div className="emailDivInp">
                                <label htmlFor="emailaddress">
                                    Email address
                                </label>
                                <input type='email' name="email"
                                    onChange={this.handleChange} value={this.state.email}
                                    autoComplete="off" id="emailaddress"
                                />
                                {this.state.errors.map(err => {
                                    if (err === "Email can't be blank"
                                    || err === "You must provide a valid email address."
                                    || err === "That email is already being used.") {
                                        return <span className="edit-error" key={err}>{err}</span>
                                    } return null;
                                })}
                            </div>
                            {/* Username */}
                            <div className="usernameDivInp">
                                <label htmlFor="username">
                                    Username
                                    <span className='optional'>(only letters, numbers, and underscores)</span>
                                </label>
                                <input type='text' name="username"
                                    onChange={this.handleChange} value={this.state.username}
                                    autoComplete="off" id="username"
                                />
                                {this.state.errors.map(err => {
                                    if (err === "Username can't be blank"
                                    || err === "That username is already taken.") {
                                        return <span className="edit-error" key={err}>{err}</span>
                                    } return null;
                                })}
                            </div>
                        </div>
                        <div className='inputs-container'>
                            {/* Personal site/portfolio */}
                            <div className="portfolioDivInp">
                                <label htmlFor="portfolio">
                                    Personal site/portfolio
                                </label>
                                <input type='text' name="portfolio"
                                    onChange={this.handleChange} value={this.state.portfolio}
                                    autoComplete="off" id="portfolio" placeholder="https://"
                                />
                            </div>
                            {/* Location */}
                            <div className="locationDivInp">
                                <label htmlFor="location">
                                    Location
                                </label>
                                <input type='text' name="location"
                                    onChange={this.handleChange} value={this.state.location}
                                    autoComplete="off" id="location" placeholder="https://"
                                />
                            </div>
                        </div>
                        <div className='inputs-container'>
                            {/* Instagram username */}
                            <div className='helper-feature'>
                                <div className="instagramUsernameDivInp">
                                    <label htmlFor="instagramUsername">
                                        Instagram username
                                    </label>
                                    <input type='text' name="instagramUsername"
                                        onChange={this.handleChange} value={this.state.instagramUsername}
                                        autoComplete="off" id="instagramUsername" placeholder="@"
                                    />
                                </div>
                                <div className='feature'>
                                    <span className='optional'> So that we can feature you (:</span>
                                </div>
                            </div>
                            {/* Twitter username */}
                            <div className='helper-feature'>
                                <div className="twitterUsernameDivInp">
                                    <label htmlFor="twitterUsername">
                                        Twitter username
                                    </label>
                                    <input type='text' name="twitterUsername"
                                        onChange={this.handleChange} value={this.state.twitterUsername}
                                        autoComplete="off" id="twitterUsername" placeholder="@"
                                    />
                                </div>
                                <div className='feature'>
                                    <span className='optional'> So that we can feature you (:</span>
                                </div>
                            </div>
                        </div>
                        <div className='inputs-container'>
                            {/* Bio */}
                            <div className="bioDivInp">
                                <label htmlFor="bio">
                                    Bio
                                </label>
                                <textarea name="bio" autoComplete="off" id="bio"
                                    onChange={this.handleChange} value={this.state.bio}
                                ></textarea>
                                <span className={(250 - this.state.bio.length) < 0 ? 'maxBioNumber err': 'maxBioNumber'}>
                                    {250 - this.state.bio.length}
                                </span>
                                {this.state.errors.map(err => {
                                    if (err === "Bio is too long (maximum is 250 characters)") {
                                        return <span className="edit-error bio" key={err}>{err}</span>
                                    } return null;
                                })}
                            </div>
                            {/* Interests */}
                            <div className="interestsDivInp">
                                <label htmlFor="interests">
                                    Interests
                                    <span className='optional'>(maximum 5)</span>
                                </label>
                                <textarea name="interest" className="interest-textarea"
                                    id="interests" autoComplete="off" style={intertestTextareaStyle}
                                    onChange={this.handleChange} value={this.state.interest}
                                    onKeyUp={this.handleEnterInterests} onKeyPress={this.handleKeyDownInterests}
                                    placeholder="Add a interest..." ref={this.handleRef}
                                ></textarea>
                                <div className="interests-tags" style={interestTags} ref={this.handleTagsRef}>
                                    {this.state.interests.map(
                                        interest => <Interest key={interest} interest={interest}
                                            handleRemoveInterest={this.handleRemoveInterest}
                                            handleCalculateInterests={this.handleCalculateInterests}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* CheckMessage */}
                    <div className="messaging">
                        <input type='checkbox' name="checkMessage" id="checkMessage"
                            onChange={this.handleChange} value={this.state.checkMessage}
                            checked={this.state.checkMessage ? true:false}
                        />
                        <label className='lastLabel' htmlFor="checkMessage">
                            Display a 'Message' button on your profile
                        </label>
                        <div className='optional'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Messages will be sent to your email</div>
                    </div>
                    {this.state.spinner ? (
                        <div className="edit-spinner"><i className="fas fa-circle-notch"></i></div>
                    ):null}
                    {this.state.success !== false ? (
                        <span className="profile-success">{this.state.success}</span>
                    ):null}
                    <div className='updateBtn'>
                        <button type='submit'>
                            Update Account
                        </button>
                    </div>
                </form>
                {this.state.editPhoto ? 
                    this.renderModalEditPhoto()
                :null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,
            UserData: getState.DBUserData,
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,
        UserData: getState.UserData,
    };
};

export default connect(mapStateToProps, actions)(Profile);
