import React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { Link } from 'react-scroll'
// ICONS
import { ReactComponent as Logo } from 'assets/images/icons/logo.svg'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
// STYLES
import './style.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { logout } from 'app/slices/authSlice'

const useStyles = makeStyles(theme => ({
	avatar: {
		width: '36px',
		height: '36px',
		backgroundColor: theme.palette.success.main,
	},
}))

const Header = () => {
	const classes = useStyles()
	const dispatch = useDispatch()

	const user = useSelector(state => state.auth.user)
	const loggedIn = useSelector(state => state.auth.loggedIn)

	const handleLogoutClick = () => {
		dispatch(logout())
	}

	return (
		<div className="header">
			<div className="container">
				<div className="header__wrap">
					<div className="header__logo">
						<RouteLink className="header__logo-link" to="/">
							<Logo />
						</RouteLink>
					</div>
					<nav className="header__nav">
						<Link
							to="showtimes"
							className="header__nav-link"
							activeClass="active"
							smooth
							duration={500}
							offset={-150}
							spy={true}
						>
							Lịch Chiếu
						</Link>
						<Link
							to="cinema"
							className="header__nav-link"
							activeClass="active"
							smooth
							duration={500}
							offset={-150}
							spy={true}
						>
							Cụm Rạp
						</Link>
						<Link
							to="news"
							className="header__nav-link"
							activeClass="active"
							smooth
							duration={500}
							offset={-150}
							spy={true}
						>
							Tin Tức
						</Link>
						<Link
							to="app"
							className="header__nav-link"
							activeClass="active"
							smooth
							duration={500}
							offset={-150}
							spy={true}
						>
							Ứng dụng
						</Link>
					</nav>

					{!loggedIn && (
						<div className="header__account">
							<div className="header__account-wrap">
								<span className="account-icon">
									<AccountCircleIcon />
								</span>
								<span className="account-text">Tài khoản</span>
							</div>
							<div className="header__account-options">
								<RouteLink to="/dang-nhap" className="option-link">
									Đăng nhập
								</RouteLink>
								<RouteLink to="/dang-ky" className="option-link">
									Đăng ký
								</RouteLink>
							</div>
						</div>
					)}

					{loggedIn && (
						<div className="header__account">
							<div className="header__account-wrap">
								<span className="account-icon">
									<Avatar className={classes.avatar}>
										{user.hoTen.slice(0, 1).toUpperCase()}
									</Avatar>
								</span>
								<span className="account-text">{user.taiKhoan}</span>
							</div>
							<div className="header__account-options">
								<RouteLink to="/ho-so" className="option-link">
									Hồ sơ
								</RouteLink>
								<span className="option-link" onClick={handleLogoutClick}>
									Đăng xuất
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
