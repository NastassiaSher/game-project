import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import { Button, Comment, Form, Header, Feed, Card, Grid, Icon,Label, List, Image, Divider, Segment,Dimmer, Transition} from 'semantic-ui-react';
import CompitStepComponent from './CompitStepComponent';
import MyStepComponent from './MyStepComponent';

const GamePlayComponent = (props) => {
	const gameSteps = props.gameData && props.gameData.gameSteps || [];
	const userId = props.userId; 
	let result;
	return (
<>
{props.userId && props.loginSuccess ?
  <Dimmer.Dimmable as={Segment} dimmed={props.gameData.gameResult === 1}>
    <Card.Content>
						<List>
							{gameSteps && gameSteps.map((step) => {
								result = step.result
								if (userId !== step.who) {
									  return ( 
										<CompitStepComponent userId={userId} {...step} firstStep={step.firstStep} />
										);
									} else {
										return (
											<MyStepComponent userId={userId}  {...step} firstStep={step.firstStep} />
											);
									}
							   })
							}
						</List>
    </Card.Content>
		<br/>
		<Dimmer active={props.gameData.gameResult === 1} >
            <Header as='h2' icon inverted>
              <Icon name={userId !== props.gameData.userId ? 'thumbs down outline' : 'thumbs up outline'} />
              {userId !== props.gameData.userId ? 'You Loose' : 'You win'}
            </Header>
						<br/>
						<br/>
						<Button onClick={() => props.endGame(props.history)({acceptorId: props.gameData.acceptorId, initiatorId: props.gameData.initiatorId})} primary>Ausgang</Button>
          </Dimmer>

		<Card.Content extra>
			<Grid centered textAlign='center' columns={1}>
			<Grid.Column textAlign='center' >
						<Button circular  disabled={gameSteps[gameSteps.length-1].who === userId || (props.gameData.gameResult - 1) % 3 !== 0} onClick={() => props.updateGame(-1)({gameId: props.gameId, who: userId, number: result})} color='blue'>-1</Button>
						<Button circular disabled={gameSteps[gameSteps.length-1].who === userId || props.gameData.gameResult % 3 !== 0} onClick={() => props.updateGame(0)({gameId: props.gameId, who: userId, number: result})} color='blue'>0</Button>
						<Button circular disabled={gameSteps[gameSteps.length-1].who === userId || (props.gameData.gameResult + 1) % 3 !== 0} onClick={() => props.updateGame(1)({gameId: props.gameId, who: userId, number: result})} color='blue'>+1</Button>
				</Grid.Column>
				</Grid>
      </Card.Content>
			</Dimmer.Dimmable> : <Redirect to="/login"/> }
			</>

	)
}

export default GamePlayComponent;