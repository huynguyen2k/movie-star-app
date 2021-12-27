const { makeStyles } = require('@material-ui/core')

const useStyles = makeStyles(theme => ({
	rootBox: {
		margin: '115px 16px 32px 0',
		borderRadius: '4px',
		padding: '16px',
		boxShadow: '0 0 5px 0 grey',
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
		borderBottom: `1px dashed ${theme.palette.grey[500]}`,
		padding: '10px 0',

		'& .label': {
			width: '120px',
			marginRight: '8px',
			color: 'var(--primary-dark-color)',
		},
		'& .content': {
			flex: '1 0 0',
			textAlign: 'right',

			'&.booking-list': {
				minHeight: '144px',
			},
		},
	},
	movieName: {
		flex: '1 0 0',
		fontSize: '1.375rem',
		textAlign: 'center',
		lineHeight: '1.4',
	},
	totalPrice: {
		color: theme.palette.success.main,
		fontSize: '1.5rem',
		fontWeight: '500',
	},
	showtime: {
		marginLeft: '8px',
	},
	bookingTicketBtn: {
		marginTop: '16px',
		color: 'white',
		backgroundColor: theme.palette.success.main,
		boxShadow: 'none',

		'&:hover': {
			backgroundColor: theme.palette.success.dark,
			boxShadow: 'none',
		},
		'&.Mui-disabled': {
			color: 'white',
			backgroundColor: theme.palette.success.main,
			opacity: '0.8',
		},
	},
}))

export default useStyles
