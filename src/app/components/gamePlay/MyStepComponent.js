import React, {Component} from "react";
import { Button, Comment, Form, Header, Feed, Card, Grid, Icon,Label, List, Image, Divider, Segment} from 'semantic-ui-react';
import { ninvoke } from "q";

const MyStepComponent = (props) => {
	const result = (props.selected + props.number)/3;

	const images = {
		'VrXml3jJ5EYKsQmaF27EzomNqAt2': {'name':'Player2', 'image': 'https://semantic-ui.com/images/avatar2/large/molly.png', 'desc': 'Player2'},
		'jHzJZr3flsO5HUDVLeYHVaRaNen2': {'name':'Player1', 'image': 'https://semantic-ui.com/images/avatar2/large/matthew.png', 'desc': 'Player1'}
	};

	return (
			<List.Item>
						<Segment raised>
								<div className="card">
								<div className="header left aligned">{images[props.who].name}</div>
								<img className="ui avatar image left floated" src={images[props.who].image} />
								<a className="ui green big circular label left floated">{props.selected}</a>
								<br/>
								<br/>
								<br/>
								<div  className="ui center aligned">
									{props.firstStep ? null : <>
										<div className="ui green label center aligned">{`[(${props.selected} + ${props.number}) / 3] = ${(props.selected+props.number)/3}`}</div>
										<br/>
										<div className="ui green label center aligned" style={{marginTop: "5px"}}>{result}</div> </> 
									}
								</div>
							</div>
							</Segment>
				</List.Item>
	)
}

export default MyStepComponent;
