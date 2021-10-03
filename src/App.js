import React from 'react'
import './App.scss'
// IMPORT CSS
import './index.css'
import 'assets/css/reset.css'
import 'assets/css/bootstrap-grid.css'
import 'assets/scss/base.scss'
// CSS SLICK
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// UTILS
import history from 'utils/history'
// COMPONENTS
import { Router, Switch, Route } from 'react-router-dom'
// Templates
const HomeTemplate = React.lazy(() => import('templates/Home'))
const AdminTemplate = React.lazy(() => import('templates/Admin'))

function App() {
	return (
		<div className="app">
			<Router history={history}>
				<React.Suspense fallback={<div>loading ...</div>}>
					<Switch>
						<Route path="/admin" component={AdminTemplate} />
						<Route path="/" component={HomeTemplate} />
					</Switch>
				</React.Suspense>
			</Router>
		</div>
	)
}

export default App
