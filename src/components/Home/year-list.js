import React from 'react'
import { List, ListItem, IconButton, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import last from 'lodash/last'

function YearList({ years, type, children, values, setValues }) {
  return years.map((year, index) => {
    const months = Object.keys(values[type][year])
    const lastMonth = +last(months) + 1 || 0
    const hasAddMonthButton = lastMonth <= 11
    const hasDeleteYearButton = last(years) === year

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
                const copyValues = { ...values }

                copyValues[type][year][lastMonth] = {}
                setValues(copyValues)
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
            {years.length > 1 && (
              <IconButton
                onClick={() => {
                  const copyValues = { ...values }
                  delete copyValues[type][year]
                  setValues(copyValues)
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
