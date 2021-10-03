import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

Modal.propTypes = {
	onCloseModal: PropTypes.func,
}

Modal.defaultProps = {
	onCloseModal: () => {},
}

function Modal({ onCloseModal, children }) {
	function handleCloseModal() {
		onCloseModal()
	}

	function stopPropagation(e) {
		e.stopPropagation()
	}

	return (
		<div className="modal" onClick={handleCloseModal}>
			<div className="modal__content" onClick={stopPropagation}>
				{children}
			</div>
		</div>
	)
}

export default Modal
