import React from 'react';
import './index.css';

const License = () => {
    return (
        <div className='license'>
            <h1>License</h1>
            <div>
                <div className='license-freely'>
                    Mikta photos based on Unsplash, are made to be used freely. Our license reflects that.
                </div>
                <div className='license-permitted'>
                    <div>
                        <span>All photos can be <strong>downloaded</strong> and used for <strong>free</strong></span>
                    </div>
                    <div>
                        <span><strong>Commercial</strong> and <strong>non-commercial</strong> purposes</span>
                    </div>
                    <div>
                        <span><strong>No permission needed</strong> (though attribution is appreciated!)</span>
                    </div>
                </div>
                <h3 className="license-notPermitted">What is not permitted <span role="img" aria-label="emoji">👎</span></h3>
                <div className='license-notPermitted-description'>
                    <div>
                        <span>
                            Photos cannot be <strong>sold</strong> or <strong>redistributed</strong> without significant modification.
                        </span>
                    </div>
                    <div>
                        <span>Compiling photos from Mikta to replicate a similar or competing service.</span>
                    </div>
                </div>
            </div>
            <br /><br />
            <h3 className='license-longform'>Longform</h3>
            <div className='license-longform-description'>
                Mikta grants you an irrevocable, nonexclusive, worldwide copyright license to download, copy, modify, distribute, perform, and use photos from Mikta for free, including for commercial purposes, without permission from or attributing the photographer or Mikta. This license does not include the right to compile photos from Mikta to replicate a similar or competing service.
            </div>
            <br />
            <div className='license-question'>Questions? <span onClick={() => alert("Page has not yet been created!")}>Read our FAQ.</span></div>
        </div>
    );
};

export default License;
