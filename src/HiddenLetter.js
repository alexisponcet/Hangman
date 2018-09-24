import React from 'react';

import './HiddenLetter.css';

import PropTypes from 'prop-types';

const HiddenLetter = ({ letter, feedback }) => (
    <div className='letter'>
        {(feedback === 'hidden') ? '_' : letter}
    </div>
)

HiddenLetter.propTypes = {
    letter : PropTypes.string.isRequired,
    feedback: PropTypes.oneOf(
        ['visible',
        'hidden']
    ).isRequired,
}

export default HiddenLetter;
// <div className={`letter ${(feedback === 'hidden') ? 'hiddenLetter' : 'visibleLetter'}`}>