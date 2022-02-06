import React from 'react';
import ComputerMaintenanceIcon from './ComputerMaintenanceIcon';
import AuditIcon from './AuditIcon';
import NetworkingIcon from './NetworkingIcon';
import AccountingIcon from './AccountingIcon';
import PropTypes from 'prop-types';

export default function PostMiniIcon({ category }) {
    // console.log('called', category)
    switch (category) {
        case 'Computer Maintenance':
            return <ComputerMaintenanceIcon />;
        case 'Audit':
            return <AuditIcon />;
        case 'Networking':
            return <NetworkingIcon />;
        case 'Accounting':
            return <AccountingIcon />;
        default:
            return null;
    }
}

PostMiniIcon.propTypes = {
    category: PropTypes.string,
};
