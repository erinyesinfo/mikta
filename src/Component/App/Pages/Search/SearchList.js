import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';
import ImageCard from '../#Helper/ImageCard';
import './SearchList.css';

/* Header */
import Header from "../../Header/Header";

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: false,
            s: 1,
        };
    };
    componentDidMount() {
        if (this.props.isSearched === false) {
            const paramsTitle = this.props.match.params.title;
            return this.props.fetchPhotos(paramsTitle, this.state.s);
        }
    };
    capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
    handleMorePhotos = () => {
        const paramsTitle = this.props.match.params.title;
        if (this.state.delay === false) {
            this.setState(st => ({ s: st.s + 1, delay: true }) );
            setTimeout(
                () => this.props.fetchPhotos(paramsTitle, this.state.s), 50);
        }
        alert('Attention, you need to wait 3 sec before you click again on load more photos :)');
        setTimeout(() => this.setState({ delay: false }), 3000);
    };
    render() {
        if (this.props.images.length === 0) {
            return (
                <React.Fragment>
                    <Header history={this.props.history} />
                    <h1 className='searched-loading'>Loading...</h1>
                </React.Fragment>
            );
        }
        const images = this.props.images.map((image, i) => {
            return (
                <ImageCard key={image.id || Math.random()} img={image}
                    history={this.props.history} />
            );
        });
        return (
        <React.Fragment>
            <Header history={this.props.history} />
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
        </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
  return {
      isSearched: getState.isSearched,
      images: getState.fetchPhotos
    };
};

export default connect(mapStateToProps, actions)(SearchList);
