import React from 'react';
import { Coords, Direction } from '../models';
import '../styles/App.css';
import { areEqualTuples, containsTuple, createEmptyArray } from '../utils/array';
import { getRandomInt } from '../utils/random';
import Game from './Game';
import GameOver from './GameOver';
import Header from './Header';
import Score from './Score';

interface IState {
  gridSize: Coords;
  newGridSize: Coords;
  speed: number;
  location: Coords[];
  fruits: Coords[];
  score: number;
  direction: Direction;
  lastMovement: Direction;
  gameOver: boolean;
}

class App extends React.Component<{}, IState> {
  state = this.defaultState([10, 10], 500);

  defaultState(gridSize: Coords, speed: number) {
    const fruits = [[getRandomInt(0, gridSize[0]), getRandomInt(0, gridSize[1])]] as Coords[];

    while (areEqualTuples(fruits[0], [4, 4])) {
      fruits[0][0] = getRandomInt(0, gridSize[0]);
      fruits[0][1] = getRandomInt(0, gridSize[1]);
    }

    return {
      gridSize,
      newGridSize: [gridSize[0], gridSize[1]] as Coords,
      speed,
      location: [[4, 4]] as Coords[],
      fruits,
      score: 0,
      direction: Direction.Right,
      lastMovement: Direction.Right,
      gameOver: false,
    };
  }

  componentDidMount() {
    this.handleKeyUp = this.handleKeyUp.bind(this);
    document.onkeyup = this.handleKeyUp;

    this.move = this.move.bind(this);
    this.move();

    this.createNewGame = this.createNewGame.bind(this);
  }

  handleKeyUp(e: KeyboardEvent) {
    const { lastMovement } = this.state;

    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        if (lastMovement === Direction.Left || lastMovement === Direction.Right)
          this.setState({ direction: Direction.Up });
        break;

      case 'ArrowDown':
      case 'KeyS':
        if (lastMovement === Direction.Left || lastMovement === Direction.Right)
          this.setState({ direction: Direction.Down });
        break;

      case 'ArrowLeft':
      case 'KeyA':
        if (lastMovement === Direction.Up || lastMovement === Direction.Down)
          this.setState({ direction: Direction.Left });
        break;

      case 'ArrowRight':
      case 'KeyD':
        if (lastMovement === Direction.Up || lastMovement === Direction.Down)
          this.setState({ direction: Direction.Right });
        break;
    }
  }

  move() {
    const { speed } = this.state;

    setTimeout(() => {
      const { gridSize, location, fruits, score, direction } = this.state;

      const coords: Coords = [location[0][0], location[0][1]];
      let move = false;

      switch (direction) {
        case Direction.Up:
          if (coords[1] - 1 !== -1) {
            move = true;
            coords[1] -= 1;
          }
          break;

        case Direction.Down:
          if (coords[1] + 1 !== gridSize[1]) {
            move = true;
            coords[1] += 1;
          }
          break;

        case Direction.Left:
          if (coords[0] - 1 !== -1) {
            move = true;
            coords[0] -= 1;
          }
          break;

        case Direction.Right:
          if (coords[0] + 1 !== gridSize[0]) {
            move = true;
            coords[0] += 1;
          }
          break;
      }

      if (containsTuple(location, coords)) move = false;

      if (!move) return this.setState({ gameOver: true });

      this.move();

      const ate = containsTuple(fruits, coords);

      if (!ate)
        return this.setState({
          location: [coords, ...location.slice(0, location.length - 1)],
          lastMovement: direction,
        });

      const newFruits = this.generateNewFruits();

      this.setState({
        location: [coords, ...location],
        fruits: [...fruits.filter(fruit => !areEqualTuples(fruit, coords)), ...newFruits],
        score: score + 1,
        lastMovement: direction,
      });
    }, speed);
  }

  generateNewFruits() {
    const { fruits, location, gridSize, score } = this.state;
    const additionalFruits: Coords[] = [];

    createEmptyArray(Math.ceil(score / 5) + 2 - fruits.length).forEach(() => {
      const fruit = [getRandomInt(0, gridSize[0]), getRandomInt(0, gridSize[1])] as Coords;

      while (containsTuple(fruits, fruit) || containsTuple(location, fruit)) {
        fruit[0] = getRandomInt(0, gridSize[0]);
        fruit[1] = getRandomInt(0, gridSize[1]);
      }
      additionalFruits.push(fruit);
    });

    return additionalFruits;
  }

  createNewGame() {
    const { newGridSize, speed } = this.state;
    this.setState(this.defaultState(newGridSize, speed));
    this.move();
  }

  render() {
    const { gridSize, newGridSize, speed, location, fruits, score, gameOver } = this.state;

    return (
      <div className="app">
        <div>
          <Header />
          <Score score={score} gameOver={gameOver} />
          {gameOver && (
            <GameOver
              createNewGame={this.createNewGame}
              gridSize={newGridSize}
              setXSize={(x: number) => this.setState({ newGridSize: [x, newGridSize[1]] })}
              setYSize={(y: number) => this.setState({ newGridSize: [newGridSize[0], y] })}
              speed={speed}
              setSpeed={(newSpeed: number) => this.setState({ speed: newSpeed })}
            />
          )}
          <Game gridSize={gridSize} location={location} fruits={fruits} />
        </div>
      </div>
    );
  }
}

export default App;
