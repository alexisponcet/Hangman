import React, { Component } from 'react';

import './App.css';

import Rules from './Rules';
import getWord from './Words';
import HiddenLetter from './HiddenLetter';
import Keyboard from './Keyboard';
import Player from './Player';
import ButtonRestart from './ButtonRestart';

const LETTERS = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
const NB_PLAYERS = 6;

class App extends Component {

    constructor (props){
        super(props);
        this.state = this.setEnvironment();
    }

	/**
	 * Initialize the game environment
	 * @returns Object : the environment
	 **/
	setEnvironment = () => {
		const toFind = this.generateWord();
		return {
			word: Array.from(toFind),
			lettersLeft: toFind,
			selectedLetters: [],
			guesses: 0,
			players: this.generatePlayers(),
			indexCurrentPlayer: this.generateStartingPlayer(),
			highestScore: 0,
		};
	}

	/**
	 * Fetch the mystery word
	 * @return String : the mystery word
	 **/
	generateWord() {
		return getWord();
	}

    /**
     * Initialize the array of players
     * @return Array : the array of players
     **/
    generatePlayers(){
	    let players = [];
	    for (let i = 0 ; i < NB_PLAYERS ; i++){
		    players.push({'name' : 'P ' + (i + 1), 'score' : 0, 'isWinning': false});
	    }
	    return players;
    }

	/**
	 * Decide which player should start playing
	 * @return Number : the index of the first player
	 **/
	generateStartingPlayer(){
		return Math.floor(Math.random() * (NB_PLAYERS));
	}

	/**
	 * Has the current letter been found ?
	 * @param letter : current letter
	 * @return String : the state of the current letter
	 **/
    getFeedbackForMysteryLetter = (letter) => {
        const { selectedLetters } = this.state;
        const matched = selectedLetters.includes(letter);

        if (matched)
            return 'visible';
        return 'hidden';
    }

    /**
     * Control the user's click on a letter
     * @param letter : clicked letter
     **/
    handleKeyBoardClick = (letter) => {
	    const {lettersLeft, selectedLetters } = this.state;

	    this.setState((prevState) => ({ guesses: prevState.guesses + 1 }));
	    if (selectedLetters.includes(letter)) {
		    this.setState((prevState) => ({ guesses : prevState.guesses + 1,
                            players: this.setScorePlayers(-2) }));
		    this.nextPlayer();
            return;
        }

        this.setState({ selectedLetters: [...selectedLetters, letter] });
        if (lettersLeft.includes(letter)) {
	        const countLetter = lettersLeft.match(new RegExp(letter, 'g')).length;
            const newLettersLeft = lettersLeft.replace(new RegExp(letter, 'g'), '');
            this.setState({ lettersLeft: newLettersLeft,
                players : this.setScorePlayers(countLetter*(+2)) });
        } else {
	        this.setState({ players: this.setScorePlayers(-1) });
	        this.nextPlayer();
        }
    }

    /**
     * Update the score of players
     * @param score : the score modification
     * @return Array : the new state of players
     **/
	setScorePlayers = (score) => {
	    const {players, indexCurrentPlayer } = this.state;
	    const newPlayer =  {'name' : players[indexCurrentPlayer].name,
		                'score': players[indexCurrentPlayer].score + score,
                        'isWinning' : players[indexCurrentPlayer].score + score};
	    const newPlayers = players.filter(player => player !==
		    players[indexCurrentPlayer]);
	    newPlayers.splice(indexCurrentPlayer, 0, newPlayer);
	    return this.setWinners(newPlayers);
    }

    /**
     * Update the current winners
     * @param newPlayers : the new state of players
     * @return Array : the new state of players after modifications
     **/
	setWinners = (newPlayers) => {
        const { highestScore } = this.state;
		const newHighestScore = Math.max.apply(Math, newPlayers.map(player => player.score));

		newPlayers.map((player) => (
		    (player.score === newHighestScore)
                ? player.isWinning = true
                : player.isWinning = false
        ));

        if (newHighestScore !== highestScore)
	        this.setState({ highestScore: newHighestScore });
        return newPlayers;
    }

    /**
     * Update the next player
     **/
	nextPlayer = () => {
		const { indexCurrentPlayer } = this.state;

		const indexNextPlayer =  (indexCurrentPlayer+1) % NB_PLAYERS;
		this.setState({ indexCurrentPlayer : indexNextPlayer });
	}

	/**
	 * Get all likely winners
	 * @return String : the list of winners (if draw)
	 **/
	getWinners = () => {
		const { players } = this.state;
		const winners = players.filter(player => player.isWinning === true);
		let winnersList = "";

		winners.forEach(winner => winnersList+= winner.name + ", ");
		return winnersList.substr(0, winnersList.length-2);
	}

	/**
	 * Set the color of the current button
	 * @param keyboard : the current button
	 * @returns String : the state of the button
	 */
    setButtonColor(keyboard) {
        if (this.state.selectedLetters.includes(keyboard))
            return 'alreadyClicked';
        return 'notAlreadyClicked';
    }

    /**
     * Restart the game
     **/
    restart = () =>{
        this.setState(this.setEnvironment());
    }

    render() {
        const { word, lettersLeft, players, indexCurrentPlayer } = this.state;
        const won = lettersLeft.length === 0;
        return (
          <div className="app">
	          <Rules/>
              <div className='word'>
                  {word.map((letter, index) =>
                      <HiddenLetter
                          letter={letter}
                          feedback={this.getFeedbackForMysteryLetter(letter)}
                          key={index}
                      />
                  )}
              </div>

	          <div className='game'>
	              <div className='keyboard'>
		              {won ? <ButtonRestart
	                          onClick={this.restart}/> :
			              LETTERS.map((keyboard, index) =>
				              <Keyboard keyboard={keyboard}
				                        onClick={this.handleKeyBoardClick}
				                        clicked={this.setButtonColor(keyboard)}
				                        key={index}
				              />
			              )
		              }
	              </div>
		          <div className='score'> {/*<GuessCount guesses = {guesses}/>*/}
	                  <ul className='list-group'>
	                  {players.map((player, index) =>
		                  <Player name = {player.name}
	                              score = {player.score}
	                              hasToPlay = {won ? false : index === indexCurrentPlayer}
	                              key={index}
	                      />
	                  )}</ul>
		          {won && <div> Congratulation to {this.getWinners()} !
	                </div>
	              }
		          </div>
	          </div>
          </div>
        );
  }
}

export default App;
