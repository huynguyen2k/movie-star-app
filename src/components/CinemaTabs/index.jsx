import React, { useState } from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
// COMPONENTS
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from 'components/TabPanel'
import MovieAccordion from 'components/MovieAccordion'

const useStyles = makeStyles({
	root: {
		minWidth: 'unset',
		maxWidth: 'unset',
		padding: '0 16px',
		opacity: 0.5,

		'& .MuiTab-wrapper': {
			display: 'inline-block',
			borderBottom: '1px solid #ccc',
			width: '400px',
			padding: '8px 0',
			boxSizing: 'content-box',
		},
		'&:last-child .MuiTab-wrapper': {
			borderBottom: 'none',
		},
	},
	indicator: {
		width: '4px',
		borderRadius: '10px',
		backgroundColor: 'var(--primary-dark-color)',
	},
})

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	}
}

CinemaTabs.propTypes = {
	cinemaList: PropTypes.array,
}

CinemaTabs.defaultProps = {
	cinemaList: [],
}

function CinemaTabs({ cinemaList }) {
	const classes = useStyles()
	const [cinemaTab, setCinemaTab] = useState(0)

	return (
		<div className="cinema-tabs">
			<div className="cinema-tabs__wrap">
				<div className="cinema-tabs__header">
					<Tabs
						orientation="vertical"
						variant="scrollable"
						value={cinemaTab}
						onChange={(event, newValue) => setCinemaTab(newValue)}
						aria-label="Vertical tabs example"
						sx={{ borderRight: 1, borderColor: 'divider' }}
						classes={{
							indicator: classes.indicator,
						}}
					>
						{cinemaList.map((cinema, index) => (
							<Tab
								key={index}
								label={
									<div className="cinema-tabs__tab-item">
										<div className="image">
											<img src={cinema.hinhAnh} alt={cinema.tenCumRap} />
										</div>
										<div className="info">
											<p className="cinema-name">
												<span>{cinema.tenCumRap.split(' - ')[0]}</span>
												<span> - </span>
												<span>{cinema.tenCumRap.split(' - ')[1]}</span>
											</p>
											<p className="cinema-address">{cinema.diaChi}</p>
										</div>
									</div>
								}
								{...a11yProps(index)}
								classes={{
									root: classes.root,
								}}
							/>
						))}
					</Tabs>
				</div>
				<div className="cinema-tabs__body">
					{cinemaList.map((cinema, index) => (
						<TabPanel key={cinema.maCumRap} value={cinemaTab} index={index}>
							<MovieAccordion movieList={cinema.danhSachPhim} />
						</TabPanel>
					))}
				</div>
			</div>
		</div>
	)
}

export default CinemaTabs
