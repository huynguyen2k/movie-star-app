import React from 'react'
import PropTypes from 'prop-types'
import {
	Avatar,
	Box,
	Button,
	IconButton,
	makeStyles,
	Typography,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import LikeIcon from '@material-ui/icons/ThumbUpAltOutlined'
import StarIcon from '@material-ui/icons/StarRounded'
import StarEmptyIcon from '@material-ui/icons/StarBorderRounded'
import moment from 'moment'
import 'moment/locale/vi'
import classNames from 'classnames'
import DeleteIcon from '@material-ui/icons/DeleteOutline'

const useStyles = makeStyles(theme => ({
	rootBox: {
		marginBottom: '16px',
		borderRadius: '6px',
		padding: '12px 16px',
		color: 'black',
		backgroundColor: 'white',

		'&:last-child': {
			marginBottom: '0',
		},
	},
	profileBox: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	accountBox: {
		display: 'flex',
		alignItems: 'center',
	},
	infoBox: {
		marginLeft: '10px',
	},
	avatar: {
		backgroundColor: theme.palette.success.main,
	},
	ratingBox: {
		textAlign: 'center',
	},
	ratingText: {
		display: 'block',
		color: theme.palette.success.main,
		fontSize: '1.25rem',
		fontWeight: '500',
	},
	commentText: {
		margin: '16px 0',
	},
	btnBox: {
		borderTop: `1px solid ${theme.palette.grey[300]}`,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		color: '#555',
	},
	likeButton: {
		marginTop: '4px',

		'&.active': {
			color: '#2078f4',
		},
	},
	likeText: {
		marginLeft: '6px',
		textTransform: 'none',
	},
}))

CommentItem.propTypes = {
	loginUser: PropTypes.object,
	comment: PropTypes.object,
	onLike: PropTypes.func,
	onDelete: PropTypes.func,
}

CommentItem.defaultProps = {
	loginUser: null,
	comment: null,
	onLike: null,
	onDelete: null,
}

function CommentItem({ loginUser, comment, onLike, onDelete }) {
	const classes = useStyles()

	const handleLikeClick = () => {
		if (onLike && comment) {
			onLike(comment.id)
		}
	}

	const handleDeleteClick = () => {
		if (onDelete && comment) {
			onDelete(comment.id)
		}
	}

	if (!comment) return null
	return (
		<Box className={classes.rootBox}>
			<Box className={classes.profileBox}>
				<Box className={classes.accountBox}>
					{!!comment.avatar ? (
						<Avatar src={comment.avatar} alt={comment.fullName} />
					) : (
						<Avatar className={classes.avatar}>
							{comment.fullName.slice(0, 1).toUpperCase()}
						</Avatar>
					)}

					<Box className={classes.infoBox}>
						<Typography component="h4" variant="subtitle2">
							{comment.fullName}
						</Typography>

						<Typography component="span" variant="body2">
							{moment(
								comment.createdOn,
								'DD-MM-YYYYTHH:mm:ss',
								'vi',
								true
							).fromNow()}
						</Typography>
					</Box>
				</Box>

				<Box className={classes.ratingBox}>
					<Typography component="span" className={classes.ratingText}>
						{comment.rating}
					</Typography>

					<Rating
						readOnly
						size="medium"
						name="rating-movie"
						max={5}
						precision={0.5}
						value={comment.rating / 2}
						icon={<StarIcon fontSize="inherit" />}
						emptyIcon={<StarEmptyIcon fontSize="inherit" />}
					/>
				</Box>
			</Box>

			<Typography className={classes.commentText}>{comment.content}</Typography>

			<Box className={classes.btnBox}>
				<Button
					className={classNames(classes.likeButton, {
						active:
							!!loginUser && comment.likeList.includes(loginUser.taiKhoan),
					})}
					onClick={handleLikeClick}
					color="inherit"
				>
					<LikeIcon />

					<Typography component="span" className={classes.likeText}>
						{comment.likeList.length} Thích
					</Typography>
				</Button>

				{!!loginUser && loginUser.taiKhoan === comment.username && (
					<IconButton color="inherit" onClick={handleDeleteClick}>
						<DeleteIcon />
					</IconButton>
				)}
			</Box>
		</Box>
	)
}

export default CommentItem
