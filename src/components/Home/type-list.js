import React from 'react'
import { Typography, List, Button } from '@material-ui/core'
import last from 'lodash/last'

const types = [
  { type: 'films', title: 'Фильмы' },
  { type: 'games', title: 'Игры' },
]

function TypeList({ children, values, setValues }) {
  return types.map(({ type, title }) => (
    <React.Fragment key={type}>
      <Typography
        style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginTop: 48,
        }}
        component="h2"
      >
        {title}
      </Typography>
      <List style={{ marginLeft: 48 }}>{children(type)}</List>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          const copyValues = { ...values }
          const years = Object.keys(values[type])

          const lastYear = +last(years) + 1 || new Date().getFullYear()

          copyValues[type][lastYear] = {
            '0': {},
          }
          setValues(copyValues)
        }}
      >
        Добавить год
      </Button>
    </React.Fragment>
  ))
}

export default TypeList
