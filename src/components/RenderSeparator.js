import React from 'react';
import MarginVertical from './MarginVertical';
import PropTypes from 'prop-types';

export default function renderSeparator({ size }) {
    return <MarginVertical size={size} />;
}

renderSeparator.propTypes = { size: PropTypes.number };
renderSeparator.defaultProps = { size: 1 };
