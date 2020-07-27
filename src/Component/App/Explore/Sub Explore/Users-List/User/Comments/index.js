import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../Actions';
import './index.css';

/* ThirdParty-Library */
import LazyImage from '../../../../../../ThirdParty-Library/Lazy Image/LazyImage';

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: this.props.comment,
            isEdit: false
        };
    };
    handleRemove = () => this.props.handleComment('remove', `${this.props.comment}-id-${this.props.id}`);
    handleChange = e => this.setState({ comment: e.target.value });
    handleEdit = () => this.setState(st => ({ isEdit: !st.isEdit }) );
    handleAddHeart = () => {
        const { like, comment, id } = this.props;
        return this.props.handleComment(like, `${comment}-id-${id}`);
    };
    handleReply = () => {
        return alert('Attention, this feature is not available because smart people don\'t reply to their own comments')
    };
    handleSubmit = e => {
        e.preventDefault();
        const { Comments, comment, id } = this.props;
        const sameTask = Comments.find(data => data.comment === this.state.comment);
        if (sameTask) return null;
        this.props.handleComment(this.state.comment, `${comment}-id-${id}`, 'edit');
    };
    render() {
        const { comment, isUserImage } = this.props;
        if (comment.length === 0) return null;
        const { isEdit } = this.state;
        const { firstname, lastname, profileImage } = this.props.UserData;
        let emtyObject = {};
        if (isEdit) {
            return (
                <div className='comments longComments'>
                    <LazyImage srcImage={profileImage}
                        altImage={'profileImage'} style={emtyObject}
                        classImage='comment-img'
                    />
                    <span>
                        <Link className='nav_profileName' to='/home'>
                            {firstname} {lastname}
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
        } return (
            <React.Fragment>
                <div className={comment.length > 20 ? 'comments longComments': 'comments'}>
                    <LazyImage srcImage={profileImage}
                        altImage={'profile img'} style={emtyObject}
                        classImage='comment-img'
                    />
                    {isUserImage ?
                        comment.length > 0 ? (
                                <span className='p'>
                                    <Link className='nav_profileName' to='/home'>
                                        {firstname} {lastname}
                                    </Link> 
                                    <p>{comment.toLowerCase()}</p>
                                </span>
                        ):null
                        :comment.length > 20 ? (
                            <span className='p'>
                                <Link className='nav_profileName' to='/home'>
                                    {firstname} {lastname}
                                </Link> 
                                <p>{comment.toLowerCase()}</p>
                            </span>
                        ): (
                            <p>
                                <Link className='nav_profileName' to='/home'>
                                    {firstname} {lastname}
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
        );
    };
};

const mapStateToProps = getState => {
    if (getState.DBLoginStatus) {//login with db
        return {
            DBLoginStatus: getState.DBLoginStatus,
            UserData: getState.DBUserData,
            Comments: getState.Comments
        };
    } return {
        DBLoginStatus: getState.DBLoginStatus,
        UserData: getState.UserData,
        Comments: getState.Comments
    };
};

export default connect(mapStateToProps, actions)(New);
