import React, { useEffect, useRef, useState } from "react";
import "./Display.css";
import "../index.css";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
// import {download} from './assets';
import LogoControls from "../canvas/LogoControls";
import TextControls from "../canvas/TextControls";
import state from "../store";
import { downloadCanvasToImage, reader } from "../config/helpers";
import {
  EditorTabs,
  FilterTabs,
  DecalTypes,
  texturesLogos,
} from "../config/constants";
import { slideAnimation } from "../config/motion";
import { ColorPicker, FilePicker, TextureLogoPicker, Tab } from "../components";
import Canvas from "../canvas";

function Display({ display, imageDisplay, text1, radius }) {
  const canvasRef = useRef(null);
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    frontLogoShirt: true,
    backLogoShirt: true,
    frontTextShirt: true,
    backTextShirt: true,
    stylishShirt: false,
  });

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  const handleTextureLogoClick = (textureLogo) => {
    // update the state with the selected texture or logo
    if (textureLogo.type === "texture") {
      // update the state with the selected texture
      state.fullDecal = textureLogo.image;
    } else if (textureLogo.type === "frontLogo") {
      // update the state with the selected logo
      state.frontLogoDecal = textureLogo.image;
    } else if (textureLogo.type === "backLogo") {
      // update the state with the selected logo
      state.backLogoDecal = textureLogo.image;
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "frontLogoShirt":
        state.isFrontLogoTexture = !activeFilterTab[tabName];
        break;
      case "backLogoShirt":
        state.isBackLogoTexture = !activeFilterTab[tabName];
        break;
      case "frontTextShirt":
        state.isFrontText = !activeFilterTab[tabName];
        break;
      case "backTextShirt":
        state.isBackText = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      case "downloadShirt":
        downloadCanvasToImage();
        break;
      default:
        state.isFrontLogoTexture = true;
        state.isBackLogoTexture = true;
        state.isFrontText = true;
        state.isBackText = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "logocontrols":
        return <LogoControls />;
      case "textcontrols":
        return <TextControls />;
      case "texturelogopicker":
        return (
          <TextureLogoPicker
            texturesLogos={texturesLogos}
            handleTextureLogoClick={handleTextureLogoClick}
          />
        );
      default:
        return null;
    }
  };
  // bend

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");

  //   // Clear the canvas
  //   context.clearRect(0, 0, canvas.width, canvas.height);

  //   // Draw the T-shirt
  //   // ...

  //   // Draw the circular text
  //   utils(context, text1, canvas.width / 2, canvas.height / 2, radius);
  // }, [text1, radius]);

  // // console.log(textformat);
  // console.log(display.textcolor);
  return (
    <AnimatePresence>
      <div className="">
        <div className="card card-content relative+">
          <div className="imgTshirt text-center">
            {/* <img
              className="img-responsive"
              src={`./images/${display.tshirtColors}.png`}
              alt="img-Tshirt"
            /> */}
            <Canvas />
          </div>
          <div className="meme-Text text-center">
            {/* <div className="upperText">
              <p style={{ fontSize: textformat, color: display.textcolor }}>
                {" "}
                {display.upperText}
              </p>
            </div> */}
            {/* <img
              src={imageDisplay ? imageDisplay : "./images/ima.png"}
              alt="meme-text"
            /> */}
            {/* <div className="lowerText">
              <p style={{ fontSize: textformat, color: display.textcolor }}>
                {" "}
                {display.lowerText}
              </p>
            </div> */}
          </div>
          <div>
            <canvas ref={canvasRef} />
            {/* ... */}
          </div>
          <div>
            {
              <>
                <motion.div
                  key="custom"
                  className="absolute top-0 left-0 z-10"
                  {...slideAnimation("left")}
                >
                  <div className="flex items-center min-h-screen">
                    <div className="editortabs-container tabs">
                      {EditorTabs.map((tab) => (
                        <Tab
                          key={tab.name}
                          tab={tab}
                          handleClick={() => setActiveEditorTab(tab.name)}
                        />
                      ))}

                      {generateTabContent()}
                    </div>
                  </div>
                </motion.div>
                {/* <motion.div
              className="absolute z-10 top-5 right-5"
              {...fadeAnimation}
            >
              <CustomButton
                type="filled"
                title="Go Back"
                handleClick={() => (state.intro = true)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div> */}

                <motion.div
                  className="filtertabs-container col-6"
                  {...slideAnimation("up")}
                >
                  {FilterTabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      isFilterTab
                      isActiveTab={activeFilterTab[tab.name]}
                      handleClick={() => handleActiveFilterTab(tab.name)}
                    />
                  ))}
                </motion.div>
              </>
            }
          </div>
        </div>
      </div>
      {/* <Display radius={radius} /> */}
    </AnimatePresence>
  );
}

export default Display;
