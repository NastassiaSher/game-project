import React, {Component} from "react";
import {BrowserRouter, Redirect, Route, Switch, Link} from "react-router-dom";
import { Button, Comment, Form, Header, Feed, Card, Grid, Icon,Label, List, Image, Divider, Segment, Transition, Modal} from 'semantic-ui-react';

const MenuGameComponent = (props) => {
const startGameClick = () => {

}
const users = props.users;

const images = {
	'VrXml3jJ5EYKsQmaF27EzomNqAt2': {'name':'Player2', 'image': 'https://semantic-ui.com/images/avatar2/large/molly.png', 'desc': 'Player2'},
	'jHzJZr3flsO5HUDVLeYHVaRaNen2': {'name':'Player1', 'image': 'https://semantic-ui.com/images/avatar2/large/matthew.png', 'desc': 'Player1'}
}

const onlineUsers = () => {
	let onlineUsers = props.users && props.userId &&  props.users.filter((user) => user.userId !== props.userId && user.status === 'loggedIn');
	return onlineUsers && onlineUsers.length > 0;
}
	return (
		<>
			"Menu Game"
			<br/>
      {props.userId && props.loginSuccess ? 
				<>
		<Grid>
    <Grid.Column floated='left' width={5}>
		<Card>
								<Image src={`${images[props.userId].image}`} />
								<Card.Content>
									<Card.Header>{`${images[props.userId].name}`}</Card.Header>
									<Card.Meta>
										<span className='date'>Joined in 2019</span>
									</Card.Meta>
									<Card.Description>{`${images[props.userId].desc}`}</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<a>
										<Icon name='game' />
										22 Wins
									</a>
								</Card.Content>
							</Card>
    </Grid.Column>
		
		<Grid.Column textAlign='center' verticalAlign='middle' width={5}> 
    <Button color='green' loading={!onlineUsers()} circular onClick={props.initGame(props.history)} >Start Game</Button>
		</Grid.Column>

    <Grid.Column floated='right' width={5}>
			{props.users && props.userId &&  users.filter((user) => user.userId !== props.userId).map((user) => {
				return (
					<>
					<Card floated='right'>
								<Image src={user.image} label={{ as: 'a', corner: 'right', icon: 'wifi', color: `${user.status === 'loggedIn' ? 'green' : 'red'}` }} />
								<Card.Content>
									<Card.Header>{user.name}</Card.Header>
									<Card.Meta>
										<span className='date'>Joined in 2019</span>
									</Card.Meta>
									<Card.Description>{user.desc}</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<a>
										<Icon name='game' />
										10 Wins
									</a>
								</Card.Content>
							
								<Transition animation={'jiggle'} duration={2000} visible={user.gameId ? true : false}>
								<Card.Content extra>
										<Button fluid icon='play' disabled={user.gameId ? false : true} onClick={() => props.acceptGame(props.history)(user.gameId)} content='Play' color={`${user.gameId ? 'pink' : null}`}/>
										</Card.Content>
										</Transition> 
							</Card>
							</>
				);
			 }
			)
			}

    </Grid.Column>
  </Grid>
	<br/>

				</> :  <Redirect to="/login"/>}
				</>
							)
}

export default MenuGameComponent;
