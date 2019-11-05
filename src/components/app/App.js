import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cookies from "universal-cookie/cjs";

import './App.css';
import LoginForm from "../loginForm/loginForm";
import Main from "../main/main";
import PrivateRoute from "../helpers/privateRoute";


export default class App  extends Component {
	constructor(props) {
		super();
		
		const cookies = new Cookies();
		
		this.state = {
			isAuthorized: !!cookies.get('access_token')
		};
		
		this.authenticate = (username, password, rememberMe, validationForm, cb) => {
			const url = 'http://authapi/api/oauth/token';
			const data = {
				"client_id": 2,
				"client_secret": "IXzrUQh0Sa7HGbRdjJXdLzFtj8YWwQyZjhrMuVPd",
				"grant_type": "password",
				"password": password,
				"username": username
			};
			const options = {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(data)
			};
			
			fetch(url, options)
				.then(response => {
					if(response.ok) {
						this.setState({
								isAuthorized: true
							}
						);
						
						setTimeout(cb, 100);
						
						return response.json();
						
					} else {
						validationForm('Incorrect Username or Password');
					}
				})
				.then(data => {
					if(rememberMe) {
						cookies.set('access_token', data.access_token, {
							maxAge: data.expires_in
						});
					}
				})
				.catch(error => {
					return error;
				});
		};
		
	}
	
	render() {
		return (
			<div className="App">
				<Router>
					<Route exact path='/login'
						   render={(props) => <LoginForm authenticate={this.authenticate} />}
					></Route>
					
					<PrivateRoute component={Main} isAuthorized={this.state.isAuthorized} exact path='/'></PrivateRoute>
				</Router>
			</div>
		);
	}
}


