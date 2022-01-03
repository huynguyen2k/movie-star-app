import { Box, Button, Tab, Tabs, Typography } from '@material-ui/core'
import TabPanel from 'components/TabPanel'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useStyles from './styles'

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	}
}

MovieShowtimes.propTypes = {
	movieShowtimes: PropTypes.array,
}

MovieShowtimes.defaultProps = {
	movieShowtimes: [],
}

function MovieShowtimes({ movieShowtimes }) {
	const classes = useStyles()
	const [value, setValue] = useState(0)
	const [dayValue, setDayValue] = useState(
		moment().endOf('day').format('DD-MM-YYYY HH:mm:ss')
	)

	const filteredList = useMemo(() => {
		if (!Array.isArray(movieShowtimes)) return []

		const cinemaList = []
		movieShowtimes.forEach(cinemaSystem => {
			const cinemaGroupList = []

			cinemaSystem.cumRapChieu.forEach(cinemaGroup => {
				const newCinemaGroup = {
					...cinemaGroup,
					lichChieuPhim: cinemaGroup.lichChieuPhim.filter(showtimes => {
						const times = moment(
							showtimes.ngayChieuGioChieu,
							'YYYY-MM-DDTHH:mm:ss',
							true
						)
						const currentTimes = moment()
						const startTimes = moment(
							dayValue,
							'DD-MM-YYYY HH:mm:ss',
							true
						).startOf('day')
						const endTimes = moment(dayValue, 'DD-MM-YYYY HH:mm:ss', true)

						return (
							times.isBetween(currentTimes, endTimes, undefined, '[]') &&
							times.isBetween(startTimes, endTimes, undefined, '[]')
						)
					}),
				}

				if (newCinemaGroup.lichChieuPhim.length > 0) {
					cinemaGroupList.push(newCinemaGroup)
				}
			})

			if (cinemaGroupList.length > 0) {
				cinemaList.push({
					...cinemaSystem,
					cumRapChieu: cinemaGroupList,
				})
			}
		})

		return cinemaList
	}, [movieShowtimes, dayValue])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleDayChange = (event, newDayValue) => {
		setValue(0)
		setDayValue(newDayValue)
	}

	const renderDayList = () => {
		const totalDay = 14

		return [...Array(totalDay).keys()].map(value => {
			const day = moment().add(value, 'days')

			return (
				<Tab
					key={value}
					disableRipple
					value={day.endOf('day').format('DD-MM-YYYY HH:mm:ss')}
					label={
						<Box className="day-item">
							<Typography className="day-of-week" component="h4">
								{day.format('dddd')}
							</Typography>

							<Typography className="day-of-month" component="span">
								{day.format('DD')}
							</Typography>
						</Box>
					}
				/>
			)
		})
	}

	return (
		<Box className={classes.rootBox}>
			<Tabs
				value={dayValue}
				onChange={handleDayChange}
				variant="scrollable"
				scrollButtons="auto"
				className={classes.dayList}
			>
				{renderDayList()}
			</Tabs>

			<Box className={classes.tabsBox}>
				{filteredList.length === 0 && (
					<Box className={classes.emptyBox}>
						<Typography className="title" component="h3">
							Ngày này hiện không có lịch chiếu bạn vui lòng chọn ngày khác!
						</Typography>

						<Box className="image">
							<img
								src="/assets/images/backgrounds/not-found-result.jpg"
								alt="Not Found"
							/>
						</Box>
					</Box>
				)}

				{filteredList.length > 0 && (
					<>
						<Tabs
							orientation="vertical"
							variant="scrollable"
							value={value}
							onChange={handleChange}
							className={classes.tabs}
						>
							{filteredList.map((cinema, index) => (
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

											<Typography
												component="span"
												className={classes.cinemaName}
											>
												{cinema.tenHeThongRap}
											</Typography>
										</Box>
									}
								/>
							))}
						</Tabs>

						<Box className={classes.tabPanelBox}>
							{filteredList.map((cinema, index) => (
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
												<Typography
													className={classes.showtimesTitle}
													component="h3"
												>
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
					</>
				)}
			</Box>
		</Box>
	)
}

export default MovieShowtimes
