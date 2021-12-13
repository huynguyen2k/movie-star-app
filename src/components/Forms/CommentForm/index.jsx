import { yupResolver } from '@hookform/resolvers/yup'
import {
	Box,
	Button,
	makeStyles,
	createTheme,
	ThemeProvider,
	CircularProgress,
} from '@material-ui/core'
import InputField from 'components/FormFields/InputField'
import RatingField from 'components/FormFields/RatingField'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const useStyles = makeStyles(theme => ({
	rootBox: {
		width: '600px',
		maxWidth: '100%',
		padding: '32px',
	},
	formField: {
		marginBottom: '24px',

		'&:last-child': {
			marginBottom: '0',
		},
	},
	loadingIcon: {
		color: 'white',
	},
	submitBtn: {
		color: 'white',
		backgroundColor: 'var(--orange)',

		'&:hover': {
			color: 'white',
			backgroundColor: 'var(--dark-orange)',
		},
		'&.Mui-disabled': {
			backgroundColor: 'var(--orange)',
			opacity: 0.7,
		},
	},
}))

const theme = createTheme({
	palette: {
		primary: {
			main: '#fb4226',
		},
	},
})

CommentForm.propTypes = {
	onSubmit: PropTypes.func,
}

CommentForm.defaultProps = {
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		content: yup.string().required('Bình luận không được để trống!'),
	})
	.required()

function CommentForm({ onSubmit }) {
	const classes = useStyles()

	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			rating: 5,
			content: '',
		},
		resolver: yupResolver(schema),
	})
	const {
		formState: { isSubmitting },
	} = form

	const handleSubmit = async formValues => {
		if (onSubmit) {
			await onSubmit(formValues)
		}
	}

	return (
		<Box className={classes.rootBox}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Box className={classes.formField}>
					<RatingField name="rating" form={form} />
				</Box>

				<ThemeProvider theme={theme}>
					<Box className={classes.formField}>
						<InputField
							name="content"
							form={form}
							multiline
							minRows={4}
							maxRows={4}
							placeholder="Hãy nhập bình luận của bạn ở đây!"
						/>
					</Box>
				</ThemeProvider>

				<Box className={classes.formField}>
					<Button
						fullWidth
						color="primary"
						variant="contained"
						size="large"
						type="submit"
						disableFocusRipple
						disabled={isSubmitting}
						className={classes.submitBtn}
					>
						{isSubmitting ? (
							<CircularProgress className={classes.loadingIcon} size={26} />
						) : (
							'Đăng'
						)}
					</Button>
				</Box>
			</form>
		</Box>
	)
}

export default CommentForm
