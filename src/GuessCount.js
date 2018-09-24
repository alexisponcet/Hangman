import React from 'react';

import './GuessCount.css';

import PropTypes from 'prop-types';

// unused
const GuessCount = ({ guesses }) => (
	<div className='tentatives'>
		Attempts : {guesses}
	</div>
)

GuessCount.propTypes = {
	guesses: PropTypes.number.isRequired,
}

GuessCount.defaultProps = {
	guesses:0,
}

export default GuessCount;