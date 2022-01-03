import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	rootBox: {
		borderRadius: '6px',
		color: 'black',
		backgroundColor: 'white',
		overflow: 'hidden',
	},
	dayList: {
		borderBottom: `1px solid ${theme.palette.divider}`,

		'& .Mui-selected': {
			color: 'var(--primary-dark-color)',
		},
		'& .MuiTabs-indicator': {
			borderRadius: '999px',
			backgroundColor: 'var(--primary-dark-color)',
		},
	},
	tabsBox: {
		display: 'flex',
		height: '80vh',
	},
	emptyBox: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexFlow: 'column nowrap',

		'& .title': {
			margin: '16px 0',
			textAlign: 'center',
		},
		'& .image': {
			flex: '1 0 0',
			position: 'relative',

			'& img': {
				position: 'absolute',
				left: '0',
				top: '0',
				width: '100%',
				height: '100%',
				objectFit: 'contain',
			},
		},
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
		'& .MuiTabs-indicator': {
			display: 'none',
		},
	},
	tabItem: {
		width: '240px',
		padding: '20px',
		maxWidth: 'none',
		position: 'relative',
		opacity: '0.4',

		'&:last-child::after': {
			display: 'none',
		},
		'&::after': {
			content: '""',
			position: 'absolute',
			top: '100%',
			left: '50%',
			transform: 'translate(-50%, -2px)',
			width: 'calc(100% - 40px)',
			borderBottom: `1px solid ${theme.palette.divider}`,
		},
	},
	cinemaBox: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	cinemaLogo: {
		width: '50px',
		height: '50px',
	},
	cinemaName: {
		marginLeft: '16px',
		textAlign: 'left',
		textTransform: 'none',
	},
	tabPanelBox: {
		flex: '1 0 0',
		height: '100%',
		overflow: 'hidden auto',
	},
	cinemaGroupRoot: {
		padding: '16px',
		paddingBottom: '0',
		position: 'relative',

		'&:last-child::after': {
			display: 'none',
		},
		'&::after': {
			content: '""',
			position: 'absolute',
			bottom: '0',
			left: '50%',
			transform: 'translate(-50%, 0)',
			width: 'calc(100% - 32px)',
			borderTop: `1px solid ${theme.palette.divider}`,
		},
	},
	cinemaGroup: {
		display: 'flex',
		alignItems: 'center',
	},
	cinemaGroupImg: {
		width: '50px',
		height: '50px',
		objectFit: 'cover',
		borderRadius: '4px',
		overflow: 'hidden',
	},
	cinemaGroupInfo: {
		marginLeft: '16px',
	},
	cinemaGroupName: {
		'& span:nth-child(1)': {
			fontWeight: '500',
			color: theme.palette.success.main,
		},
		'& span:nth-child(2)': {
			margin: '0 4px',
			fontSize: '1.25rem',
		},
		'& span:nth-child(3)': {},
	},
	cinemaGroupAddress: {
		fontSize: '0.875rem',
		fontWeight: '400',
		color: theme.palette.grey[500],
	},
	showtimesBox: {
		marginTop: '16px',
	},
	showtimesTitle: {
		fontSize: '1.125rem',
	},
	showtimesList: {
		marginTop: '8px',
	},
	showtimesBtn: {
		marginRight: '16px',
		marginBottom: '16px',
		color: theme.palette.grey[700],
		backgroundColor: theme.palette.grey[100],

		'&:hover': {
			backgroundColor: theme.palette.grey[100],
		},
		'& .MuiButton-label span:nth-child(1)': {
			color: theme.palette.success.main,
			fontWeight: '500',
			fontSize: '1.25rem',
		},
		'& .MuiButton-label span:nth-child(2)': {
			margin: '0 6px',
		},
		'& .MuiButton-label span:nth-child(3)': {},
	},
}))

export default useStyles
