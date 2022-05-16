import React, { useState } from "react";
import * as go from "gojs";
import { ReactDiagram, ReactPalette } from "gojs-react";

import "../App.css";

const $ = go.GraphObject.make;

function Palatte() {
  const shapes = [
    "Square",
    "Circle",
    "Triangle",
    "Diamond",
    "LineH",
    "LineV",
    "PlusLine",
    "XLine",
  ];
  const [nodes] = useState([]);

  function initDiagram() {
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true,
      model: $(go.GraphLinksModel, {
        linkKeyProperty: "key",
      }),
    });

    diagram.nodeTemplate = $(
      go.Part,
      go.Panel.Spot,
      {
        desiredSize: new go.Size(50, 50),
        fromLinkable: true,
        toLinkable: true,
        cursor: "pointer",
      },
      $(
        go.Shape,
        { fill: "white", strokeWidth: 5 },
        new go.Binding("figure", "shape"),
        new go.Binding("stroke", "color")
      )
    );

    return diagram;
  }

  function initMyPalette() {
    var myPalette = $(go.Palette);

    // the Palette's node template is different from the main Diagram's
    myPalette.nodeTemplate = $(
      go.Node,
      "Vertical",
      $(
        go.Panel,
        $(
          go.Shape,
          { width: 30, height: 30, margin: 10 },
          new go.Binding("fill", "color"),
          new go.Binding("figure", "shape")
        ),
        $(
          go.Panel,
          "Horizontal",

          $(
            go.TextBlock,
            {
              alignmentFocus: go.Spot.BottomCenter,
              alignment: go.Spot.BottomCenter,
            },
            new go.Binding("text", "shape")
          )
        )
      )
    );
    return myPalette;
    // the list of data to show in the Palette
  }

  function handleModelChange(changes) {
    // alert('GoJS model changed!');
  }
  return (
    <div className="gojs-wrapper-div">
      <ReactPalette
        initPalette={initMyPalette}
        divClassName="palette-component"
        nodeDataArray={[
          { key: "T", color: "turquoise" },
          { key: "RB", color: "royalblue" },
          { key: "MB", color: "midnightblue" },
          { key: "SB", color: "skyblue" },
          { key: "G", color: "green" },
          { key: "O", color: "orange" },
          { key: "Y", color: "yellow" },
          { key: "R", color: "red" },
        ].map((d, i) => ({ ...d, shape: shapes[i] }))}
      />
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="palette-daiagram-component"
        nodeDataArray={nodes}
        onModelChange={handleModelChange}
        skipsDiagramUpdate
      />
    </div>
  );
}

export default Palatte;
