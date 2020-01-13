import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { List, ListItem, IconButton, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { removeYear, addMonth } from '../../actions/db'

function YearList({ type, children }) {
  const years = useSelector(state => state.db[type])
  const dispatch = useDispatch()
  const yearList = Object.keys(years)

  return yearList.map((year, index, array) => {
    const months = years[year]
    const hasAddMonthButton = !Object.keys(months).includes('11')
    const hasDeleteYearButton = index === array.length - 1

    return (
      <React.Fragment key={`${type}_${year}`}>
        <ListItem
          style={{ fontSize: '2rem', borderLeft: '2px dashed lightgrey' }}
          alignItems="flex-start"
        >
          {year}
          <List style={{ paddingTop: 48 }}>{children(year)}</List>
        </ListItem>
        {hasAddMonthButton && (
          <ListItem
            style={{
              borderLeft: '2px dashed lightgrey',
              marginBottom: !hasDeleteYearButton ? 24 : 0,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(addMonth(type, year))
              }}
            >
              Добавить месяц
            </Button>
          </ListItem>
        )}
        {hasDeleteYearButton && (
          <ListItem
            style={{
              borderLeft: '2px dashed lightgrey',
              marginBottom: 24,
            }}
          >
            {array.length > 1 && (
              <IconButton
                onClick={() => {
                  dispatch(removeYear(type, year))
                }}
              >
                <Delete />
              </IconButton>
            )}
          </ListItem>
        )}
      </React.Fragment>
    )
  })
}

export default YearList
