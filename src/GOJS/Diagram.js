import React, { useContext, useEffect, useState } from "react";

import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

import "../App.css"; // contains .diagram-component CSS
import { UserDetailsContext } from "../context/UserDetailsContext";
import spinner from "../assets/spinner.png";
// ...

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */

// render function...
function Diagram() {
  const { userState, userDispatch } = useContext(UserDetailsContext);
  const [details, setdetails] = useState();

  function initDiagram() {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true, // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      layout: new go.TreeLayout(),
      contentAlignment: go.Spot.Center, // !To Set diagram in center after adding childrens
      ChangedSelection: (e) => {
        console.log(Object.values(e.subject.Ib).map((d) => d.value.data)); // *for getting selected nodes and edges
      },
      model: new go.GraphLinksModel({
        linkKeyProperty: "id",
        nodeKeyProperty: "id", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      }),
    });

    diagram.addDiagramListener("ViewportBoundsChanged", () =>
      spinDuring(diagram, "mySpinner", load)
    );
    // diagram.delayInitialization((diagram) =>
    //   spinDuring(diagram, "mySpinner", load)
    // );

    function spinDuring(diagram, spinner, compute) {
      // where compute is a function of zero args
      // show the animated spinner
      if (typeof spinner === "string")
        spinner = document.getElementById(spinner);
      if (spinner) {
        //? position it in the middle of the viewport DIV
        //? const x =
        //?  Math.floor(diagram.div.offsetWidth / 2 - spinner.naturalWidth / 2) +
        //?  200;
        //?const y =
        //?  Math.floor(diagram.div.offsetHeight / 2 - spinner.naturalHeight / 2) +
        //?  90;
        const x = 120,
          y = 12;
        spinner.style.left = x + "px";
        spinner.style.top = y + "px";
        spinner.style.display = "inline";
      }
      setTimeout(() => {
        try {
          compute(); // do the computation
        } finally {
          if (spinner) spinner.style.display = "none";
        }
      }, 20);
    }
    function load() {
      // create a lot of data for the myWholeModel
      const total = 999999;
      const treedata = [];
      for (let i = 0; i < total; i++) {
        const d = {
          key: i, // this node data's key
          color: go.Brush.randomColor(), // the node's color
          parent: i > 0 ? Math.floor((Math.random() * i) / 2) : undefined, // the random parent's key
        };
        //!!!???@@@ this needs to be customized to account for your chosen Node template
        d.bounds = new go.Rect(0, 0, 70, 20);
        treedata.push(d);
      }
      diagram.layoutDiagram(true);
    }

    const nodeClick = (e, obj) => {
      if (obj.part.data.text !== "Patel Family") {
        fetch(`http://localhost:5000/api/user/${obj.part.data.id}`)
          .then((response) => response.json())
          .then((data) => {
            userDispatch({
              type: "Append",
              payload: {
                id: data?.details[0]?.id,
                children: data?.details[0]?.children,
              },
            });
            obj.part.data["isExpanded"] = !obj.part.data["isExpanded"]; // * This property will help to determine tree is expanded or not
          })
          .catch((err) => console.log(err));
      }
    };
    var nodeExpandAdornment = $(
      go.Adornment,
      "Spot",
      $(
        go.Panel,
        "Auto",
        // $(go.Shape, { stroke: "dodgerblue", strokeWidth: 1, fill: null }),
        $(go.Placeholder, { margin: new go.Margin(0, 5, 0, 0) })
      ),
      $(
        go.Panel,
        "Horizontal",
        {
          alignment: go.Spot.RightCenter,
          alignmentFocus: go.Spot.LeftCenter,
        },
        $(
          "Button",
          {
            desiredSize: new go.Size(15, 15),
            click: nodeClick,
          },
          new go.Binding(
            "ButtonBorder.figure",
            "",
            (e, obj) => "TriangleRight"
          ),
          new go.Binding("ButtonBorder.fill", "", () => "white"),
          new go.Binding("ButtonBorder.stroke", "", () => "black")
        )
      )
    );
    var nodeCollapseAdornment = $(
      go.Adornment,
      "Spot",
      $(
        go.Panel,
        "Auto",
        // $(go.Shape, { stroke: "dodgerblue", strokeWidth: 1, fill: null }),
        $(go.Placeholder, { margin: new go.Margin(0, 5, 0, 0) })
      ),
      $(
        go.Panel,
        "Horizontal",
        {
          alignment: go.Spot.RightCenter,
          alignmentFocus: go.Spot.LeftCenter,
        },
        $(
          "Button",
          {
            desiredSize: new go.Size(15, 15),
            click: nodeClick,
          },
          new go.Binding("ButtonBorder.figure", "", (e, obj) => "TriangleLeft"),
          new go.Binding("ButtonBorder.fill", "", () => "white"),
          new go.Binding("ButtonBorder.stroke", "", () => "black")
        )
      )
    );

    // define a simple Node template
    diagram.nodeTemplate = $(
      go.Node,
      "Auto", // the Shape will go around the TextBlock
      $(
        go.Shape,
        "RoundedRectangle",
        { name: "SHAPE", fill: "white", strokeWidth: 1 }
        // Shape.fill is bound to Node.data.color
        // new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        { margin: 8, editable: false }, // some room around the text
        new go.Binding("text")
      ),
      {
        mouseOver: (e, obj) => {
          let node = obj.part;
          if ([1, 2, 3].includes(obj.part.data.id)) {
            if (!obj.part.data["isExpanded"]) {
              // ?To change adornmnet between Right Triangle and Left Triangle on fetching of data.
              nodeExpandAdornment.adornedObject = node;
              node.addAdornment("mouseOver", nodeExpandAdornment);
            } else {
              nodeCollapseAdornment.adornedObject = node;
              node.addAdornment("mouseOver", nodeCollapseAdornment);
            }
          }
        },
        copyable: false,
        deletable: false,
      }
    );
    diagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.Orthogonal },
      $(go.Shape),
      $(go.Shape, { toArrow: "Standard" })
    );
    return diagram;
  }
  /**
   * This function handles any changes to the GoJS model.
   * It is here that you would make any updates to your React state, which is dicussed below.
   */
  function handleModelChange(changes) {
    // initDiagram();
  }
  useEffect(() => {
    const getDetails = () => {
      fetch("http://localhost:5000/api/user/initial")
        .then((response) => response.json())
        .then((data) => {
          setdetails(data?.details);
          userDispatch({ type: "Add", payload: data?.details });
        })
        .catch((err) => console.log(err));
    };
    getDetails();
  }, [userDispatch]);
  useEffect(() => () => initDiagram(), [userState, userDispatch]);
  return (
    <>
      {details && userState && (
        <>
          <img
            id="mySpinner"
            src={spinner}
            style={{
              // marginLeft: "15rem",
              // marginTop: "15vh",
              display: "none",
              height: "10rem",
              width: "10rem",
            }}
          />
          <ReactDiagram
            initDiagram={initDiagram}
            divClassName="diagram-component"
            nodeDataArray={userState.details.nodeDataArr}
            linkDataArray={userState.details.linkDataArr}
            onModelChange={handleModelChange}
          />
        </>
      )}
    </>
  );
}
export default Diagram;
