import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../../../../Actions';
import uuid from 'uuid/v4';
import Scroll from 'react-scroll';

/* icon */
import viewIcon from '../../../../../../IMG/Icons/iconfinder-icon.svg';

/* helper */
import LazyImage from "../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class MessageModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeView: false,
        };
    };
    handleChangeView = () => this.setState(st => ({ changeView: !st.changeView }) );
    renderInput = formValues => {
        const { input } = formValues;
        return (
            <input className='message-inputStyle' id='newPost' {...input}
            autoComplete="off" placeholder='Type message' />
        );
    };
    onSubmit = formValues => {
        let { newMessage } = formValues;
        if (!newMessage) return null
        this.props.newMessage(uuid(), newMessage);
        formValues.newMessage = '';
        
        const messageHeight = document.querySelector('#messageContainer').scrollHeight;
        var scroller = Scroll.scroller;
        // Somewhere else, even another file
        return scroller.scrollTo('myScrollToElement', {
            duration: 0,
            delay: 0,
            smooth: true,
            containerId: 'messageContainer',
            offset: messageHeight, // Scrolls to element + 50 pixels down the page
        });
    };
    render() {
        const autoReply = [
            "sorry am offline",
            "i said am offline",
            "what is wrong with you!",
            "stop, i mean it",
            "i know it",
            "you don't speak english",
            "idiot",
            "idiot",
            "i will call 911",
            "leave now",
            "don't you have things to do",
            "stop wasting my time",
            "you human are pathetic",
            "i just left, i will leave you with this auto reply 'goodbye' :)"
        ];
        let emtyObject = {};
        const { first_name, last_name, profile_image } = this.props.user;
        // store all messages in variable
        const userMessage = this.props.Message.map((ms, i) => {
            if (i === this.props.Message.length -1) {
                return (
                    <React.Fragment key={uuid()}>
                        <span className={this.state.changeView ? 'userMessageView':'selfMessage'}
                        /*key={ms.id}*/>
                            <span className={this.state.changeView ? 'userMessageStyleView':'selfMessageStyle'} >
                                {ms.userMessage}
                            </span>
                            <span className='message-time'>
                                {ms.time}
                            </span>
                        </span>
                        <span className={this.state.changeView ? 'selfMessageView':'userMessage'}
                        /*key={`${ms.id}-${i}`}*/>
                            <span className={this.state.changeView ? 'selfMessageStyleView':'userMessageStyle'}>
                                {(autoReply.length - 1) < i ? 'goodbye':autoReply[i]}
                            </span>
                            <LazyImage srcImage={profile_image.large} 
                                altImage='profile-img' style={emtyObject}
                                classImage='message-image'
                            />
                            {/*
                                <img className='message-image'
                                src={profile_image.large}
                                alt='profile-img' />
                            */}
                        </span>
                        <span className='emptyMessageStyle'></span>
                    </React.Fragment>
                )
            }
            return (
                <React.Fragment key={uuid()}>
                    <span className={this.state.changeView ? 'userMessageView':'selfMessage'}>
                        <span className={this.state.changeView ? 'userMessageStyleView':'selfMessageStyle'}>
                            {ms.userMessage}
                        </span>
                        <span className='message-time'>
                            {ms.time}
                        </span>
                    </span>
                    <span className={this.state.changeView ? 'selfMessageView':'userMessage'}
                    /*key={`${ms.id}-${i}`}*/>
                        <span className={this.state.changeView ? 'selfMessageStyleView':'userMessageStyle'}>
                            {(autoReply.length - 1) < i ? 'goodbye':autoReply[i]}
                        </span>
                        <LazyImage srcImage={profile_image.large}
                            altImage='profile-img' style={emtyObject}
                            classImage='message-image'
                        />
                        {/* <img className='message-image'
                            src={user.profile_image.large}
                            alt='profile-img' /> */}
                    </span>
                </React.Fragment>
            )
        });
        let Element = Scroll.Element;
        const isChangeView = this.props.Message.length > 0 ? this.handleChangeView:null;
        
        // render the file here
        return (
            <div className='messageWrapper'>
                <div className='inner-messageWrapper'>
                    <div className='message-to'>
                        <span className='message-toName'>
                            <span>{first_name}</span>
                            <span>&nbsp;{last_name}</span>
                        </span>
                        <span onClick={isChangeView} className='message-iconWrapper'>
                            <LazyImage srcImage={viewIcon} 
                                altImage='view-icon' style={emtyObject}
                                classImage=''
                            />
                            {/* <img src={viewIcon} alt='view-icon' /> */}
                        </span>
                    </div>
                    <div>
                        <Element name="myScrollToElement">
                            <div id='messageContainer' className='messageContainer'>
                                {userMessage}
                            </div>
                        </Element>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                            className='message-form'>
                            <Field name='newMessage' component={this.renderInput} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = getState => {
    return {
        user: getState.fetchUser,
        Message: getState.newMessage
    };
};

export default connect(mapStateToProps, actions)(reduxForm ({
    form: 'newMessageForm'})(MessageModalContent));