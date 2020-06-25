import React, { Component } from "react";
import Grid from "./Grid";
import "../index.css";
import Buttons from "./Buttons"

export class Main extends Component {
  constructor() {
    super();
    // These are not in the state because I will have to make reference to them in the state
    this.speed = 100; //How fast the game will run
    this.rows = 30; //The size of the rows
    this.cols = 50; //The size of the columns

    this.state = {
      generation: 0,
      // This is what the full grid will be like. It is a 2-dimensional, 50 by 30 grid with every element set to false or turned off
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
    };
  }
  selectBox = (row, col) => {
    //   Here is to update the state of the array depending on which element is selected in the array
    // Make a copy of the array
    let gridCopy = arrayClone(this.state.gridFull);
    // Find the exact square that was clicked
    gridCopy[row][col] = !gridCopy[row][col];
    // Update the state
    this.setState({
      gridFull: gridCopy,
    });
  };

  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    // I did this for loop to go over  every square of the grid to determine its on or off state
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // In the for loop, a decision is made to turn the square on or off. I achieved this by creating a random number between 0 and 4. If it equals 1,the square is set to true and it is turned ON
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
    });
  };

  playButton = () => {
    //   When a person presses the button, the aim is for them to start afresh
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  play = () => {
    // The reason for this is to check what the grid looks like before changing the square.
    let grid1 = this.state.gridFull;
    let grid2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // Initialize count as 0
        let count = 0;

        if (i > 0) if (grid1[i - 1][j]) count++;
        if (i > 0 && j > 0) if (grid1[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (grid1[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (grid1[i][j + 1]) count++;
        if (j > 0) if (grid1[i][j - 1]) count++;
        if (i < this.rows - 1) if (grid1[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (grid1[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1)
          if (grid1[i + 1][j + 1]) count++;
        if (grid1[i][j] && (count < 2 || count > 3)) grid2[i][j] = false;
        if (!grid1[i][j] && count === 3) grid2[i][j] = true;
      }
    }
    this.setState({
      gridFull: grid2,
      generation: this.state.generation + 1,
    });
  };
  //   This happens after loading
  componentDidMount() {
    this.seed();
    this.playButton();
  }
  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        {/* I created a grid and passed down the state variables as props */}
        <Grid
          rows={this.rows}
          cols={this.cols}
          gridFull={this.state.gridFull}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}
// I make a clone of the array by stringify and parse. I did this because it is a nested array and the slice method will not be appropriate
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default Main;
