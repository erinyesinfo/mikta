import React, { Component } from 'react';
import './index.css';

class ImageInfo extends Component {
    // covert this date: (2019-11-29) to this data: (november 29, 2019)
    helper = string => {
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December', 
        ];

        let str = string.substr(0, 10).replace("-", ' ').replace("-", ' ');
        let year = str.substr(0, 4);
        let month = str.substr(5, 2);
        let day = str.substr(8, 2);

        let MonthArr = months[month - 1];
        const CreatedOn = `${MonthArr} ${day}, ${year}`;
        return CreatedOn;
    };
    render() {
        const { img } = this.props;
        const style = {
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), white 150px), url(${img.urls.regular})`
        };
        return (
            <div className='info-Wrapper' style={style}>
                <div className='info-top'>
                    <div className='info-header'>
                        <h3>Info</h3>
                        <span>
                            Published on {this.helper(img.created_at)}
                        </span>
                    </div>
                    <div className='info-content'>
                        <div className='info-content-views'>
                            <div className='image-views'>
                                <i className="far fa-eye"></i> &nbsp;Views
                            </div>
                            <div className='image-views-number'>
                                {img.views}
                            </div>
                        </div>
                        <div className='info-content-downloads'>
                            <div className='image-downloads'>
                                <i className="fas fa-arrow-down"></i> &nbsp;Downloads
                            </div>
                            <div className='image-downloads-number'>
                                {img.downloads}
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='info-bottom'>
                    <div className='info-footer'>
                        <div className='info-details'>
                            <div className='info-footer-more'>
                                <div className='info-footer-make-wrapper'>
                                    <div className='info-footer-make'>
                                        Camera Make
                                    </div>
                                    <div className='info-footer-make-value'>
                                        {img.exif && img.exif.make !== null ?
                                            img.exif.make
                                        :'--'}
                                    </div>
                                </div>
                                <div className='info-footer-model-wrapper'>
                                    <div className='info-footer-model'>
                                        Camera Model
                                    </div>
                                    <div className='info-footer-model-value'>
                                        {img.exif && img.exif.model !== null ?
                                            img.exif.model.replace(`${img.exif.make} `, '')
                                        :'--'}
                                    </div>
                                </div>
                                <div className='info-footer-focal-wrapper'>
                                    <div className='info-footer-focal'>
                                        Focal Length
                                    </div>
                                    <div className='info-footer-focal-value'>
                                        {img.exif && img.exif.focal_length !== null ?
                                            img.exif.focal_length
                                        :'--'}
                                    </div>
                                </div>
                            </div>
                            <div className='info-footer-more'>
                                <div className='info-footer-aperture-wrapper'>
                                    <div className='info-footer-aperture'>
                                        Aperture
                                    </div>
                                    <div className='info-footer-aperture-value'>
                                        {img.exif && img.exif.aperture !== null ?
                                            'f/' + img.exif.aperture
                                        :'--'}
                                    </div>
                                </div>
                                <div className='info-footer-exposure-wrapper'>
                                    <div className='info-footer-exposure'>
                                        Shutter Speed
                                    </div>
                                    <div className='info-footer-exposure-value'>
                                        {img.exif && img.exif.exposure_time !== null ?
                                            img.exif.exposure_time + 's'
                                        :'--'}
                                    </div>
                                </div>
                                <div className='info-footer-iso-wrapper'>
                                    <div className='info-footer-iso'>
                                        ISO
                                    </div>
                                    <div className='info-footer-iso-value'>
                                        {img.exif && img.exif.iso !== null ?
                                            img.exif.iso
                                        :'--'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='info-footer-dimensions-wrapper'>
                            <div className='info-footer-dimensions'>
                                Dimensions
                            </div>
                            <div className='info-footer-dimensions-number'>
                                {img.width} x {img.height}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default ImageInfo;
