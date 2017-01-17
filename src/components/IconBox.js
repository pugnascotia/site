// @flow
import React from 'react';

import Col from 'react-bootstrap/lib/Col';

type Props = {
  icon: string,
  children?: React.Element<*>,
}

const IconBox = ({icon, children}: Props) => (
  <Col md={6} sm={6} className="hon_icon_box">
    <i className={`ti ti-${icon}`} />
    <div className="hon_icon_box_content">
      {children}
    </div>
  </Col>
);

export default IconBox;
