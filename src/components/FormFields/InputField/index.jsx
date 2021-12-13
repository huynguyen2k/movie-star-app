import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { useController } from 'react-hook-form'

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	form: PropTypes.object.isRequired,

	label: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	multiline: PropTypes.bool,
	minRows: PropTypes.number,
	maxRows: PropTypes.number,
}

InputField.defaultProps = {
	label: '',
	placeholder: '',
	disabled: false,
	multiline: false,
	minRows: 1,
	maxRows: 1,
}

function InputField(props) {
	const {
		name,
		form,
		label,
		placeholder,
		disabled,
		multiline,
		minRows,
		maxRows,
	} = props
	const { field, fieldState } = useController({
		name,
		control: form.control,
	})

	return (
		<TextField
			type="text"
			fullWidth
			variant="outlined"
			size="medium"
			label={label}
			placeholder={placeholder}
			disabled={disabled}
			multiline={multiline}
			minRows={minRows}
			maxRows={maxRows}
			error={fieldState.invalid}
			helperText={fieldState.error?.message}
			{...field}
		/>
	)
}

export default InputField
