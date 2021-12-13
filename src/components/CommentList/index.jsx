import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CommentItem from 'components/CommentItem'
import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core'
import sleep from 'utils/sleep'

const useStyles = makeStyles(theme => ({
	commentList: {},
	btnBox: {
		display: 'flex',
		justifyContent: 'center',
	},
	loadMoreBtn: {
		marginTop: '16px',
		color: 'white',
		backgroundColor: 'var(--orange)',
		textTransform: 'none',

		'&:hover': {
			color: 'white',
			backgroundColor: 'var(--dark-orange)',
		},
		'&.Mui-disabled': {
			color: 'white',
			backgroundColor: 'var(--orange)',
			opacity: 1,
		},
	},
}))

CommentList.propTypes = {
	limit: PropTypes.number,
	loginUser: PropTypes.object,
	commentList: PropTypes.array,
	onLike: PropTypes.func,
	onDelete: PropTypes.func,
}

CommentList.defaultProps = {
	limit: 5,
	loginUser: null,
	commentList: [],
	onLike: null,
	onDelete: null,
}

function CommentList({ limit, loginUser, commentList, onLike, onDelete }) {
	const classes = useStyles()
	const [value, setValue] = useState(1)
	const [loading, setLoading] = useState(false)

	const handleLoadMore = async () => {
		setLoading(true)
		await sleep(1000)

		setValue(prevValue => prevValue + 1)
		setLoading(false)
	}

	return (
		<Box>
			<Box className={classes.commentList}>
				{commentList.slice(0, limit * value).map(comment => (
					<CommentItem
						key={comment.id}
						loginUser={loginUser}
						comment={comment}
						onLike={onLike}
						onDelete={onDelete}
					/>
				))}
			</Box>
			<Box className={classes.btnBox}>
				{value * limit < commentList.length && (
					<Button
						className={classes.loadMoreBtn}
						onClick={handleLoadMore}
						variant="contained"
						size="large"
						disabled={loading}
					>
						{loading ? (
							<CircularProgress color="inherit" size={26} thickness={3} />
						) : (
							'Tải thêm'
						)}
					</Button>
				)}
			</Box>
		</Box>
	)
}

export default CommentList
