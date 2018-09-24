import React from 'react';

import './Keyboard.css';

import PropTypes from 'prop-types';

const Keyboard = ({ keyboard, clicked, onClick }) => (
    <button className={`alphabet ${clicked}`}
            onClick={() => onClick(keyboard)}>
        {keyboard}
    </button>
)

Keyboard.propTypes = {
    keyboard : PropTypes.string.isRequired,
    clicked: PropTypes.string.isRequired,
}

export default Keyboard;