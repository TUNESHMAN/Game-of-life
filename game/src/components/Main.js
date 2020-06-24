import React, { Component } from "react";
import Grid from "./Grid"

export class Main extends Component {
  constructor() {
    super();
    this.state = {
      generation: 0,
    };
  }
  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        {/* I created a grid */}
        <Grid />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

export default Main;
