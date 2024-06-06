import React, { useEffect, useState } from "react";
import Display from "../design/Display";
import Setting from "../design/Setting";
import { imageDb } from "../config/firebase";
// import {motion, AnimatePresence} from 'framer-motion'
// import {useSnapshot} from 'valtio'
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { v4 } from "uuid";
// import CanvasModel from "../canvas";
// import {saveDesign} from '../../store/reducers/action/saveDesignAction'
// import { connect } from 'react-redux';

function Dashboard({ saveDesign }) {
  const writeData = async () => {
    const result = await addDoc(collection(firestore, "designs"), {
      textcolor: "red",
      upperText: "Foodie",
      lowerText: "Biryani",
    });
    console.log("Result", result);
  };

  const [images, setImages] = useState([]);
  const [tshirtColor, settShirtColor] = useState({
    tshirtColors: "black",
    upperText: "upper text",
    upperText1: "upper text",
    lowerText: "lower text",
    memeImg: "",
    url: "",
    textsize: 20,
    textcolor: "black",
  });

  let handleTshirtColor = (color) => {
    settShirtColor({ ...tshirtColor, tshirtColors: color });
  };

  let handleUpperText = (text) => {
    settShirtColor({ ...tshirtColor, upperText: text });
  };
  
  let handleTextChange = (text) => {
    settShirtColor({ ...tshirtColor, upperText: text });
  };

  let handleLowerText = (ltext) => {
    settShirtColor({ ...tshirtColor, lowerText: ltext });
  };

  const handleImageUpload = async (image) => {
    const imageRef = ref(imageDb, `images/${v4()}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    settShirtColor({ ...tshirtColor, memeImg: image, url: url });
    fetchImages(); // Fetch images again to get the latest image uploaded
  };

  const fetchImages = async () => {
    const storage = getStorage();
    const imagesRef = ref(storage, "images");

    try {
      const result = await listAll(imagesRef);
      const urls = await Promise.all(
        result.items.map((imageRef) => getDownloadURL(imageRef))
      );
      setImages(urls);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  let handletextsize = (size) => {
    settShirtColor({ ...tshirtColor, textsize: size });
  };
  let handletextcolor = (colorss) => {
    settShirtColor({ ...tshirtColor, textcolor: colorss });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageUploadChange = (image) => {
    handleImageUpload(image);
  };
  const formatText = () => {
    return parseInt(tshirtColor.textsize);
  };
  // const handleSaveDesign = (e) => {

  //     if(e.target.id ==='saveDesign'){
  //         saveDesign(tshirtColor);
  //         console.log('button clicked')
  //         writeData();
  //     }
  // }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <Display
            display={tshirtColor}
            imageDisplay={tshirtColor.url}
            textformat={formatText()}
          />
        </div>
        <div className="col-lg-4">
          <Setting
            handleTshirtColor={handleTshirtColor}
            handleUpperText={handleUpperText}
            handleTextChange={handleTextChange}
            handleLowerText={handleLowerText}
            uploadImage={handleImageUpload}
            handleChange={handleImageUploadChange}
            handlesize={handletextsize}
            colortext={handletextcolor}
            saveDesign={writeData}
          />
        </div>
      </div>
    </div>
  );
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         saveDesign:(design)=> dispatch(saveDesign(design))
//     }
// }

export default Dashboard;
