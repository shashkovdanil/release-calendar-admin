import React from 'react'
import { useDispatch } from 'react-redux'
import { Typography, List, Button } from '@material-ui/core'
import { addYear } from '../../actions/db'

const types = [
  { type: 'films', title: 'Фильмы' },
  { type: 'games', title: 'Игры' },
]

function TypeList({ children }) {
  const dispatch = useDispatch()

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
          dispatch(addYear(type))
        }}
      >
        Добавить год
      </Button>
    </React.Fragment>
  ))
}

export default TypeList
