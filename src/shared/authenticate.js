import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class isNotLoggin extends Component {

    componentWillMount() {
      if(!this.props.isAuthenticated) {
        this.context.router.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.isAuthenticated) {
        this.context.router.push('/signin');
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props } />
      );
    }
  }

  isNotLoggin.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired
  }

  isNotLoggin.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.current_user.isAuthenticated
    }
  }

  return connect(mapStateToProps)(isNotLoggin);
}
