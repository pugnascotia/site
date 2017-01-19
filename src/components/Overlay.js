// @flow
import React from 'react';

type Props = {
  r?: number,
  g?: number,
  b?: number,
  opacity?: number
};

const Overlay = ({ r = 255, g = 255, b = 255, opacity = 0.8} : Props) => (
  <div className="hon_over" style={{backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})`}}></div>
);

export default Overlay;
