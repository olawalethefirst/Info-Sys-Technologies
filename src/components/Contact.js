import React from 'react';
import ContactForm from '../components/ContactForm';
import PropTypes from 'prop-types';
import SubScreenTemplate from './SubScreenTemplate';
import ContactModal from './ContactModal';

function Contact({ fontFactor, headerSize, margin, scrollRef }) {
    const sectionComponents = [
        {
            key: '0',
            data: <ContactForm scrollRef={scrollRef} />,
        },
    ];

    return (
        <>
            <SubScreenTemplate
                sectionComponents={sectionComponents}
                heading="Contact Us"
                margin={margin}
                fontFactor={fontFactor}
                headerSize={headerSize}
                scrollRef={scrollRef}
            />
            <ContactModal />
        </>
    );
}

Contact.propTypes = {
    headerSize: PropTypes.number,
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    scrollRef: PropTypes.object,
};

export default React.memo(Contact);
