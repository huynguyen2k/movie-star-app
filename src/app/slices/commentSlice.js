import { createSlice } from '@reduxjs/toolkit'

const commentSlice = createSlice({
	name: 'comment',
	initialState: {
		commentList: JSON.parse(localStorage.getItem('commentList')) ?? [],
	},
	reducers: {
		addNewComment: (state, action) => {
			state.commentList.unshift(action.payload)
			localStorage.setItem('commentList', JSON.stringify(state.commentList))
		},
		updateCommentLike: (state, action) => {
			const { commentId, username } = action.payload
			const index = state.commentList.findIndex(
				comment => comment.id === commentId
			)

			if (index >= 0) {
				const likeList = state.commentList[index].likeList
				const usernameIndex = likeList.indexOf(username)

				if (usernameIndex >= 0) {
					likeList.splice(usernameIndex, 1)
					localStorage.setItem('commentList', JSON.stringify(state.commentList))
				} else {
					likeList.push(username)
					localStorage.setItem('commentList', JSON.stringify(state.commentList))
				}
			}
		},
		deleteComment: (state, action) => {
			const index = state.commentList.findIndex(
				comment => comment.id === action.payload
			)

			if (index >= 0) {
				state.commentList.splice(index, 1)
				localStorage.setItem('commentList', JSON.stringify(state.commentList))
			}
		},
	},
	extraReducers: {},
})

const { reducer, actions } = commentSlice

export const { updateCommentLike, addNewComment, deleteComment } = actions
export default reducer
