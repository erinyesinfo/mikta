import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import ImageCard from '../../#Helper/ImageCard';

/* Header */
import Header from '../../../Header/Header';

/* helper */
import LazyImage from "../../../../ThirdParty-Library/Lazy Image/LazyImage";

class CollectionPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: false,
            m: 1
        }
    }
    componentDidMount() {
        const { details } = this.props;
        if (Object.keys(details).length === 0) return this.props.history.push('/');
        const { params } = this.props.match;
        
        if (details.id.toString() !== params.id) {
            return this.props.history.push('/');
        }
        if (details.title !== params.collectionTitle) {
            return this.props.history.push('/');
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
    };
    handleMorePhotos = () => {
        if (this.state.delay === false) {
            const { id } = this.props.Length;
            this.setState(st => ({ m: st.m + 1 }) );
            return setTimeout(
                () => this.props.fetchUserCollectionPhotos(id, this.state.m), 50);
        }

        alert('Attention, you need to wait 3 sec before you click again on load more collection photos :)');
        setTimeout(() => this.setState({ delay: false }), 3000);
    };
    handleShare = () => alert('Attention, this feature is not available because i am not in the mood, anyways leave me');
    render() {
        const { history } = this.props;
        if (this.props.fetchCollectionPhotos.length === 0) {
            return (
                <React.Fragment>
                    <Header history={history} />
                    <div className='likesContent'>Loading...</div>
                    {/* <div className='likesContent'>No collection photos :(</div> */}
                </React.Fragment>
            );
        }
        const { details } = this.props;
        let emtyObject = {};
        const inlineStyling = {
            background: `linear-gradient(hsla(0,0%,100%,.7),hsla(0,0%,100%,.7) 50%,#fff), url(${details.srcImg})`,
            backgroundSize: 'cover'
        }
        return (
            <React.Fragment>
                <Header history={history} />
                <div style={inlineStyling} className='imgback'>
                    <div className='collectionInfo'>
                        <div className='nav-info'>
                            <div>
                                <h1>{details.title}</h1>
                                <div className='info-user'>
                                    <div className='userImageProfile'>
                                        <LazyImage ClickImage={null} 
                                            srcImage={details.profile_imageLarge} 
                                            altImage={details.name} 
                                            style={emtyObject} classImage='' 
                                            imageRef={null}
                                        />
                                        {/* 
                                        <img src={details.profile_imageLarge} alt={details.name} />
                                        */}
                                    </div>
                                    {details.name}
                                </div>
                            </div>
                            <div>
                                <button className='imagePage-plusBtn-share'
                                type='button' onClick={this.handleShare}>
                                    Share
                                </button>
                            </div>
                        </div>
                        <div>
                            {details.total_photos} photos
                        </div>
                    </div>
                </div>
                <div className='images'>
                    <div className='photosCategory'>
                        <div className='mediaWidth'>
                            {this.props.fetchCollectionPhotos.map((image, i) => {
                                return <ImageCard key={image.id || Math.random()} img={image}
                                            history={this.props.history}
                                        />
                            })}
                        </div>
                    </div>
                    {this.props.details.total_photos > this.state.m * 9 ? (
                        <div className='divLoadMore'>
                            <button className='loadMorePhotos' onClick={this.handleMorePhotos}>
                                Load more photos
                            </button>
                        </div>
                    ):null}
                </div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    return {
        fetchCollectionPhotos: getState.fetchUserCollectionPhotos,
        details: getState.fetchUserCollectionPhotosDetailes,
        /* Username */
        UserPhotos: getState.fetchUserPhotos,
        UserLikes: getState.fetchUserLikes,
        UserCollection: getState.fetchUserCollection,
    };
};

export default connect(mapStateToProps, actions)(CollectionPhotos);
