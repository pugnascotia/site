// @flow
import React from 'react';

/**
 * A higher-order component that, when rendered, positions the browser
 * window at the top of the page
 * @param WrappedComponent the component to wrap
 * @return {ScrollToTop} a React component
 */
export default function scrollToTop(WrappedComponent : ReactClass<{}>) : ReactClass<{}> {
  return class ScrollToTop extends React.Component {

    componentDidMount() {
      window.scrollTo(0, 0);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
