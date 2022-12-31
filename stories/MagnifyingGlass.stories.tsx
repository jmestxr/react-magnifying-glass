import React, { useState } from "react";
import { MagnifyingGlass } from "../src";

import "../src/components/magnifying-glass/magnifying-glass.css";

export default {
  title: "My Component/MagnifyingGlass",
  component: MagnifyingGlass,
};

export const Primary = () => {
  const [hover, setHover] = useState(false);

  return (
    <div>
      <div
        style={{
          backgroundColor: "#9ac1e3",
          height: "400px",
          width: "400px",
          padding: "50px",
          cursor: "none",
        }}
      >
        <MagnifyingGlass
          zoom={2}
          glassStyle={{
            border: "1px solid black",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
          }}
        />
        <h1>React Magnifying Glass</h1>
        <p style={{ fontSize: "10px", lineHeight: "1.6" }}>
          Hover over me to enlarge me! Hover over me to enlarge me! Hover over
          me to enlarge me! Hover over me to enlarge me! Hover over me to
          enlarge me! Hover over me to enlarge me! Hover over me to enlarge me!
          Hover over me to enlarge me! Hover over me to enlarge me! Hover over
          me to enlarge me! Hover over me to enlarge me! Hover over me to
          enlarge me! Hover over me to enlarge me! Hover over me to enlarge me!
          Hover over me to enlarge me! Hover over me to enlarge me! Hover over
          me to enlarge me! Hover over me to enlarge me! Hover over me to
          enlarge me! Hover over me to enlarge me!
        </p>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => alert("boop")}
          style={{
            backgroundColor: hover ? "pink" : "blue",
            height: "50px",
            width: "50px",
            borderRadius: "50%",
          }}
          className="test"
        ></div>
      </div>
    </div>
  );
};