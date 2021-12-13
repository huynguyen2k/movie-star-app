import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// COMPONENTS
import Slider from 'react-slick'

const settings = {
	dots: false,
	arrows: false,
	infinite: true,
	autoplay: true,
	autoplaySpeed: 2000,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
}

MobileApp.propTypes = {
	slides: PropTypes.array,
}

MobileApp.defaultProps = {
	slides: [],
}

function MobileApp({ slides }) {
	return (
		<div className="mobile-app" id="app">
			<div className="container mobile-app__container">
				<div className="row align-items-center">
					<div className="col-6">
						<div className="mobile-app__intro">
							<h3 className="title">
								Ứng dụng tiện lợi dành cho người yêu điện ảnh
							</h3>
							<p className="subtitle">
								Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
								và đổi quà hấp dẫn.
							</p>
							<button className="download-btn">
								App miễn phí - Tải về ngay!
							</button>
							<p className="version">
								Movie Star có hai phiên bản iOS & Android
							</p>
						</div>
					</div>
					<div className="col-6">
						<div className="mobile-app__phone-img">
							<img src="./assets/images/mobile/mobile.png" alt="Mobile" />
							<div className="mobile-slides">
								<Slider {...settings}>
									{slides.map((slide, index) => (
										<div key={index} className="slide">
											<img src={slide} alt={`slide${index}`} />
										</div>
									))}
								</Slider>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MobileApp
