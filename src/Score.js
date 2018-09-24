import React from 'react';

import PropTypes from 'prop-types';

const Score = ({ score }) => (
	<span>
		{score}
	</span>
)

Score.propTypes = {
	score: PropTypes.number.isRequired,
}

Score.defaultProps = {
	score: 0,
}

export default Score;