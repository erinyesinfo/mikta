import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../Actions';
import './NewComment.css';

/* ThirdParty-Library */
import LazyImage from "../../../../../../ThirdParty-Library/Lazy Image/LazyImage";

class NewComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: this.props.comment,
            isEdit: false
        }
    }
    handleRemove = () => {
        const { comment } = this.props;
        this.props.handleRemoveComment(`${comment}-id-${this.props.id}`);
    }
    handleChange = (e) => this.setState({ comment: e.target.value });
    handleEdit = () => this.setState(st => ({ isEdit: !st.isEdit }) );
    handleAddHeart = () => {
        const { like, comment, id } = this.props;
        return this.props.comments(like, `${comment}-id-${id}`);
    }
    handleReply = () => {
        return alert('Attention, this feature is not available because smart people don\'t reply to their own comments')
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { comment, id } = this.props;
        this.props.handleEditComment(this.state.comment, `${comment}-id-${id}`);
    }
    render() {
        const { comment, isUserImage } = this.props;
        if (comment.length === 0) return null;
        const { isEdit } = this.state;
        const { firstName, lastName, profileImage } = this.props.initialValues;
        let emtyObject = {};
        if (isEdit) {
            return (
                <div className='comments longComments'>
                    <LazyImage srcImage={profileImage}
                        altImage={'profile img'} style={emtyObject}
                        classImage='comment-img'
                    />
                    {/* <img src={profileImage} alt='profile img' /> */}
                    <span>
                        <Link className='nav_profileName' to='/home'>
                            {firstName} {lastName}
                        </Link> 
                        <form onSubmit={this.handleSubmit}>
                            <input className='editlargeInp' type='text' autoFocus
                            value={this.state.comment.toLowerCase()} onChange={this.handleChange} />
                        </form>
                    </span>
                    <div className='outilsBtn'>
                        <button onClick={this.handleRemove}><i className="fas fa-trash"></i></button>
                        <button onClick={this.handleEdit}><i className="fas fa-edit"></i></button>
                    </div>
                </div>
            );
        }
        return (
            <React.Fragment>
                <div className={comment.length > 20 ? 'comments longComments': 'comments'}>
                    <LazyImage srcImage={profileImage}
                        altImage={'profile img'} style={emtyObject}
                        classImage='comment-img'
                    />
                    {/* <img class='comment-img' src={profileImage} alt='profile img' /> */}
                    {isUserImage ?
                        comment.length > 0 ? (
                                <span className='p'>
                                    <Link className='nav_profileName' to='/home'>
                                        {firstName} {lastName}
                                    </Link> 
                                    <p>{comment.toLowerCase()}</p>
                                </span>
                        ):null
                        :comment.length > 20 ? (
                            <span className='p'>
                                <Link className='nav_profileName' to='/home'>
                                    {firstName} {lastName}
                                </Link> 
                                <p>{comment.toLowerCase()}</p>
                            </span>
                        ): (
                            <p>
                                <Link className='nav_profileName' to='/home'>
                                    {firstName} {lastName}
                                </Link> 
                                {comment.toLowerCase()}
                            </p>
                    )}
                    <div className='outilsBtn'>
                        <button onClick={this.handleRemove}><i className="fas fa-trash"></i></button>
                        <button onClick={this.handleEdit}><i className="fas fa-edit"></i></button>
                    </div>
                    <br />
                </div>
                <div className='outilsLikeAndReply'>
                    <span onClick={this.handleAddHeart}>
                        {this.props.like ? (
                            <i className="fas fa-heart"></i>
                        ): (
                            <i className="far fa-heart"></i>
                        )}
                        
                    </span>
                    <span onClick={this.handleReply}>Reply</span>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (getState) => {
    return {
        initialValues: getState.ProfileData,
        LogIn: getState.isLogIn
    }
  };
  
  export default connect(mapStateToProps, actions)(NewComment);