import React from 'react'
// HOOKS
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// COMPONENTS
import HeroCarousel from 'components/HeroCarousel'
import MovieTab from 'components/MovieTab'
import CinemaSystemTabs from 'components/CinemaSystemTabs'
// ACTIONS
import { getMovieList } from 'app/slices/movieSlice'
import { getShowtimesOfCinemaSystem } from 'app/slices/cinemaSlice'

const movieBanners = [
	{
		id: 1,
		image: 'assets/images/movies/movie_01.jpg',
		trailer: 'https://www.youtube.com/embed/iVAgTiBrrDA',
		name: 'The Hobbit: The Battle of the Five Armies',
		type: 'ACTION, ADVENTURE, FANTASY',
		description:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, architecto porro fugiat dolore consequatur quo, temporibus voluptatem, facilis modi eos labore autem perspiciatis aliquid. Voluptatibus earum amet tempora itaque ducimus.',
	},
	{
		id: 2,
		image: 'assets/images/movies/movie_02.jpg',
		trailer: 'https://www.youtube.com/embed/ZgQkEf3dQ08',
		name: 'Pirates of the Caribbean 5',
		type: 'ACTION, ADVENTURE, FANTASY',
		description:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, architecto porro fugiat dolore consequatur quo, temporibus voluptatem, facilis modi eos labore autem perspiciatis aliquid. Voluptatibus earum amet tempora itaque ducimus.',
	},
	{
		id: 3,
		image: 'assets/images/movies/movie_03.jpg',
		trailer: 'https://www.youtube.com/embed/2Rxoz13Bthc',
		name: 'World of Warcraft',
		type: 'ACTION, ADVENTURE, FANTASY',
		description:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, architecto porro fugiat dolore consequatur quo, temporibus voluptatem, facilis modi eos labore autem perspiciatis aliquid. Voluptatibus earum amet tempora itaque ducimus.',
	},
]
const tabList = [
	{
		id: 1,
		label: 'Đang Chiếu',
		value: 'dangChieu',
	},
	{
		id: 2,
		label: 'Sắp Chiếu',
		value: 'sapChieu',
	},
]

const HomePage = () => {
	const dispatch = useDispatch()
	const movieList = useSelector(state => state.movie.movieList)
	const cinemaSystemList = useSelector(state => state.cinema.cinemaSystemList)

	useEffect(() => {
		dispatch(getMovieList())
		dispatch(getShowtimesOfCinemaSystem())
	}, [dispatch])

	return (
		<>
			<HeroCarousel movieList={movieBanners} />
			<MovieTab tabList={tabList} movieList={movieList} />
			<CinemaSystemTabs cinemaSystemList={cinemaSystemList} />
		</>
	)
}

export default HomePage
