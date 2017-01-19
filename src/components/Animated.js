// @flow
import React from 'react';

const Animated = ({ children }) => (
  <div data-animation="animation_blocks" data-bottom="@class:noactive" data--100-bottom="@class:active">
    {children}
  </div>
);

export default Animated;
