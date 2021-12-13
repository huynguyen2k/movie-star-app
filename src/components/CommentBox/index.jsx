import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import StarIcon from '@material-ui/icons/StarRounded'
import UserIcon from '@material-ui/icons/PersonRounded'

const useStyles = makeStyles(theme => ({
	rootBox: {
		marginBottom: '16px',
		borderRadius: '6px',
		color: 'black',
		backgroundColor: 'white',
	},
	commentBox: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '12px 16px',
		cursor: 'pointer',
		userSelect: 'none',
	},
	profileBox: {
		display: 'flex',
		alignItems: 'center',
	},
	avatar: {
		marginRight: '6px',
		color: 'white',
		backgroundColor: theme.palette.success.main,
	},
	placeholder: {
		color: '#777',
		fontSize: '1rem',
	},
}))

CommentBox.propTypes = {
	loginUser: PropTypes.object,
	onClick: PropTypes.func,
}

CommentBox.defaultProps = {
	loginUser: null,
	onClick: null,
}

function CommentBox({ loginUser, onClick }) {
	const classes = useStyles()

	const handleCommentClick = () => {
		if (onClick) {
			onClick()
		}
	}

	return (
		<Box className={classes.rootBox}>
			<Box className={classes.commentBox} onClick={handleCommentClick}>
				<Box className={classes.profileBox}>
					{!!loginUser ? (
						<Avatar className={classes.avatar}>
							{loginUser.hoTen.slice(0, 1).toUpperCase()}
						</Avatar>
					) : (
						<Avatar className={classes.avatar}>
							<UserIcon color="inherit" />
						</Avatar>
					)}

					<Typography className={classes.placeholder} component="span">
						Bạn nghĩ gì về phim này?
					</Typography>
				</Box>

				<Box>
					<Rating
						readOnly
						value={5}
						size="large"
						max={5}
						precision={0.5}
						disabled
						icon={<StarIcon fontSize="inherit" />}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default CommentBox
