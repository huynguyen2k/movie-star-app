import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	rootBox: {
		padding: '32px',
	},
	topDetail: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	cinemaInfoBox: {
		display: 'flex',
		alignItems: 'center',

		'& .movie-img': {
			borderRadius: '4px',
			width: '50px',
			height: '50px',
			objectFit: 'cover',
		},
		'& .cinema-info': {
			marginLeft: '8px',

			'& .name': {
				fontSize: '1.125rem',

				'& *': {
					fontSize: 'inherit',
				},
				'& .strong-name': {
					color: theme.palette.success.main,
					fontWeight: '500',
				},
				'& .dash-character': {
					margin: '0 4px',
				},
			},
			'& .address': {
				color: theme.palette.grey[700],
			},
		},
	},
	holdingTimes: {
		textAlign: 'center',

		'& .title': {
			display: 'block',
		},
		'& .content': {
			display: 'block',
			color: 'var(--primary-dark-color)',
			fontSize: '1.5rem',
			fontWeight: '500',
			lineHeight: '1.2',
		},
	},
	screenLine: {
		width: '100%',
		height: '10px',
		margin: '32px 0',
		borderRadius: '10px',
		backgroundImage:
			'linear-gradient(to left, var(--primary-color), var(--primary-dark-color))',
	},
	bookingBox: {},
	ticketList: {
		display: 'flex',
		flexFlow: 'wrap row',
		justifyContent: 'center',

		'& .line-break': {
			width: '100%',
		},
		'& .booking-btn': {
			margin: '4px',
			width: '40px',
			height: '40px',
			minWidth: 'unset',

			'&.regular-ticket': {
				backgroundColor: '#3f515d',
			},
			'&.vip-ticket': {
				backgroundColor: '#f6b304',
			},
			'&.booking-ticket': {
				color: theme.palette.grey[200],
				backgroundColor: theme.palette.success.main,
			},
			'&.booked-ticket': {
				color: theme.palette.grey[200],
				backgroundColor: '#4a91e3',
				pointerEvents: 'none',
			},
		},
		'& .row-name': {
			display: 'flex',
			alignItems: 'center',
			width: '50px',
			fontSize: '1.125rem',
			fontWeight: '500',
		},
	},
	noteBox: {
		marginTop: '32px',
		display: 'flex',
		justifyContent: 'center',

		'& .note-item': {
			display: 'inline-flex',
			flexDirection: 'column',
			alignItems: 'center',
			margin: '0 48px',

			'& .ticket-label': {
				display: 'inline-block',
				width: '40px',
				height: '40px',
				borderRadius: '4px',
			},
			'& .regular-ticket': {
				backgroundColor: '#3f515d',
			},
			'& .vip-ticket': {
				backgroundColor: '#f6b304',
			},
			'& .booking-ticket': {
				backgroundColor: theme.palette.success.main,
			},
			'& .booked-ticket': {
				backgroundColor: '#4a91e3',
			},
			'& .ticket-text': {
				marginTop: '8px',
				fontSize: '1.125rem',
			},
		},
	},
}))

export default useStyles
