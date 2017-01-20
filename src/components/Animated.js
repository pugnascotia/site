// @flow
import React from 'react';
import Waypoint from 'react-waypoint';

type Props = {
  children?: React.Element<*>
};

type State = {
  active: boolean
}

/**
 * This elaborate-looking class simple toggles an 'active' class on a
 * parent <div> when an element becomes visible. It also transmits a
 * custom CSS transition-delay property to all children, under the
 * key 'delay'.
 */
class Animated extends React.Component {
  state: State;

  constructor(props : Props) {
    super(props);
    this.state = { active: false };
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.handleWaypointLeave = this.handleWaypointLeave.bind(this);
  }

  handleWaypointEnter() {
    this.setState({ active: true });
  }

  handleWaypointLeave() {
    this.setState({ active: false });
  }

  renderChildren(children) {
    let index = 0;
    return React.Children.map(children, child =>
      React.cloneElement(child, {
        delay: `0.${ index++ }s`
      })
    );
  }

  render() {
    return (
      <div className={this.state.active ? 'active' : 'noactive'}>
        <Waypoint
          onEnter={this.handleWaypointEnter}
          onLeave={this.handleWaypointLeave}
        />
        {this.renderChildren(this.props.children)}
      </div>
    );
  }
}

export default Animated;
