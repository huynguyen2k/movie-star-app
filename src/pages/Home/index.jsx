import React from 'react'
import './style.scss'
// HOOKS
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// COMPONENTS
import MobileApp from 'components/MobileApp'
import HeroCarousel from 'components/HeroCarousel'
import MovieTab from 'components/MovieTab'
import CinemaSystemTabs from 'components/CinemaSystemTabs'
import ScrollToTop from 'components/ScrollToTop'
// ACTIONS
import { getMovieList } from 'app/slices/movieSlice'
import { getShowtimesOfCinemaSystem } from 'app/slices/cinemaSlice'
import useLoading from 'hooks/useLoading'
import Loading from 'components/Loading'

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
const slides = [
	'./assets/images/mobile/slide1.jpg',
	'./assets/images/mobile/slide2.jpg',
	'./assets/images/mobile/slide3.jpg',
	'./assets/images/mobile/slide4.jpg',
	'./assets/images/mobile/slide5.jpg',
	'./assets/images/mobile/slide6.jpg',
	'./assets/images/mobile/slide7.jpg',
	'./assets/images/mobile/slide8.jpg',
	'./assets/images/mobile/slide9.jpg',
	'./assets/images/mobile/slide10.jpg',
	'./assets/images/mobile/slide11.jpg',
	'./assets/images/mobile/slide12.jpg',
	'./assets/images/mobile/slide13.jpg',
	'./assets/images/mobile/slide14.jpg',
	'./assets/images/mobile/slide15.jpg',
	'./assets/images/mobile/slide16.jpg',
]

const HomePage = () => {
	const [loading] = useLoading()
	const [scroll, setScroll] = useState(false)

	const dispatch = useDispatch()
	const movieList = useSelector(state => state.movie.movieList)
	const cinemaSystemList = useSelector(state => state.cinema.cinemaSystemList)

	useEffect(() => {
		dispatch(getMovieList())
		dispatch(getShowtimesOfCinemaSystem())
	}, [dispatch])

	useEffect(() => {
		window.onscroll = () => {
			if (window.scrollY > 400) {
				setScroll(true)
			} else {
				setScroll(false)
			}
		}
		return () => {
			window.onscroll = null
		}
	}, [])

	return (
		<div className="home-page">
			{loading && <Loading />}

			<HeroCarousel movieList={movieBanners} />

			<section className="home-page__section">
				<MovieTab tabList={tabList} movieList={movieList} />
			</section>

			<section className="home-page__section">
				<CinemaSystemTabs cinemaSystemList={cinemaSystemList} />
			</section>

			<section className="home-page__section">
				<MobileApp slides={slides} />
			</section>

			{scroll && <ScrollToTop />}
		</div>
	)
}

export default HomePage
