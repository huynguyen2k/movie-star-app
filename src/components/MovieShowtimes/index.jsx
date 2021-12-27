import {
	Tabs,
	Tab,
	Typography,
	Box,
	makeStyles,
	Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import TabPanel from 'components/TabPanel'
import moment from 'moment'
import { Link } from 'react-router-dom'

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	}
}

const useStyles = makeStyles(theme => ({
	rootBox: {
		display: 'flex',
		borderRadius: '6px',
		height: '90vh',
		color: 'black',
		backgroundColor: 'white',
		overflow: 'hidden',
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
			height: '1px',
			backgroundColor: theme.palette.grey[300],
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

MovieShowtimes.propTypes = {
	movieShowtimes: PropTypes.array,
}

MovieShowtimes.defaultProps = {
	movieShowtimes: [],
}

function MovieShowtimes({ movieShowtimes }) {
	const classes = useStyles()
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<Box className={classes.rootBox}>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				className={classes.tabs}
			>
				{movieShowtimes.map((cinema, index) => (
					<Tab
						key={cinema.maHeThongRap}
						disableTouchRipple
						className={classes.tabItem}
						{...a11yProps(index)}
						label={
							<Box className={classes.cinemaBox}>
								<img
									src={cinema.logo}
									alt={cinema.tenHeThongRap}
									className={classes.cinemaLogo}
								/>

								<Typography component="span" className={classes.cinemaName}>
									{cinema.tenHeThongRap}
								</Typography>
							</Box>
						}
					/>
				))}
			</Tabs>

			<Box className={classes.tabPanelBox}>
				{movieShowtimes.map((cinema, index) => (
					<TabPanel key={cinema.maHeThongRap} value={value} index={index}>
						{cinema.cumRapChieu.map(cinemaGroup => (
							<Box
								key={cinemaGroup.maCumRap}
								className={classes.cinemaGroupRoot}
							>
								<Box className={classes.cinemaGroup}>
									<Box className={classes.cinemaGroupImg}>
										<img
											src={cinemaGroup.hinhAnh}
											alt={cinemaGroup.tenCumRap}
										/>
									</Box>

									<Box className={classes.cinemaGroupInfo}>
										<Typography
											className={classes.cinemaGroupName}
											component="h3"
										>
											<Typography component="span">
												{cinemaGroup.tenCumRap.split(' - ')[0]}
											</Typography>
											<Typography component="span">-</Typography>
											<Typography component="span">
												{cinemaGroup.tenCumRap.split(' - ')[1]}
											</Typography>
										</Typography>

										<Typography
											className={classes.cinemaGroupAddress}
											component="span"
										>
											{cinemaGroup.diaChi}
										</Typography>
									</Box>
								</Box>

								<Box className={classes.showtimesBox}>
									<Typography className={classes.showtimesTitle} component="h3">
										2D Digital
									</Typography>

									<Box className={classes.showtimesList}>
										{cinemaGroup.lichChieuPhim.map(showtimes => (
											<Button
												key={showtimes.maLichChieu}
												className={classes.showtimesBtn}
												disableRipple
												size="large"
												variant="contained"
												component={Link}
												to={`/dat-ve-phim/${showtimes.maLichChieu}`}
											>
												<Typography component="span">
													{moment(
														showtimes.ngayChieuGioChieu,
														'YYYY-MM-DDTHH:mm:ss',
														true
													).format('HH:mm')}
												</Typography>

												<Typography component="span">~</Typography>

												<Typography component="span">
													{moment(
														showtimes.ngayChieuGioChieu,
														'YYYY-MM-DDTHH:mm:ss',
														true
													)
														.add(showtimes.thoiLuong, 'm')
														.format('HH:mm')}
												</Typography>
											</Button>
										))}
									</Box>
								</Box>
							</Box>
						))}
					</TabPanel>
				))}
			</Box>
		</Box>
	)
}

export default MovieShowtimes
