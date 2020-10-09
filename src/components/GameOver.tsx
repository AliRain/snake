import React from 'react';
import { Coords } from '../models';
import '../styles/GameOver.css';

interface IProps {
  gridSize: Coords;
  setXSize: (x: number) => void;
  setYSize: (y: number) => void;
  speed: number;
  setSpeed: (newSpeed: number) => void;
  createNewGame: () => void;
}

const GameOver: React.FC<IProps> = ({ gridSize, setXSize, setYSize, speed, setSpeed, createNewGame }) => {
  return (
    <>
      <span className="label">Grid size:</span>
      <div className="grid-size-form">
        <input type="number" value={gridSize[0]} onChange={e => setXSize(parseInt(e.target.value, 10))} />
        <span className="x">x</span>
        <input type="number" value={gridSize[1]} onChange={e => setYSize(parseInt(e.target.value, 10))} />
      </div>
      <span className="label">Speed (ms):</span>
      <input
        type="number"
        className="speed"
        value={speed}
        onChange={e => setSpeed(parseInt(e.target.value, 10))}
        step={100}
        min={100}
        max={1000}
      />
      <button className="reset" onClick={createNewGame}>
        reset
      </button>
    </>
  );
};

export default GameOver;
