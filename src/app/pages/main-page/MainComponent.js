import React, {Component} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import { Button, Comment, Form, Header, Feed, Card, Grid, Icon,Label, List, Image, Divider, Segment} from 'semantic-ui-react';
import CompitStepComponent from '../../components/gamePlay/CompitStepComponent';
import MenuGameContainer from '../../components/gameMenu/MenuGameContainer';
import GamePlayContainer from '../../components/gamePlay/GamePlayContainer';
import LoginContainer from '../../components/login/LoginFormContainer';


export default class MainComponent extends Component {
	state ={}

	render() {
		return (
			<>
			<Card fluid>
    <Card.Content textAlign="center">
		<Card.Header>Win Game or Win Job</Card.Header>
    </Card.Content>
    <Card.Content>
		<BrowserRouter>
                        <Switch>
                            <Route exact path="/main" component={MenuGameContainer}/>
														<Route exact path="/login" component={LoginContainer}/>
														<Route exact path="/game/:id" component={GamePlayContainer}/>
														<Redirect to="/main"/>
                        </Switch>
            </BrowserRouter>
    </Card.Content>
    </Card>
		</>
		)
	}
}
