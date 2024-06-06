import React, { useState, useRef } from "react";
import { Editor, EditorState } from "draft-js"; // Replace with your preferred library
import state from "../store";
// import BendyText from 'react-bendy-text';
const Setting1 = () => {
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [text, setText] = useState("");
  const [textSize, setTextSize] = useState(100);
  const [font, setFont] = useState("Arial");
  const [radius, setRadius] = useState(100);
  const [text1, setText1] = useState("Circular Text");

  const handleTextChange = (newEditorState, event) => {
    if (newEditorState instanceof EditorState) {
      setEditorState1(newEditorState); // Update editorState
      setText(newEditorState.getCurrentContent().getPlainText());
    } else {
      console.error("newEditorState is not an instance of EditorState");
    }
    setText1(event.target.value);
    state.frontText1 = event.target.value; // Update the text in the global state
  };
  // const handleText1Change = (event) => {
  //   setText1(event.target.value);
  //   state.frontText1 = event.target.value;
  //   state.frontTextSize1 = radius; // assuming radius is the text size
  // };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  const handleUpperText1 = (value) => {
    setText1(value);
    state.frontText1 = value; // Update the text in the global state
  };
  const [rangeValue, setRangeValue] = useState(0); // Define rangeValue
  const prevRangeValue = useRef(); // Initialize prevRangeValue with useRef()

  const handleRangeChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (prevRangeValue.current && newValue > prevRangeValue.current) {
      state.frontTextScale[0] = state.frontTextScale[0] + 0.01;
      state.frontTextScale[1] = state.frontTextScale[1] + 0.01;
    } else if (prevRangeValue.current && newValue < prevRangeValue.current) {
      state.frontTextScale[0] = state.frontTextScale[0] - 0.01;
      state.frontTextScale[1] = state.frontTextScale[1] - 0.01;
    }
    setRangeValue(newValue);
    prevRangeValue.current = newValue; // Update prevRangeValue.current with the new value
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    let angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    let start = polarToCartesian(x, y, radius, endAngle);
    let end = polarToCartesian(x, y, radius, startAngle);

    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    let d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");

    return d;
  };

  const handleTextSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setTextSize(newSize);
    state.frontTextSize = newSize; // Update global state
    state.frontTextScale = [newSize / 100, newSize / 100, 0.1]; // Update scale based on new size
  };

  const handleFontChange = (event) => {
    setFont(event.target.value);
  };

  // const handleUpperText1 = (event) => {
  //   setText1(event.target.value);
  // };

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className="tshirt-container">
      <div className="controls">
        <input
          type="range"
          min="0"
          max="500"
          value={radius}
          onChange={handleRadiusChange}
        />
        {/* <h1>range</h1> */}
        <input
          type="text"
          value={text1}
          onChange={(e) => {
            handleUpperText1(e.target.value);
            state.frontText1 = e.target.value; // Update the state object
            state.isFrontText1 = true;
            state.backText1 = e.target.value; // Update the state object
            // state.isBackText1 = true;
          }}
        />
        
     

        {/* <svg>
          <path id="curvePath" d={`M0 100 Q 100 ${radius} 200 100`} />
          <text>
            <textPath href="#curvePath">{text1}</textPath>
          </text>
        </svg> */}
        {/* <svg width="400" height="400">
          <path
            id="arc1"
            d={describeArc(200, 200, radius, 0, 360)}
            fill="transparent"
          /> */}
        {/* <text fontSize={textSize} fontFamily={font}>
            <textPath href="#arc1" startOffset="0%">
              {text1}
            </textPath>
          </text>
        </svg> */}

        <Editor editorState={editorState} onChange={handleTextChange} />
        <br />
        <label htmlFor="textSize">Text Size: </label>
        <input
          type="number"
          id="textSize"
          value={textSize}
          onChange={handleTextSizeChange}
        />
        <br />

        <label htmlFor="font">Font: </label>
        <select value={font} onChange={handleFontChange}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier">Courier</option>
        </select>
      </div>
    </div>
  );
};

export default Setting1;
