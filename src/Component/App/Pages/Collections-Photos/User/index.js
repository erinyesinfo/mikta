import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import Mikta from '../../../../Mikta';// mikta-animation-svg
import NotFound from './NotFound';// 404 page
import ImageCard from '../../#Helper';// imageCard
import './index.css';

/* helper */
import LazyImage from '../../../../ThirdParty-Library/Lazy Image/LazyImage';

class CollectionPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: '',
            delay: false,
            m: 1
        };
    };
    node = React.createRef();
    handleRef = node => this.node = node;
    componentDidMount() {
        const { id, title } = this.props.match.params;
        this.props.fetchUnsplashUserCollectionPhotos(id, 1).then((t) => {
            if (t !== '' && t.title !== title) {
                this.props.history.push(`/collections/${id}/${t.title}`);
            }
        });
        if (this.props.UnsplashUserPhotos.length > 0) {
            this.props.fetchUnsplashUserPhotos(true);
        }
        if (this.props.UnsplashUserLikes.length > 0) {
            this.props.fetchUnsplashUserLikes(true);
        }
        if (this.props.UnsplashUserCollections.length > 0) {
            this.props.fetchUnsplashUserCollections(true);
        }
        if (this.node.parentElement) {
            this.setState({ height: this.node.parentElement.firstChild.clientHeight });
        } else {
            if (window.innerHeight > 576) {
                this.setState({ height: 78 });
            } else {
                this.setState({ height: 52 });
            }
        }
    };
    UNSAFE_componentWillMount() {
        if (this.props.UnsplashCollectionPhotos[0] === 'Error') {
            window.addEventListener('resize', this.setHeight);
            window.addEventListener('load', this.setHeight);
            window.addEventListener('scroll', this.setHeight);
        }
    };
    componentWillUnmount() {
        if (this.props.UnsplashCollectionPhotos[0] === 'Error') {
            window.removeEventListener('resize', this.setHeight);
            window.removeEventListener('load', this.setHeight);
            window.removeEventListener('scroll', this.setHeight);
        }
    };
    setHeight = () => this.setState({ height: this.node.parentElement.firstChild.clientHeight });
    handleMorePhotos = () => {
        if (this.state.delay) {
            return alert('Attention, you need to wait 3 sec before you click again on load more collection photos :)');
        }
        const { id } = this.props.match.params;
        this.setState(st => ({ m: st.m + 1 }) , () => this.props.fetchUnsplashUserCollectionPhotos(id, this.state.m));
        const timeOut = setTimeout(() => this.setState({ delay: false }, () => clearTimeout(timeOut)), 3000);
    };
    handleShare = () => alert('Attention, this feature is not available because i am not in the mood, anyways leave me');
    render() {
        if (this.props.UnsplashCollectionPhotos.length === 0) {
            return <div className="app-spinner"><Mikta /></div>;
        } else if (this.props.UnsplashCollectionPhotos[0] === 'Error') {
            const style = { height: (window.innerHeight - this.state.height)+'px', top: this.state.height+'px' };
            return <div className="error404NotFound" ref={this.handleRef} style={style}><NotFound /><h2>Page not found</h2></div>;
        }
        const { CollectionPhotos } = this.props;
        if (Object.keys(CollectionPhotos).length === 0) return null;
        const source = CollectionPhotos.preview_photos[0].urls.regular || this.props.UnsplashCollectionPhotos[0].urls.regular;
        let emtyObject = {};
        const inlineStyling = {
            background: `linear-gradient(hsla(0,0%,100%,.7),hsla(0,0%,100%,.7) 50%,#fff), url(${source})`,
            backgroundSize: 'cover'
        };
        return (
            <React.Fragment>
                <div style={inlineStyling} className='imgback'>
                    <div className='collectionInfo'>
                        <div className='nav-info'>
                            <div>
                                <h1>{CollectionPhotos.title}</h1>
                                <div className='info-user'>
                                    <div className='userImageProfile'>
                                        <LazyImage ClickImage={null} 
                                            srcImage={CollectionPhotos.user.profile_image.large} 
                                            altImage={CollectionPhotos.name} 
                                            style={emtyObject} classImage='' 
                                            imageRef={null}
                                        />
                                    </div>
                                    {CollectionPhotos.user.name}
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
                            {CollectionPhotos.total_photos || this.props.UnsplashCollectionPhotos.length} photos
                        </div>
                    </div>
                </div>
                <div className='images'>
                    <div className='photosCategory'>
                        <div className='mediaWidth'>
                            {this.props.UnsplashCollectionPhotos.map((image, i) => (
                                <ImageCard key={image.id || Math.random()} img={image}
                                    history={this.props.history}
                                />
                            ))}
                        </div>
                    </div>
                    {CollectionPhotos.total_photos > this.state.m * 9 ? (
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
        /* Username */
        UnsplashUserPhotos: getState.UnsplashUserPhotos,
        UnsplashUserLikes: getState.UnsplashUserLikes,
        UnsplashUserCollections: getState.UnsplashUserCollections,
        UnsplashCollectionPhotos: getState.UnsplashCollectionPhotos,
        CollectionPhotos: getState.CollectionPhotos
    };
};

export default connect(mapStateToProps, actions)(CollectionPhotos);
