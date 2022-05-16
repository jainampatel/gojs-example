import React from "react";
import { Rnd } from "react-rnd";

const RNDDemo = () => {
  return (
    <div style={{ width: "50%", height: "90vh", background: "gray" }}>
      <Rnd
        className="bg-white rounded-xl shadow-md  justify-center px-5 py-5 items-center flex"
        default={{
          x: 0,
          y: 0,
          height: 300,
          width: 420,
        }}
        minHeight={100}
        minWidth={100}
        bounds="parent"
      >
        <div className="text-center">
          <p className=" text-slate-900 font-semibold text-2xl">Hello World</p>
        </div>
      </Rnd>
    </div>
  );
};

export default RNDDemo;
