import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@material-ui/core'
import { useController } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@material-ui/icons'

PasswordField.propTypes = {
	name: PropTypes.string.isRequired,
	form: PropTypes.object.isRequired,

	label: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
}

PasswordField.defaultProps = {
	label: '',
	placeholder: '',
	disabled: false,
}

function PasswordField(props) {
	const { name, form, label, placeholder, disabled } = props
	const { field, fieldState } = useController({
		name,
		control: form.control,
	})

	const [showPassword, setShowPassword] = useState(false)

	return (
		<FormControl
			fullWidth
			variant="outlined"
			size="medium"
			margin="none"
			disabled={disabled}
			error={fieldState.invalid}
		>
			<InputLabel>{label}</InputLabel>
			<OutlinedInput
				type={showPassword ? 'text' : 'password'}
				label={label}
				placeholder={placeholder}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							edge="end"
							disableFocusRipple
							onClick={() => setShowPassword(value => !value)}
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				}
				{...field}
			/>
			<FormHelperText>{fieldState.error?.message}</FormHelperText>
		</FormControl>
	)
}

export default PasswordField
