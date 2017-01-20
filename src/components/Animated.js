// @flow
import React from 'react';

type Props = {
  children?: React.Element<*>
};

const Animated = ({ children } : Props) => (
  <div data-animation="animation_blocks" data-bottom="@class:noactive" data--100-bottom="@class:active">
    {children}
  </div>
);

export default Animated;
