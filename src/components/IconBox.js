// @flow
import React from 'react';

import Col from 'react-bootstrap/lib/Col';

type Props = {
  icon: string,
  md?: number,
  sm?: number,
  delay?: string,
  children?: React.Element<*>,
}

const IconBox = ({ icon, children, md, sm, delay = '0s' }: Props) => (
  <Col style={{ transitionDelay: delay }} md={md || 6} sm={sm || 6} className="hon_icon_box">
    <i className={`ti ti-${icon}`}/>
    <div className="hon_icon_box_content">
      {children}
    </div>
  </Col>
);

export default IconBox;
