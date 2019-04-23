import { connect } from "react-redux";
import MainComponent from "./MainComponent";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const MainContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "games"
    }
  ])
)(MainComponent);

export default MainContainer;
