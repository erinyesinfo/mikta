import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import axios from 'axios';
import './News.css';

import NewsApi from '../../../../../API/News';

class News extends Component {
    async componentDidMount() {
        if (this.props.HackerNews.length === 0) {
            const results = await NewsApi.get('/');
            let r = Math.floor(Math.random() * (results.data.length - 10));
            const find = this.props.HackerNews.every(
                (data, i) => data.id === results.data.slice(r, r + 10)[i]
            );
            if (find) {
                r = Math.floor(Math.random() * (results.data.length - 10));
            }
            results.data.slice(r, r + 10).map(async element => {
                const innerResults = await axios.get(
                    "https://hacker-news.firebaseio.com/v0/item/" + element + ".json"
                );
                this.props.getNews(innerResults.data);
            });
        }
    };
    handleRefreshNews = async () => {
        const results = await NewsApi.get('/');
        let r = Math.floor(Math.random() * (results.data.length - 10));
        
        const find = this.props.HackerNews.every(
            (data, i) => data.id === results.data.slice(r, r + 10)[i]
        );
        if (find) {
            r = Math.floor(Math.random() * (results.data.length - 10));
        }
        results.data.slice(r, r + 10).map(async element => {
            const innerResults = await axios.get(
                "https://hacker-news.firebaseio.com/v0/item/" + element + ".json"
            );
            this.props.getNews(innerResults.data, true);
        });
    };
    handleMoreNews = async () => {
        const results = await NewsApi.get('/');
        let r = Math.floor(Math.random() * (results.data.length - 10));
        const find = this.props.HackerNews.every(
            (data, i) => data.id === results.data.slice(r, r + 10)[i]
        );
        if (find) {
            r = Math.floor(Math.random() * (results.data.length - 10));
        }
        results.data.slice(r, r + 10).map(async element => {
            const innerResults = await axios.get(
                "https://hacker-news.firebaseio.com/v0/item/" + element + ".json"
            );
            this.props.getNews(innerResults.data, false);
        });
    };
    render() {
        const HackerNews = this.props.HackerNews.map(news => {
            return (
                <div className='news-div' key={news.id}>
                    <div className='news-innerDiv'></div>
                    <a className='news-user' href={news.url} target='blank'>{news.title}</a>
                </div>
            );
        });
        
        return (
            <div className='news-divWrapper'>
                <div className='news-innerDivWrapper'>
                    <button onClick={this.handleRefreshNews} className='news-refresh' type='button'>
                        <i className="fas fa-redo"></i>
                    </button>
                    <div className='news-header'>News</div>
                    {HackerNews}
                    <button onClick={this.handleMoreNews} className='news-more' type='button'>
                        More
                    </button>
                </div>
            </div>
        );
    };
};

const mapStateToProps = getState => {
    return { HackerNews: getState.HackerNews };
};

export default connect(mapStateToProps, actions)(News);
