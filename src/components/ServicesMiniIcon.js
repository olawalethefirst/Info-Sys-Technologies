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

const ServicesMiniIcon = ({ type }) => {
    switch (type) {
        case serviceDetails[3].title:
            return <CAIcon />;
        case serviceDetails[4].title:
            return <MTDIcon />;
        case serviceDetails[5].title:
            return <FBPIcon />;
        case serviceDetails[6].title:
            return <FAMIcon />;
        case serviceDetails[2].title:
            return <ICCAIcon />;
        case serviceDetails[1].title:
            return <ASFMIcon />;
        case serviceDetails[0].title:
            return <ITIcon />;
        default:
            <></>;
    }
};

ServicesMiniIcon.propTypes = {
    type: PropTypes.string,
};

export default ServicesMiniIcon;
