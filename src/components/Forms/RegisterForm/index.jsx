import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { groupId } from 'settings/config'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from 'components/FormFields/InputField'
import { Link as RouterLink } from 'react-router-dom'
import {
	Grid,
	Typography,
	makeStyles,
	Button,
	Box,
	CircularProgress,
	Link,
} from '@material-ui/core'
import PasswordField from 'components/FormFields/PasswordField'

const useStyles = makeStyles(theme => ({
	box: {
		width: '480px',
		padding: '32px',
		borderRadius: '8px',
		backgroundColor: 'white',
		// backgroundImage: `
		// 	linear-gradient(
		// 		to bottom,
		// 		rgba(20, 50, 93, 0.9),
		// 		rgba(8, 22, 48, 0.9)
		// 	)
		// `,
	},
	formTitle: {
		marginBottom: '32px',
	},
	gridItem: {
		marginBottom: '8px',
	},
	submitBtn: {
		'&.Mui-disabled': {
			backgroundColor: theme.palette.primary.main,
			opacity: 0.7,
		},
	},
	loadingIcon: {
		color: 'white',
	},
	loginBox: {
		marginTop: '16px',
		textAlign: 'right',
	},
	loginLink: {
		marginLeft: '6px',
	},
}))

RegisterForm.propTypes = {
	onSubmit: PropTypes.func,
}

RegisterForm.defaultProps = {
	onSubmit: null,
}

function RegisterForm({ onSubmit }) {
	const classes = useStyles()
	const schema = yup
		.object()
		.shape({
			hoTen: yup
				.string()
				.required('Bạn phải nhập họ tên!')
				.test(
					'at least two words',
					'Bạn phải nhập ít nhất 2 từ!',
					value => value.split(' ').length >= 2
				),
			email: yup
				.string()
				.required('Bạn phải nhập email!')
				.email('Email không hợp lệ!'),
			soDt: yup
				.string()
				.required('Bạn phải nhập số điện thoại!')
				.matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ!'),
			taiKhoan: yup.string().required('Bạn phải nhập tài khoản!'),
			matKhau: yup
				.string()
				.required('Bạn phải nhập mật khẩu!')
				.matches(/^\w{6,32}$/, 'Mật khẩu phải từ 6-32 ký tự!'),
			matKhauXacNhan: yup
				.string()
				.required('Bạn phải nhập mật khẩu xác nhận!')
				.oneOf([yup.ref('matKhau')], 'Mật khẩu xác nhận không khớp!'),
		})
		.required()

	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			hoTen: '',
			taiKhoan: '',
			matKhau: '',
			matKhauXacNhan: '',
			email: '',
			soDt: '',
			maNhom: groupId,
		},
		resolver: yupResolver(schema),
	})
	const {
		formState: { isSubmitting },
		reset,
	} = form

	const handleSubmit = async values => {
		if (onSubmit) {
			try {
				await onSubmit(values)
				reset()
			} catch (error) {
				return
			}
		}
	}

	return (
		<Box className={classes.box}>
			<Typography className={classes.formTitle} align="center" variant="h5">
				Đăng ký tài khoản
			</Typography>

			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Grid container spacing={2}>
					<Grid item className={classes.gridItem} xs={6}>
						<InputField
							name="hoTen"
							form={form}
							label="Họ tên"
							placeholder="Nhập họ tên của bạn"
						/>
					</Grid>

					<Grid item className={classes.gridItem} xs={6}>
						<InputField
							name="soDt"
							form={form}
							label="Số điện thoại"
							placeholder="Nhập số điện thoại của bạn"
						/>
					</Grid>

					<Grid item className={classes.gridItem} xs={12}>
						<InputField
							name="email"
							form={form}
							label="Email"
							placeholder="Nhập email của bạn"
						/>
					</Grid>

					<Grid item className={classes.gridItem} xs={12}>
						<InputField
							name="taiKhoan"
							form={form}
							label="Tài khoản"
							placeholder="Nhập tài khoản của bạn"
						/>
					</Grid>

					<Grid item className={classes.gridItem} xs={12}>
						<PasswordField
							name="matKhau"
							form={form}
							label="Mật khẩu"
							placeholder="Nhập mật khẩu của bạn"
						/>
					</Grid>

					<Grid item className={classes.gridItem} xs={12}>
						<PasswordField
							name="matKhauXacNhan"
							form={form}
							label="Mật khẩu xác nhận"
							placeholder="Nhập mật khẩu xác nhận"
						/>
					</Grid>

					<Grid item className={classes.gridItem} xs={12}>
						<Button
							color="primary"
							fullWidth
							variant="contained"
							size="large"
							disableFocusRipple
							type="submit"
							disabled={isSubmitting}
							className={classes.submitBtn}
						>
							{isSubmitting ? (
								<CircularProgress className={classes.loadingIcon} size={26} />
							) : (
								'Đăng Ký'
							)}
						</Button>
					</Grid>
				</Grid>
			</form>

			<Box className={classes.loginBox}>
				<Typography component="span">Bạn đã có tài khoản?</Typography>
				<Link
					replace
					to="/dang-nhap"
					component={RouterLink}
					className={classes.loginLink}
				>
					Đăng nhập ngay
				</Link>
			</Box>
		</Box>
	)
}

export default RegisterForm
