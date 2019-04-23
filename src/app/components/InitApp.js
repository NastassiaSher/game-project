import React, {Component} from "react";
import { connect } from "react-redux";
import { authOperations } from "../apis/auth-api";

class InitApp extends Component {

  componentDidMount() {
    this.props.initApp();
  }
  render() {
    return this.props.initAppSuccess
      ? this.props.children
      : (<p>Loading...</p>);
  }
}

function mapStateToProps(state) {
  return {
    initAppSuccess: state.auth.initAppSuccess
  };
}

function mapDispatchToProps(dispatch) {
  const initApp = initAppData => {
    console.log("initAppDataContianer-> initAppData: ", initAppData);
    //dispatch(submitWishOperations.submitWishOperation(loginFormData));
    dispatch(authOperations.initAppOperation(initAppData));
  };

  return {
    initApp
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitApp);