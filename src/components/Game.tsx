import React from 'react';
import { Coords } from '../models';
import '../styles/Game.css';
import { containsTuple, createEmptyArray } from '../utils/array';

interface IProps {
  gridSize: Coords;
  location: Coords[];
  fruits: Coords[];
}

const Game: React.FC<IProps> = ({ gridSize, location, fruits }) => {
  return (
    <div>
      {createEmptyArray(gridSize[1]).map((_, y) => (
        <div key={y} className="row">
          {createEmptyArray(gridSize[0]).map((_, x) => {
            let className = 'block';

            if (containsTuple(location, [x, y])) className += ' snake';
            else if (containsTuple(fruits, [x, y])) className += ' fruit';

            return <div key={`${x},${y}`} className={className} />;
          })}
        </div>
      ))}
    </div>
  );
};

export default Game;
