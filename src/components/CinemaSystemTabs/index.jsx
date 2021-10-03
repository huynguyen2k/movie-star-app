import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// COMPONENTS
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from 'components/TabPanel'
import { makeStyles } from '@material-ui/styles'
import CinemaTabs from 'components/CinemaTabs'

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	}
}

CinemaSystemTabs.propTypes = {
	cinemaSystemList: PropTypes.array,
}

CinemaSystemTabs.defaultProps = {
	cinemaSystemList: [],
}

const useStyles = makeStyles({
	root: {
		minWidth: 'unset',
		maxWidth: 'unset',
		padding: '0 24px',
		opacity: 0.5,

		'& .MuiTab-wrapper': {
			display: 'inline-block',
			borderBottom: '1px solid #ccc',
			padding: '10px 0',
			width: '60px',
			height: '60px',
			boxSizing: 'content-box',
		},
		'&:last-child .MuiTab-wrapper': {
			borderBottom: 'none',
		},
	},
	indicator: {
		width: '3px',
		borderRadius: '10px',
		backgroundColor: 'var(--primary-dark-color)',
	},
})

function CinemaSystemTabs({ cinemaSystemList }) {
	const classes = useStyles()
	const [cinemaSystemTab, setCinemaSystemTab] = useState(0)

	return (
		<div className="cinema-system-tabs">
			<div className="container">
				<div className="cinema-system-tabs__wrap">
					<div className="cinema-system-tabs__header">
						<Tabs
							orientation="vertical"
							variant="scrollable"
							value={cinemaSystemTab}
							onChange={(event, newValue) => {
								setCinemaSystemTab(newValue)
							}}
							aria-label="Vertical tabs example"
							sx={{ borderRight: 1, borderColor: 'divider' }}
							classes={{
								indicator: classes.indicator,
							}}
						>
							{cinemaSystemList.map((cinemaSystem, index) => (
								<Tab
									key={index}
									label={
										<img
											src={cinemaSystem.logo}
											alt={cinemaSystem.tenHeThongRap}
										/>
									}
									{...a11yProps(index)}
									classes={{
										root: classes.root,
									}}
								/>
							))}
						</Tabs>
					</div>
					<div className="cinema-system-tabs__body">
						{cinemaSystemList.map((cinemaSystem, index) => (
							<TabPanel
								key={cinemaSystem.maHeThongRap}
								value={cinemaSystemTab}
								index={index}
							>
								<CinemaTabs cinemaList={cinemaSystem.lstCumRap} />
							</TabPanel>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CinemaSystemTabs
