import React, {Component} from "react";
import { Button, Comment, Form, Header, Feed, Card, Grid, Icon,Label, List, Image, Divider, Segment} from 'semantic-ui-react';

const CompitStepComponent = (props) => {
	const result = (props.selected + props.number)/3;

	const images = {
		'VrXml3jJ5EYKsQmaF27EzomNqAt2': {'name':'Player2', 'image': 'https://semantic-ui.com/images/avatar2/large/molly.png'},
		'jHzJZr3flsO5HUDVLeYHVaRaNen2': {'name':'Player1', 'image': 'https://semantic-ui.com/images/avatar2/large/matthew.png'}
	}

	return (
		<List.Item>
					<Segment raised>
							<div className="card">
							<div className="header right aligned">{images[props.who].name}</div>
							<img className="ui avatar image right floated" src={images[props.who].image} />
							<a className="ui pink big circular label right floated">{props.selected}</a>
							<br/>
							<br/>
							<br/>
							
							<div  className="ui center aligned">
									{props.firstStep ? null : <>
										<div className="ui pink label center aligned">{`[(${props.selected} + ${props.number}) / 3] = ${result}`}</div>
										<br/>
										<div className="ui pink label center aligned" style={{marginTop: "5px"}}>{result}</div> </> 
									}
								</div>
						</div>
				</Segment>
			</List.Item>
	)
};

export default CompitStepComponent;
