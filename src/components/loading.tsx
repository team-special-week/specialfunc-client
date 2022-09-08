import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

function Loading() {
  return (
    <div style={{
      position: "fixed",
      zIndex : "3",
      height : "100%",
      width : "100%",
      background: "rgb(255, 255, 255)",
    }}
    >
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          zIndex : "3",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FadeLoader
          color="rgb(30,41,59)"
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      </div>
    </div>
  );
}

export default Loading;