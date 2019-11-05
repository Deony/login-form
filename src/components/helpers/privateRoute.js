import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({ component: Component, isAuthorized, ...rest}) => {
	return (
		<Route
			{...rest}
			render={ (props) => isAuthorized === true ? <Component {...props} /> : <Redirect to='/login'/>
			}
		/>
	)
};

export default PrivateRoute;