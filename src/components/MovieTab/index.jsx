import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// COMPONENTS
import GridCarousel from 'components/GridCarousel'

MovieTab.propTypes = {
	tabList: PropTypes.array,
	movieList: PropTypes.array,
}

MovieTab.defaultProps = {
	tabList: [],
	movieList: [],
}

function MovieTab({ tabList, movieList }) {
	const [movieTab, setMovieTab] = useState({
		tabValue: null,
		movieList: [],
	})

	useEffect(() => {
		if (tabList.length > 0) {
			setMovieTab({
				tabValue: tabList[0].value,
				movieList: movieList.filter(movie => movie[tabList[0].value]),
			})
			return
		}

		setMovieTab({
			tabValue: null,
			movieList,
		})
	}, [movieList, tabList])

	function renderTabList() {
		if (!tabList.length) return

		return tabList.map(tabItem => {
			return (
				<h3
					key={tabItem.id}
					className={
						tabItem.value === movieTab.tabValue
							? 'tab-title active'
							: 'tab-title'
					}
					onClick={() =>
						setMovieTab({
							tabValue: tabItem.value,
							movieList: movieList.filter(movie => movie[tabItem.value]),
						})
					}
				>
					{tabItem.label}
				</h3>
			)
		})
	}

	return (
		<div className="movie-tab">
			<div className="container">
				<div className="movie-tab__header">{renderTabList()}</div>
				<div className="movie-tab__body">
					<GridCarousel movieList={movieTab.movieList} />
				</div>
			</div>
		</div>
	)
}

export default MovieTab
