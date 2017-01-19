// @flow
import React from 'react';

import Col from 'react-bootstrap/lib/Col';

type Props = {
  icon: string,
  md?: number,
  sm?: number,
  children?: React.Element<*>,
}

const IconBox = ({ icon, children, md, sm }: Props) => (
  <Col md={md || 6} sm={sm || 6} className="hon_icon_box">
    <i className={`ti ti-${icon}`}/>
    <div className="hon_icon_box_content">
      {children}
    </div>
  </Col>
);

export default IconBox;
