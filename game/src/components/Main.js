import React, { Component } from "react";
import Grid from "./Grid";

export class Main extends Component {
  constructor() {
    super();
    // These are not in the state because I will have to make reference to them in the state
    this.speed = 100; //How fats the game will run
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

export default Main;
