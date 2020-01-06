import React from 'react'
import { List, ListItem, Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import last from 'lodash/last'
import nanoid from 'nanoid'

const monthsList = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

function MonthList({ months, type, year, children, values, setValues }) {
  return months.map(month => (
    <React.Fragment key={`${type}_${year}_${month}`}>
      <ListItem style={{ fontSize: '1.6rem' }} alignItems="flex-start">
        {monthsList[month]}
        <List style={{ paddingTop: 30 }}>{children(month)}</List>
      </ListItem>
      <ListItem>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            const id = nanoid(8)
            const copyValues = {
              ...values,
            }
            copyValues[type][year][month][id] = {
              name: '',
              cover: '',
              release_day: '1',
              info: '',
              width: '160',
            }
            setValues(copyValues)
          }}
        >
          Добавить релиз
        </Button>
      </ListItem>
      <ListItem>
        {last(months) === month && months.length > 1 && (
          <IconButton
            onClick={() => {
              const copyValues = { ...values }
              delete copyValues[type][year][month]
              setValues(copyValues)
            }}
          >
            <Delete />
          </IconButton>
        )}
      </ListItem>
    </React.Fragment>
  ))
}

export default MonthList
