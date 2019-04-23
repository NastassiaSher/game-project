import { connect } from "react-redux";
import LoginFormComponent from "./LoginFormComponent";
import { authOperations } from "../../apis/auth-api";

const mapStateToProps = state => {
  return {
		loginError: state.auth.loginError,
		auth: state.firebase.auth,
		loginSuccess: state.auth.loginSuccess,
		userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  const login = (history) => loginFormData => {
    console.log("loginFormDataContainer-> loginFormData: ", loginFormData);
    //dispatch(submitWishOperations.submitWishOperation(loginFormData));
    dispatch(authOperations.loginOperation(history)(loginFormData));
  };

  return {
    login
  };
};

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);

export default LoginFormContainer;
