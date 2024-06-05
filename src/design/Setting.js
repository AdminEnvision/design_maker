import React, { useRef, useState } from "react";
const urlImgbase = "./images/";
import state from "../store"; // Adjust the path according to your project structure

function Setting({
  handleTshirtColor,
  handleUpperText,
  handleLowerText,
  upoadImage,
  handleChange,
  handlesize,
  colortext,
  saveDesign,
}) {
  const colors = (color) => {
    handleTshirtColor(color);
  };
  const [rangeValue, setRangeValue] = useState(0);
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileDataUrl = reader.result;
      state.frontLogoDecal = fileDataUrl; // store the data URL in the state
      state.isFrontLogoTexture = true; // set to true when a file is selected
      state.backLogoDecal = fileDataUrl; // store the same data URL in the state
      state.isBackLogoTexture = true; // set to true when a file is selected
    };
    reader.readAsDataURL(file);
  };
  const prevRangeValue = useRef(rangeValue);

  const handleRangeChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (newValue > prevRangeValue.current) {
      state.frontTextScale[0] = state.frontTextScale[0] + 0.01;
      state.frontTextScale[1] = state.frontTextScale[1] + 0.01;
    } else if (newValue < prevRangeValue.current) {
      state.frontTextScale[0] = state.frontTextScale[0] - 0.01;
      state.frontTextScale[1] = state.frontTextScale[1] - 0.01;
    }
    prevRangeValue.current = newValue;
    setRangeValue(newValue);
  };
  return (
    <div>
      <div className="card bg-light container">
        <h3 className="text-center">Setting</h3>
        <h4>Change T-shirt color</h4>
        <div className="Tshirt-color">
          <img
            onClick={() => colors("white")}
            src={`${urlImgbase}white.png`}
            alt="white-tshirt"
            id="white"
          />
          <img
            onClick={() => colors("black")}
            src={`${urlImgbase}black.png`}
            alt="black-tshirt"
            id="black"
          />
          <img
            onClick={() => colors("gray")}
            src={`${urlImgbase}gray.png`}
            alt="grey-tshirt"
            id="grey"
          />
          <img
            onClick={() => colors("blue")}
            src={`${urlImgbase}blue.png`}
            alt="blue-tshirt"
            id="blue"
          />
          <img
            onClick={() => colors("red")}
            src={`${urlImgbase}red.png`}
            alt="red-tshirt"
            id="red"
          />
        </div>
        <hr />
        <h4>Meme Text</h4>
        <input
          onChange={(e) => {
            handleUpperText(e.target.value);
            state.frontText = e.target.value; // Update the state object
            state.isFrontText = true;
            state.backText = e.target.value; // Update the state object
            state.isBackText = true;
          }}
          type="text"
          className="form-control form-control-sm mb-2"
          placeholder="upper text"
        />
        <input
          onChange={(e) => handleLowerText(e.target.value)}
          type="text"
          className="form-control form-control-sm"
          placeholder="lower text"
        />
        <hr />
        <h4>upload image</h4>
        <div className="form-group">
          <input
            onChange={handleChangeFile}
            type="file"
            className="form-control-file mb-2"
            placeholder="upper text"
          />
        </div>
        <hr />
        <h4>Text size</h4>
        <input
          onChange={handleRangeChange}
          type="range"
          min={0}
          max={100}
          value={rangeValue}
        />

        <hr />
        <h4>Text Color</h4>
        <select
          onChange={(e) => {
            colortext(e.target.value);
            state.frontTextColor = e.target.value;
            state.backTextColor = e.target.value;
          }}
          className="form-control form-control-sm mb-2"
        >
          <option>white</option>
          <option>black</option>
          <option>red</option>
          <option>blue</option>
        </select>
        <hr />
        <button
          className="btn btn-primary"
          id="saveDesign"
          onClick={saveDesign}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Setting;
