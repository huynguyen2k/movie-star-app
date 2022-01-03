import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

function AutoScrollToTop({ history, children }) {
	useEffect(() => {
		const unlisten = history.listen(location => {
			const regex =
				/^\/chi-tiet-phim\/\d+\?tabName=(lich-chieu|thong-tin|danh-gia)$/gi
			const url = `${location.pathname}${location.search}`

			if (regex.test(url)) {
				return
			}

			window.scrollTo(0, 0)
		})
		return () => {
			unlisten()
		}
	}, [history])

	return <>{children}</>
}

export default withRouter(AutoScrollToTop)
