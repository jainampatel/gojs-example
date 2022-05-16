import React from "react";
import * as go from "gojs";
import { ReactDiagram, ReactOverview } from "gojs-react";
import "./Overview.css";
const Overview = () => {
  var nodeDataArray = [];
  var j = 0;
  const shapes = [
    "RoundedRectangle",
    "TriangleRight",
    "TriangleDown",
    "TriangleLeft",
    "TriangleUp",
    "Square",
    "Circle",
    "Triangle",
    "Diamond",
  ];
  for (var i = 0; i < 1000; i++) {
    if (j === shapes.length - 1) {
      j = 0;
      nodeDataArray.push({ color: go.Brush.randomColor(), shape: shapes[j] });
    } else {
      nodeDataArray.push({ color: go.Brush.randomColor(), shape: shapes[j] });
      j++;
    }
  }
  const $ = go.GraphObject.make;
  var diagram = $(go.Diagram, {
    "undoManager.isEnabled": true,
  });
  const initDiagram = () => {
    diagram.nodeTemplate = $(
      go.Node,
      $(
        go.Panel,
        "Auto",
        { height: 100, width: 100 },
        $(
          go.Shape,
          new go.Binding("figure", "shape"),
          new go.Binding("fill", "color")
        ),
        $(
          go.TextBlock,
          //   { textAlign: "center" },
          new go.Binding("text", "color")
        )
      )
    );
    return diagram;
  };

  const initOverview = () => {
    var overView = $(go.Overview);
    return overView;
  };
  return (
    <div>
      <ReactOverview
        initOverview={initOverview}
        divClassName="overview-component"
        observedDiagram={diagram}
      />
      <ReactDiagram
        divClassName="diagram-component-overview"
        initDiagram={initDiagram}
        nodeDataArray={nodeDataArray}
      />
    </div>
  );
};

export default Overview;
