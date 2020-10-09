import React from 'react';
import '../styles/Score.css';

interface IProps {
  score: number;
  gameOver: boolean;
  // highScore: boolean;
}

const Score: React.FC<IProps> = ({ score, gameOver }) => {
  const classes = ['score'];

  if (gameOver) classes.push('game-over');
  // else if (highScore) classes.push('high-score');

  return <div className={classes.join(' ')}>{score}</div>;
};

export default Score;
