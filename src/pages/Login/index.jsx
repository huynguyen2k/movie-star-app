import React from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from 'components/Forms/LoginForm'
import { login } from 'app/slices/authSlice'
import alert from 'utils/alert'
import { useHistory, Redirect } from 'react-router-dom'

function LoginPage() {
	const dispatch = useDispatch()
	const history = useHistory()
	const loggedIn = useSelector(state => state.auth.loggedIn)

	const handleSubmit = async values => {
		try {
			await dispatch(login(values)).unwrap()
			history.goBack()
		} catch (err) {
			alert.errorAlert(err)
		}
	}

	if (loggedIn) {
		return <Redirect to="/" />
	}
	return (
		<div className="login-page">
			<LoginForm onSubmit={handleSubmit} />
		</div>
	)
}

export default LoginPage
