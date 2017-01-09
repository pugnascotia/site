// @flow
import React from 'react';
import Col from 'react-bootstrap/lib/Col';

type Props = {
  name: string,
  value: boolean | number | string
}

const Metric = ({name, value}: Props) => (
  <Col md={3} sm={6} className="hon_icon_box">
    <div>
      <h4><strong className="hon_timer">{value}</strong> {name}</h4>
    </div>
  </Col>
);

export default Metric;
