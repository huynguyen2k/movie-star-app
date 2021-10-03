import React from 'react'
import { Link, NavLink } from 'react-router-dom'
// ICONS
import { ReactComponent as Logo } from 'assets/images/icons/logo.svg'
import AccountIcon from '@material-ui/icons/AccountBox'
// STYLES
import './style.scss'

const Header = () => {
	return (
		<div className="header">
			<div className="container">
				<div className="header__wrap">
					<div className="header__logo">
						<Link className="header__logo-link" to="/">
							<Logo />
						</Link>
					</div>
					<nav className="header__nav">
						<NavLink
							to="/"
							exact
							className="header__nav-link"
							activeClassName="active"
						>
							HOME
						</NavLink>
						<NavLink
							to="/about"
							className="header__nav-link"
							activeClassName="active"
						>
							ABOUT
						</NavLink>
						<NavLink
							to="/news"
							className="header__nav-link"
							activeClassName="active"
						>
							NEWS
						</NavLink>
						<NavLink
							to="/contact"
							className="header__nav-link"
							activeClassName="active"
						>
							CONTACT
						</NavLink>
					</nav>
					<div className="header__account">
						<div className="header__account-wrap">
							<span className="account-icon">
								<AccountIcon />
							</span>
							<span className="account-text">Account</span>
						</div>
						<div className="header__account-options">
							<Link to="/login" className="option-link">
								Login
							</Link>
							<Link to="/register" className="option-link">
								Register
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
