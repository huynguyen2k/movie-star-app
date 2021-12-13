import React from 'react'
import PropTypes from 'prop-types'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import StarIcon from '@material-ui/icons/StarRounded'
import { useController } from 'react-hook-form'

const useStyles = makeStyles(theme => ({
	rootBox: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	rating: {
		fontSize: '2.5rem',

		'& .MuiRating-iconEmpty': {
			color: theme.palette.grey[300],
		},
	},
	text: {
		fontSize: '1.5rem',
		fontWeight: '500',
		color: '#555',
	},
}))

RatingField.propTypes = {
	name: PropTypes.string.isRequired,
	form: PropTypes.object.isRequired,
}

function RatingField(props) {
	const classes = useStyles()
	const { name, form } = props

	const { field } = useController({
		name,
		control: form.control,
	})

	const handleChange = (event, value) => {
		const { name } = event.target
		form.setValue(name, parseInt(value * 2))
	}

	return (
		<Box className={classes.rootBox}>
			<Rating
				name={name}
				value={field.value / 2}
				onChange={handleChange}
				max={5}
				precision={0.5}
				size="large"
				icon={<StarIcon fontSize="inherit" />}
				className={classes.rating}
			/>

			<Typography component="span" className={classes.text}>
				{field.value} / 10
			</Typography>
		</Box>
	)
}

export default RatingField
