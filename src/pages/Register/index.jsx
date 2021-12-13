import React from 'react'
import './style.scss'
import RegisterForm from 'components/Forms/RegisterForm'
import { register } from 'app/slices/authSlice'
import { useDispatch } from 'react-redux'
import alert from 'utils/alert'

function RegisterPage() {
	const dispatch = useDispatch()

	const handleSubmit = async values => {
		delete values.matKhauXacNhan

		try {
			await dispatch(register(values)).unwrap()
			alert.successAlert('Bạn đã đăng ký tài khoản thành công!')
		} catch (error) {
			alert.errorAlert(error)
			return Promise.reject()
		}
	}

	return (
		<div className="register-page">
			<RegisterForm onSubmit={handleSubmit} />
		</div>
	)
}

export default RegisterPage
