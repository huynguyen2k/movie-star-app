import { Box, Dialog, IconButton, makeStyles } from '@material-ui/core'
import Tab from '@material-ui/core/Tab'
// COMPONENTS
import Tabs from '@material-ui/core/Tabs'
import CloseIcon from '@material-ui/icons/CloseRounded'
import cinemaAPI from 'api/cinemaAPI'
import {
	addNewComment,
	deleteComment,
	updateCommentLike,
} from 'app/slices/commentSlice'
import CommentBox from 'components/CommentBox'
import CommentList from 'components/CommentList'
import CommentForm from 'components/Forms/CommentForm'
import MovieDetailTable from 'components/MovieDetailTable'
import MovieShowtimes from 'components/MovieShowtimes'
import TabPanel from 'components/TabPanel'
import moment from 'moment'
import queryString from 'query-string'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import alert from 'utils/alert'
import sleep from 'utils/sleep'
import './style.scss'

const useStyles = makeStyles({
	indicator: {
		backgroundColor: 'var(--primary-color)',
		borderRadius: '4px',
		height: '3px',
	},
	tabRoot: {
		padding: '8px 12px',
		fontSize: '1.125rem',
		fontWeight: '400',
	},
	selectedTab: {
		pointerEvents: 'none',
	},
	commentTab: {
		width: '580px',
		maxWidth: '100%',
		margin: '0 auto',
	},
	dialog: {
		'& .MuiPaper-root': {
			backgroundColor: 'transparent',
			boxShadow: 'none',
		},
	},
	dialogContentBox: {
		padding: '20px',
		backgroundColor: 'inherit',
	},
	dialogRound: {
		position: 'relative',
		borderRadius: '6px',
		backgroundColor: 'white',
	},
	closeDialogBtn: {
		position: 'absolute',
		top: '0',
		right: '0',
		transform: 'translate(50%, -50%)',
		border: '2px solid var(--orange)',
		color: 'var(--orange)',
		backgroundColor: '#333',

		'&:hover': {
			backgroundColor: '#333',
		},
	},
})

const tabList = [
	{
		id: 1,
		name: 'lịch chiếu',
		alias: 'lich-chieu',
	},
	{
		id: 2,
		name: 'thông tin',
		alias: 'thong-tin',
	},
	{
		id: 3,
		name: 'đánh giá',
		alias: 'danh-gia',
	},
]

function NavTabs() {
	const classes = useStyles()
	const history = useHistory()
	const location = useLocation()
	const { movieId } = useParams()

	const [value, setValue] = useState(1)
	const [open, setOpen] = useState(false)
	const [movieShowtimes, setMovieShowtimes] = useState([])

	const dispatch = useDispatch()
	const loginUser = useSelector(state => state.auth.user)
	const loggedIn = useSelector(state => state.auth.loggedIn)
	const movie = useSelector(state => state.movie.movieInfo)
	const commentList = useSelector(state => state.comment.commentList)

	const queryParams = useMemo(() => {
		const params = queryString.parse(location.search)
		return {
			...params,
			tabName: params.tabName || 'lich-chieu',
		}
	}, [location.search])

	useEffect(() => {
		;(async () => {
			const data = await cinemaAPI.getShowtimesOfMovie(movieId)
			setMovieShowtimes(data.content.heThongRapChieu)
		})()
	}, [movieId])

	useEffect(() => {
		const index = tabList.findIndex(
			tabItem => tabItem.alias === queryParams.tabName
		)

		if (index >= 0) {
			setValue(tabList[index].id)
		}
	}, [queryParams])

	const filteredComments = useMemo(() => {
		return commentList.filter(comment => comment.movieId === parseInt(movieId))
	}, [commentList, movieId])

	const handleLikeClick = commentId => {
		if (!loggedIn) {
			history.push('/dang-nhap')
			return
		}

		dispatch(
			updateCommentLike({
				commentId,
				username: loginUser.taiKhoan,
			})
		)
	}

	const handleDialogClose = () => {
		setOpen(false)
	}

	const handleCommentClick = () => {
		if (!loggedIn) {
			history.push('/dang-nhap')
			return
		}

		setOpen(true)
	}

	const handleCommentSubmit = async formValues => {
		const newComment = {
			...formValues,
			id: Date.now(),
			avatar: '',
			movieId: parseInt(movieId),
			likeList: [],
			fullName: loginUser.hoTen,
			username: loginUser.taiKhoan,
			createdOn: moment(new Date()).format('DD-MM-YYYYTHH:mm:ss'),
		}

		await sleep(1000)
		dispatch(addNewComment(newComment))
		setOpen(false)
	}

	const handleCommentDelete = async commentId => {
		const response = await alert.confirmAlert(
			'Bạn có chắc là muốn xóa bình luận này không?'
		)

		if (response.isConfirmed) {
			dispatch(deleteComment(commentId))
			alert.successAlert('Bạn đã xóa bình luận này thành công!')
		}
	}

	const handleTabItemChange = (e, newValue) => {
		const index = tabList.findIndex(tabItem => tabItem.id === newValue)

		if (index >= 0) {
			history.push({
				pathname: location.pathname,
				search: queryString.stringify({
					tabName: tabList[index].alias,
				}),
			})
		}
	}

	return (
		<div className="nav-tabs">
			<div className="container">
				<div className="nav-tabs__header">
					<Tabs
						centered
						value={value}
						onChange={handleTabItemChange}
						classes={{
							indicator: classes.indicator,
						}}
					>
						{tabList.map(tab => (
							<Tab
								key={tab.id}
								disableRipple
								value={tab.id}
								label={tab.name}
								classes={{
									root: classes.tabRoot,
									selected: classes.selectedTab,
								}}
							/>
						))}
					</Tabs>
				</div>

				<div className="nav-tabs__body">
					<TabPanel index={1} value={value}>
						<MovieShowtimes movieShowtimes={movieShowtimes} />
					</TabPanel>

					<TabPanel index={2} value={value}>
						<MovieDetailTable movie={movie} />
					</TabPanel>

					<TabPanel index={3} value={value}>
						<Box className={classes.commentTab}>
							<CommentBox loginUser={loginUser} onClick={handleCommentClick} />

							<CommentList
								limit={5}
								loginUser={loginUser}
								commentList={filteredComments}
								onLike={handleLikeClick}
								onDelete={handleCommentDelete}
							/>
						</Box>
					</TabPanel>
				</div>
			</div>

			<Dialog
				open={open}
				scroll="body"
				maxWidth={false}
				className={classes.dialog}
			>
				<Box className={classes.dialogContentBox}>
					<Box className={classes.dialogRound}>
						<IconButton
							size="small"
							onClick={handleDialogClose}
							className={classes.closeDialogBtn}
						>
							<CloseIcon color="inherit" />
						</IconButton>

						<CommentForm onSubmit={handleCommentSubmit} />
					</Box>
				</Box>
			</Dialog>
		</div>
	)
}

export default NavTabs
