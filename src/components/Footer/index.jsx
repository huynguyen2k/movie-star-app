import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

const Footer = () => {
	function renderPartnerList() {
		const result = []
		for (let i = 1; i <= 20; i++) {
			result.push(
				<li key={i} className="partner-item">
					<Link to="/" className="partner-link">
						<img src={`/assets/images/logos/logo-${i}.png`} alt={`logo-${i}`} />
					</Link>
				</li>
			)
		}
		return result
	}

	return (
		<div className="footer">
			<div className="container">
				<div className="row">
					<div className="col-4">
						<h3 className="footer__title">MOVIE STAR</h3>
						<ul className="footer__policy-list">
							<li className="policy-item">
								<Link className="policy-link" to="/">
									FAQ
								</Link>
							</li>
							<li className="policy-item">
								<Link className="policy-link" to="/">
									Brand Guidelines
								</Link>
							</li>
							<li className="policy-item">
								<Link className="policy-link" to="/">
									Thỏa thuận sử dụng
								</Link>
							</li>
							<li className="policy-item">
								<Link className="policy-link" to="/">
									Chính sách bảo mật
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-4">
						<h3 className="footer__title">ĐỐI TÁC</h3>
						<ul className="footer__partner-list">{renderPartnerList()}</ul>
					</div>
					<div className="col-2">
						<h3 className="footer__title">MOBILE APP</h3>
						<ul className="footer__platform-list">
							<li className="platform-item">
								<Link className="platform-link" to="/">
									<img
										src="/assets/images/logos/apple-logo.png"
										alt="Apple logo"
									/>
								</Link>
							</li>
							<li className="platform-item">
								<Link className="platform-link" to="/">
									<img
										src="/assets/images/logos/android-logo.png"
										alt="Android logo"
									/>
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-2">
						<h3 className="footer__title">SOCIAL</h3>
						<ul className="footer__social-list">
							<li className="social-item">
								<Link className="social-link" to="/">
									<img
										src="/assets/images/logos/facebook-logo.png"
										alt="Facebook logo"
									/>
								</Link>
							</li>
							<li className="social-item">
								<Link className="social-link" to="/">
									<img
										src="/assets/images/logos/zalo-logo.png"
										alt="Zalo logo"
									/>
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-12">
						<div className="break-line"></div>
					</div>
					<div className="col-12">
						<h4 className="footer__copyright">&copy; All rights reserved</h4>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
