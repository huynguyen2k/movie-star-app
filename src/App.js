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
import AdminTemplate from 'templates/Admin'
import HomeTemplate from 'templates/Home'
import LoginPage from 'pages/Login'
import RegisterPage from 'pages/Register'

function App() {
	return (
		<div className="app">
			<AutoScrollToTop>
				<Switch>
					<Route path="/admin" component={AdminTemplate} />
					<Route path="/dang-nhap" component={LoginPage} />
					<Route path="/dang-ky" component={RegisterPage} />
					<Route path="/" component={HomeTemplate} />
				</Switch>
			</AutoScrollToTop>
		</div>
	)
}

export default App
