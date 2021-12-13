import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// UTILS
import moment from 'moment'

MovieDetailTable.propTypes = {
	movie: PropTypes.object,
}

MovieDetailTable.defaultProps = {
	movie: null,
}

function MovieDetailTable({ movie }) {
	if (!movie) return null
	return (
		<div className="movie-detail-table">
			<div className="movie-detail-table__left">
				<div className="movie-detail-table__row">
					<h3 className="movie-detail-table__col-title">Ngày công chiếu</h3>
					<p className="movie-detail-table__col-content">
						{moment(movie.ngayKhoiChieu, 'YYYY/MM/DD', false).format(
							'DD.MM.YYYY'
						)}
					</p>
				</div>
				<div className="movie-detail-table__row">
					<h3 className="movie-detail-table__col-title">Tên phim</h3>
					<p className="movie-detail-table__col-content">{movie.tenPhim}</p>
				</div>
				<div className="movie-detail-table__row">
					<h3 className="movie-detail-table__col-title">Thời lượng</h3>
					<p className="movie-detail-table__col-content">
						{movie.thoiLuong} phút
					</p>
				</div>
				<div className="movie-detail-table__row">
					<h3 className="movie-detail-table__col-title">Đánh giá</h3>
					<p className="movie-detail-table__col-content">
						{movie.danhGia} IMDb
					</p>
				</div>
				<div className="movie-detail-table__row">
					<h3 className="movie-detail-table__col-title">Thể loại</h3>
					<p className="movie-detail-table__col-content">
						Khoa học - viễn tưởng
					</p>
				</div>
				<div className="movie-detail-table__row">
					<h3 className="movie-detail-table__col-title">Định dạng</h3>
					<p className="movie-detail-table__col-content">2D/Digital</p>
				</div>
				<div className="movie-detail-table__row">
					<h3 className="movie-detail-table__col-title">Quốc gia SX</h3>
					<p className="movie-detail-table__col-content">Việt Nam</p>
				</div>
			</div>
			<div className="movie-detail-table__right">
				<h3 className="movie-detail-table__right-title">Nội dung</h3>
				<p className="movie-detail-table__right-content">{movie.moTa}</p>
			</div>
		</div>
	)
}

export default MovieDetailTable
