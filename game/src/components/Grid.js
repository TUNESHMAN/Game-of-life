import React, { Component } from "react";
import Box from "./Box.js";
import "../index.css"

export class Grid extends Component {
  render() {
    const width = this.props.cols * 14;
    var rowsArr = [];
    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        // I am checking a specific location in the grid to see if true or false. True means on, false means off
        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        // I push some boxes into the array
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }
    return (
      <div className="grid" style={{ width: width }}>
        {rowsArr}
      </div>
    );
  }
}

export default Grid;
