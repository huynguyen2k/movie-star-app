import React from 'react'
// HOOKS
import { useRouteMatch } from 'react-router-dom'
// STYLES
import './style.scss'
// COMPONENTS
import { Switch, Route } from 'react-router-dom'
import Header from 'components/Header'
import Footer from 'components/Footer'
import PrivateRoute from 'components/PrivateRoute'
import { useSelector } from 'react-redux'
// PAGES
const HomePage = React.lazy(() => import('pages/Home'))
const MovieDetailPage = React.lazy(() => import('pages/MovieDetail'))
const BookingTicket = React.lazy(() => import('pages/BookingTicket'))
const NotFoundPage = React.lazy(() => import('pages/NotFound'))

function HomeTemplate() {
	const match = useRouteMatch()
	const loggedIn = useSelector(state => state.auth.loggedIn)

	return (
		<div className="home-template">
			<header className="home-template__header">
				<Header />
			</header>

			<main className="home-template__main">
				<React.Suspense fallback={<div>Loading ...</div>}>
					<Switch>
						<Route exact path={match.path} component={HomePage} />

						<Route
							exact
							path={`${match.path}chi-tiet-phim/:movieId`}
							component={MovieDetailPage}
						/>

						<PrivateRoute
							exact
							loggedIn={loggedIn}
							path={`${match.path}dat-ve-phim/:showtimesId`}
						>
							<BookingTicket />
						</PrivateRoute>

						<Route component={NotFoundPage} />
					</Switch>
				</React.Suspense>
			</main>

			<footer className="home-template__footer">
				<Footer />
			</footer>
		</div>
	)
}

export default HomeTemplate
