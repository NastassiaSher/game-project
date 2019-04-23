import React, {Component} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
// import NavBarContainer from "./common/layout/navbar/NavBarContainer";
// import Footer from "./common/layout/footer/Footer";
import {Container} from "semantic-ui-react";
import MainContainer from "./pages/main-page/MainContainer";
// import SubmitWishMainContainer from "./submit-wish-page/SubmitWishMainContainer";
// import SignUpMainContainer from "./signup-page/SignUpMainContainer";
// import AboutComponent from "./common/about/AboutComponent";
// import WishDetailsMainContainer from "./wish-details-page/WishDetailsMainContainer";
// import AccountMainContainer from "./account-page/AccountMainContainer";

class App extends Component {
    render() {
        return (

                <div>
                    <Container style={{marginTop: "100px", minHeight: "85vh"}}>
                      <MainContainer />
                    </Container>
                </div>
        );
    }
}

export default App;