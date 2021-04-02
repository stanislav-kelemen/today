import React from 'react'

import style from './Input.module.scss'
import TextField from '@material-ui/core/TextField';

const Input = ({ handleChange }) => {
    return (
                <TextField
                  className={style.input}
                  id="outlined-full-width"
                  placeholder={`Enter your Name`}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={handleChange}
                />
    )
}

export default Input
