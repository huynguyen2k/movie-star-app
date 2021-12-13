import React from 'react'
import PropTypes from 'prop-types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	Link,
	makeStyles,
	Typography,
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import InputField from 'components/FormFields/InputField'
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
	registerBox: {
		marginTop: '16px',
		textAlign: 'right',
	},
	registerLink: {
		marginLeft: '6px',
	},
}))

LoginForm.propTypes = {
	onSubmit: PropTypes.func,
}

LoginForm.defaultProps = {
	onSubmit: null,
}

function LoginForm({ onSubmit }) {
	const classes = useStyles()

	const schema = yup
		.object()
		.shape({
			taiKhoan: yup.string().required('Bạn phải nhập tài khoản!'),
			matKhau: yup.string().required('Bạn phải nhập mật khẩu!'),
		})
		.required()

	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			taiKhoan: '',
			matKhau: '',
		},
		resolver: yupResolver(schema),
	})

	const {
		formState: { isSubmitting },
	} = form

	const handleSubmit = async values => {
		if (onSubmit) {
			await onSubmit(values)
		}
	}

	return (
		<Box className={classes.box}>
			<Typography className={classes.formTitle} align="center" variant="h5">
				Đăng nhập
			</Typography>

			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Grid container spacing={2}>
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
						<Button
							fullWidth
							disableFocusRipple
							color="primary"
							variant="contained"
							size="large"
							type="submit"
							disabled={isSubmitting}
							className={classes.submitBtn}
						>
							{isSubmitting ? (
								<CircularProgress className={classes.loadingIcon} size={26} />
							) : (
								'Đăng nhập'
							)}
						</Button>
					</Grid>
				</Grid>
			</form>

			<Box className={classes.registerBox}>
				<Typography component="span">Bạn chưa có tài khoản?</Typography>
				<Link
					replace
					to="/dang-ky"
					component={RouterLink}
					className={classes.registerLink}
				>
					Đăng ký ngay
				</Link>
			</Box>
		</Box>
	)
}

export default LoginForm
