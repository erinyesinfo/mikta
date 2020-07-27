import React from 'react';
import './index.css';

const Contact = () => (
    <div className='contact'>
        <div className='contact-container'>
            <h1>Contact us</h1>
            <div>
                <div className='contact-tSupport'>
                    Technical Support
                </div>
                <div className='contact-bSupport'>
                    Browse Online Support
                </div>
                <div className='contact-portfolio'>
                    Visit&nbsp;
                    <a href='https://erinyes.netlify.com/' target='blank'>
                        <strong className='contact-erinyes'>Erinyes</strong>
                    </a> support to quickly know more about us :)
                </div>
            </div>
            <br />
            <div className='contact-eSupport'>EMAIL SUPPORT</div>
            <div className='contact-email-help'>
                Please email us your questions regarding your needs.
            </div>
            <div className='contact-email'>erinyesinfo@gmail.com</div>
        </div>
    </div>
);

export default Contact;
