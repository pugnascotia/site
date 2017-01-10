// @flow
import React from 'react';

type Props = {
  opacity: number
};

const Overlay = ({ opacity } : Props) => (
  <div className="hon_over" style={{backgroundColor: `rgba(255, 255, 255, ${opacity})`}}></div>
);

export default Overlay;
