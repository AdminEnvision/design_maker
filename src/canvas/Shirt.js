import React from "react";
import * as THREE from "three";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture, OrbitControls } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt.glb");

  const logoTexture = useTexture(snap.frontLogoDecal);
  logoTexture.anisotropy = 16;
  const fullTexture = useTexture(snap.fullDecal);
  const backLogoTexture = useTexture(snap.backLogoDecal);
  backLogoTexture.anisotropy = 16;

  useFrame((_, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(snap);

  const createTextTexture = (text, font, size, color) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = `${size}px ${font}`;
    const textWidth = ctx.measureText(text).width;
    canvas.width = textWidth;
    canvas.height = size;
    ctx.fillStyle = color;
    ctx.font = `${size}px ${font}`;
    ctx.fillText(text, 0, size);
    return new THREE.CanvasTexture(canvas);
  };
  const createTextTexture1 = (text, font, size, color) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = `${size}px ${font}`;
    const textWidth = ctx.measureText(text).width;
    canvas.width = textWidth;
    canvas.height = size;
    ctx.fillStyle = color;
    ctx.font = `${size}px ${font}`;
    ctx.fillText(text, 0, size);
    return new THREE.CanvasTexture(canvas);
  };
  // const createTextTexture = (text, font, size, color) => {
  //   //...
  //   ctx.font = `${size}px ${font}`;
  //   //...
  // };

  return (
    <>
      <OrbitControls />
      <group key={stateString}>
        <mesh
          geometry={nodes.T_Shirt_male.geometry}
          material={materials.lambert1}
          // material-roughness={0}
          material-metalness={0.1}
          dispose={null}
        >
          {snap.isFullTexture && (
            <Decal
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              map={fullTexture}
              depthTest={false}
              depthWrite={true}
            />
          )}

          {snap.isFrontLogoTexture && (
            <Decal
              position={snap.frontLogoPosition}
              rotation={[0, 0, 0]}
              scale={snap.frontLogoScale}
              map={logoTexture}
              depthTest={false}
              depthWrite={true}
            />
          )}
          {state.isFrontText && (
            <Decal
              position={state.frontTextPosition}
              rotation={state.frontTextRotation}
              scale={state.frontTextScale}
              map={createTextTexture(
                state.frontText,
                state.frontTextFont,
                state.frontTextSize, // Use global state value
                state.frontTextColor
              )}
            />
          )}

          {state.isFrontText1 && (
            <Decal
              position={state.frontTextPosition1}
              rotation={state.frontTextRotation1}
              scale={state.frontTextScale1}
              map={createTextTexture(
                state.frontText1,
                state.frontTextFont1,
                state.frontTextSize1, // Use global state value
                state.frontTextColor1
              )}
            />
          )}

          {snap.isBackLogoTexture && (
            <Decal
              position={snap.backLogoPosition}
              rotation={snap.backLogoRotation}
              scale={snap.backLogoScale}
              map={backLogoTexture}
              depthTest={false}
              depthWrite={true}
            />
          )}

          {/* <Decal
            //...
            map={createTextTexture(
              state.frontText,
              state.frontTextFont,
              state.frontTextSize, // Use global state value
              state.frontTextColor
            )}
          /> */}
          {snap.isBackText && (
            <Decal
              position={snap.backTextPosition}
              rotation={snap.backTextRotation}
              scale={snap.backTextScale}
              map={createTextTexture(
                snap.backText,
                snap.backTextFont,
                snap.backTextSize,
                snap.backTextColor
              )}
            />
          )}
          
          
        </mesh>
      </group>
    </>
  );
};

export default Shirt;
