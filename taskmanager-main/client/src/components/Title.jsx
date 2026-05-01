import clsx from "clsx";
import React from "react";

const Title = ({ title, className }) => {
  return (
    <h2
      className={clsx("text-3xl font-black capitalize text-slate-950", className)}
    >
      {title}
    </h2>
  );
};

export default Title;
