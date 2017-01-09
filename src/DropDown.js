// @flow
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

type Props = {
  label: string,
  children?: React.Element<*>,
}

type State = {
  visible: boolean
}

class DropDown extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { visible: false };
  }

  render() {
    const children = this.state.visible
      ? (<ul key="1">{this.props.children}</ul>)
      : null;

    const menu = (<ReactCSSTransitionGroup
      transitionName="hon_parent_anim"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
      transitionAppear={true}
      transitionAppearTimeout={300}
    >
      {children}
    </ReactCSSTransitionGroup>);

    return (
      <li
        className="hon_parent"
        onMouseEnter={() => this.setState({visible: true})}
        onMouseLeave={() => this.setState({visible: false})}
      ><a href="#">{this.props.label}</a>
        {menu}
      </li>
    );
  }
}

export default DropDown;
