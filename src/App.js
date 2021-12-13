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
// COMPONENTS
import { Switch, Route } from 'react-router-dom'
import AutoScrollToTop from 'components/AutoScrollToTop'

// PAGES
const LoginPage = React.lazy(() => import('pages/Login'))
const RegisterPage = React.lazy(() => import('pages/Register'))
// Templates
const HomeTemplate = React.lazy(() => import('templates/Home'))
const AdminTemplate = React.lazy(() => import('templates/Admin'))

function App() {
	return (
		<div className="app">
			<React.Suspense fallback={<div>loading ...</div>}>
				<AutoScrollToTop>
					<Switch>
						<Route path="/admin" component={AdminTemplate} />
						<Route path="/dang-nhap" component={LoginPage} />
						<Route path="/dang-ky" component={RegisterPage} />
						<Route path="/" component={HomeTemplate} />
					</Switch>
				</AutoScrollToTop>
			</React.Suspense>
		</div>
	)
}

export default App
