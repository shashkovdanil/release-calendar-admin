import React, { useState, useEffect, useRef } from 'react'
import {
  FormControl,
  InputLabel,
  Select as MSelect,
  MenuItem,
} from '@material-ui/core'

function Select({ name, items, value, onChange }) {
  const [labelWidth, setLabelWidth] = useState(0)
  const inputLabel = useRef(null)

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <FormControl variant="outlined" style={{ width: '100%' }}>
      <InputLabel ref={inputLabel} id={name}>
        Месяц релиза
      </InputLabel>
      <MSelect
        labelWidth={labelWidth}
        labelId={name}
        id={name}
        value={value}
        onChange={onChange}
      >
        {items.map((i, index) => (
          <MenuItem value={i} key={`${name}_${index}`}>
            {i}
          </MenuItem>
        ))}
      </MSelect>
    </FormControl>
  )
}

export default Select
