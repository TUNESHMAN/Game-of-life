import React, { Component } from "react";
import Grid from "./Grid";
// import "../index.css"
import "./Game.css"

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
  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
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
