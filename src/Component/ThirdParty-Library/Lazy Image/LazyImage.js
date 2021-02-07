import React, { Component } from 'react';
import { Img } from 'react-image';/* image loader */

// https://www.npmjs.com/package/react-image

class LazyImage extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.classImage === this.props.classImage) return false;
        if (nextProps.style === this.props.style) return false;
        return true
    };
    handleProfileImg = e => e.stopPropagation();
    render() {
        const { classImage, style } = this.props;
        const colors = [ '#0099e5', '#34bf49', '#cf8d2e', '#8a7967', '#6a737b', '#52325d', '#0085ad', '#a51890', '#ffc20e' ];
        const randomColor = Math.floor(Math.random(colors) * colors.length);
        let helperStyle = {
            ...style,
            backgroundColor: colors[randomColor]
        };
        const selectClassDiv = document.querySelector(`.${classImage || null}`) 
        ? document.querySelector(`.${classImage}`): false;
        if (selectClassDiv && selectClassDiv.clientHeight === 0) {
            helperStyle = {
                ...helperStyle,
                height: 300
            }
            //style.height = 300
            const renderStyle = helperStyle;
            return <div className={classImage} style={renderStyle}></div>
        }
        const renderStyle = helperStyle;
        return <div onClick={this.handleProfileImg} className={classImage} style={renderStyle}></div>
    };
};

const handleLazyImage = ({ ClickImage, classImage, srcImage, altImage, style, imageRef, draggable }) => {
    return <Img onClick={ClickImage} className={classImage} 
            src={srcImage} alt={altImage} ref={imageRef} draggable={draggable}
            loader={<LazyImage classImage={classImage} style={style} />}/>;
};

export default handleLazyImage;
