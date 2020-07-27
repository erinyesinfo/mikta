import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';
import ImageCard from '../#Helper';// imageCard
import './index.css';

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: false,
            s: 1,
        };
    };
    componentDidMount() {
        if (this.props.SearchedPhotosBool === false) {
            const paramsTitle = this.props.match.params.title;
            return this.props.fetchUnsplashSearchedPhotos(paramsTitle, this.state.s);
        }
    };
    capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
    handleMorePhotos = () => {
        const paramsTitle = this.props.match.params.title;
        if (this.state.delay === false) {
            this.setState(st => ({ s: st.s + 1, delay: true }), () => this.props.fetchUnsplashSearchedPhotos(paramsTitle, this.state.s));
        }
        alert('Attention, you need to wait 3 sec before you click again on load more photos :)');
        const timeOut = setTimeout(() => {
            this.setState({ delay: false });
            clearTimeout(timeOut);
        }, 3000);
    };
    render() {
        if (this.props.UnsplashSearchedPhotos.length === 0) {
            return <h1 className='searched-loading'>Loading...</h1>;
        }
        const images = this.props.UnsplashSearchedPhotos.map((image, i) => {
            return (
                <ImageCard key={image.id || Math.random()} img={image}
                    history={this.props.history} />
            );
        });
        return (
            <div className='searched'>
                <h1 className='searched-title'>
                    {this.capitalizeFirstLetter(this.props.match.params.title)}
                </h1>
                <div className="mediaWidth">{images}</div>
                <div className='searched-divBtn'>
                    <button className='searched-btn-morePhotos'
                        onClick={this.handleMorePhotos}>
                        Load More
                    </button>
                </div>
            </div>
        );
    };
};

const mapStateToProps = getState => {
    return {
      SearchedPhotosBool: getState.SearchedPhotosBool,
      UnsplashSearchedPhotos: getState.UnsplashSearchedPhotos
    };
};

export default connect(mapStateToProps, actions)(SearchList);
