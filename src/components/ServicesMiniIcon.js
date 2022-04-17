import { serviceDetails } from '../constants';
import CAIcon from './CAIcon';
import FBPIcon from './FBPIcon';
import ASFMIcon from './ASFMIcon';
import ITIcon from './ITIcon';
import MTDIcon from './MTDIcon';
import FAMIcon from './FAMIcon';
import ICCAIcon from './ICCAIcon';
import React from 'react';
import PropTypes from 'prop-types';

const ServicesMiniIcon = ({ type, size }) => {
    switch (type) {
        case serviceDetails[3].title:
            return <CAIcon size={size} />;
        case serviceDetails[4].title:
            return <MTDIcon size={size} />;
        case serviceDetails[5].title:
            return <FBPIcon size={size} />;
        case serviceDetails[6].title:
            return <FAMIcon size={size} />;
        case serviceDetails[2].title:
            return <ICCAIcon size={size} />;
        case serviceDetails[1].title:
            return <ASFMIcon size={size} />;
        case serviceDetails[0].title:
            return <ITIcon size={size} />;
        default:
            <></>;
    }
};

ServicesMiniIcon.propTypes = {
    type: PropTypes.string,
    size: PropTypes.number,
};

export default ServicesMiniIcon;
