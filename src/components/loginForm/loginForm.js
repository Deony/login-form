import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './loginForm.css';


export default class LoginForm extends Component {
	constructor(props) {
		super();
		
		this.state = {
			redirectToReferrer: false,
			errorMessage: '',
			username: '',
			password: '',
			rememberMe: false
		};
		
		this.onUsernameChange = (e) => {
			this.setState({
				username: e.target.value,
				errorMessage: ''
			});
		};
		
		this.onPasswordChange = (e) => {
			this.setState({
				password: e.target.value,
				errorMessage: ''
			});
		};
		
		this.onRememberChange = (e) => {
			this.setState(( state ) => {
				return {
					rememberMe: !state.rememberMe
				}
			});
		};
		
		
		this.onLogin = (event) => {
			event.preventDefault();
			const { authenticate, errorMessage } = this.props;
			
			authenticate(
				this.state.username,
				this.state.password,
				this.state.rememberMe,
				(error) => {
					this.setState({
						errorMessage: error
					});
				},
				() =>
					this.setState({
						redirectToReferrer: true
					}
				)
			)
		};
	}
	
	render() {
		if (this.state.redirectToReferrer === true) {
			return <Redirect to='/' />
		}
		
		return (
			<form className="form" onSubmit={this.onLogin}>
				<div className="form-header">Login</div>
				
				<output className="error-message">{this.state.errorMessage}</output>
				
				<div className="form-group">
					<input type="text" name="username" placeholder='Username' value={this.state.username} onChange={this.onUsernameChange}/>
					<div className="focus-input"></div>
				</div>
				
				<div className="form-group">
					<input type="password" name="password" placeholder='Password' value={this.state.password} onChange={this.onPasswordChange}/>
					<div className="focus-input"></div>
				</div>
				
				<button className="btn-submit" onClick={this.onLogin}>login</button>
				
				<div className='checkbox-remember-me'>
					<label>
						<span>Remember me</span>
						<input type="checkbox" onChange={this.onRememberChange}/>
					</label>
				</div>
			</form>
		);
	}
}