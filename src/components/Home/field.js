import React from 'react'
import { FastField as FormikField } from 'formik'
import { TextField } from '@material-ui/core'

function Field({ validate, ...rest }) {
  return (
    <FormikField name={rest.name} validate={validate}>
      {({ meta, field }) => (
        <TextField
          variant="outlined"
          id={rest.name}
          error={meta.error && meta.touched}
          helperText={meta.error}
          style={{
            width: 360,
          }}
          {...field}
          onChange={e => {
            rest.onChange(e)
          }}
          {...rest}
        />
      )}
    </FormikField>
  )
}

export default Field
