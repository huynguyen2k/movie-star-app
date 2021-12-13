import React from 'react'
import './style.scss'
import { animateScroll as scroll } from 'react-scroll'
import ArrowUp from '@material-ui/icons/KeyboardArrowUp'

function ScrollToTop() {
	return (
		<span
			className="scroll-to-top"
			onClick={() =>
				scroll.scrollToTop({
					duration: 500,
				})
			}
		>
			<ArrowUp />
		</span>
	)
}

export default ScrollToTop
