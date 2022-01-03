// ACTIONS
import { getMovieInfo } from 'app/slices/movieSlice'
import NavTabs from 'components/NavTabs'
// COMPONENTS
import TopDetail from 'components/TopDetail'
import Loading from 'components/Loading'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// HOOKS
import { useParams } from 'react-router'
import './style.scss'
import useLoading from 'hooks/useLoading'

function MovieDetailPage() {
	const { movieId } = useParams()

	const [loading] = useLoading()
	const dispatch = useDispatch()
	const movie = useSelector(state => state.movie.movieInfo)
	const commentList = useSelector(state => state.comment.commentList)

	const movieDetail = useMemo(() => {
		if (!Array.isArray(commentList) || !movie) return null

		const filteredComments = commentList.filter(
			comment => comment.movieId === movie.maPhim
		)

		const totalRating = filteredComments.reduce(
			(result, comment) => result + comment.rating,
			0
		)
		const avgRating = parseFloat(
			(totalRating / filteredComments.length).toFixed(1)
		)

		const movieDetail = {
			...movie,
			rating: Number.isNaN(avgRating) ? 0 : avgRating,
			ratingNumber: filteredComments.length,
		}

		return movieDetail
	}, [movie, commentList])

	useEffect(() => {
		dispatch(getMovieInfo(movieId))
	}, [dispatch, movieId])

	return (
		<div className="movie-detail-page">
			{loading && <Loading />}

			<TopDetail movie={movieDetail} />
			<NavTabs />
		</div>
	)
}

export default MovieDetailPage
