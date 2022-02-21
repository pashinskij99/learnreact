import React from 'react'

import { Route, Redirect } from 'react-router'

export const Auth = ({ path, props, component: Component, isAuthenticated }) => {
	return (
		<Route 
			path={path}
			render={
				routeProps => {
					if(isAuthenticated) {
						return <Component {...props} {...routeProps} />
					}
					return <Redirect to="/login" />
				}
			}
		/>
	)
}
