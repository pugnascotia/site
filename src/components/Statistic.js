// @flow
import React from 'react';
import Col from 'react-bootstrap/lib/Col';

type Props = {
  name: string,
  icon: string,
  value: boolean | number | string
}

const Statistic = ({name, icon, value}: Props) => (
  <Col md={3} sm={6} className="hon_icon_box">
    <div className="hon_icon_box_content">
      <h4><strong className="hon_timer">{value}</strong> {name}</h4>
      <i className={'ti ti-' + icon} />
    </div>
  </Col>
);

export default Statistic;
