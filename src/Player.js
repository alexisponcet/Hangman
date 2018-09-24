import React from 'react';

import './Player.css';

import PropTypes from 'prop-types';
import Score from './Score';

const Player = ({ name, score, hasToPlay }) => (
	<li className={hasToPlay ? 'currentPlayer list-group-item active' : 'waitingPlayer list-group-item'}>
		{name} : <Score score = {score}/>
	</li>
)


Player.propTypes = {
	name: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	hasToPlay: PropTypes.bool.isRequired,
}

Player.defaultProps = {
	name: "Anonymous",
	score: 0,
	hasToPlay: false,
}

export default Player;