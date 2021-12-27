import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ loggedIn, children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				loggedIn ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/dang-nhap',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	)
}

export default PrivateRoute
