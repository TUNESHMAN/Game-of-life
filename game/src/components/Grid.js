import React, { Component } from "react";

export class Grid extends Component {
  constructor() {
    super();
    const width = this.props.cols * 14;
    var rowsArray = [];
    var boxClass = "";
    for (var i = 0; i < this.props.cols.length; i++) {
      for (var j = 0; j < this.props.cols.length; j++) {
        let boxId = i + "_" + j;
        // I am checking a specific location in the grid to see if true or false. True means on, false means off
        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowsArray.push(
          <Box boxClass={boxClass} key={boxId} boxId={boxId} row={i} col={j} />
        );
      }
    }
  }
  render() {
    return (
      <div className="grid" style={{ width: width }}>
        {{ rowsArray }}
      </div>
    );
  }
}

export default Grid;
