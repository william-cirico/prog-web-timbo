import React from "react";
import { Route, Redirect } from "react-router-dom";
import authServices from "../services/authServices";


export function PrivateRoute({ children, permissions, ...rest }) {  
	const accessToken = authServices.getAccessToken();	
	
	let userRole;

	if (accessToken) {
		userRole = authServices.getRoleFromAccessToken(accessToken);				
	}	
		
	return (
		<Route
		  {...rest}
		  render={({ location }) =>
			permissions.includes(userRole) ? (
				React.Children.map(children, child => {
					return React.cloneElement(child, { userRole });
				})
			) : (
			  <Redirect
				to={{
				  pathname: "/",
				  state: { from: location }
				}}
			  />
			)
		  }
		/>
	  );
}