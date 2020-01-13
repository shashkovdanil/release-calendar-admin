import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { List, ListItem, Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import last from 'lodash/last'
import { removeMonth, setMonthBackground, addRelease } from '../../actions/db'
import { cloudinary as config } from '../../constants/config'

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

function MonthList({ type, year, children }) {
  const dispatch = useDispatch()
  const months = useSelector(state => state.db[type][year])
  const monthList = Object.keys(months)

  return monthList.map((month, index, array) => (
    <Fragment key={`${type}_${year}_${month}`}>
      <ListItem style={{ fontSize: '1.6rem' }} alignItems="flex-start">
        <div>
          {monthsList[month]}
          <div style={{ display: 'flex', flexDirection: 'column', width: 360 }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: 12 }}
              type="button"
              onClick={() => {
                window.cloudinary
                  .createUploadWidget(config, (error, result) => {
                    if (!error && result && result.event === 'success') {
                      dispatch(
                        setMonthBackground(
                          type,
                          year,
                          month,
                          result.info.secure_url,
                        ),
                      )
                    }
                  })
                  .open()
              }}
            >
              Загрузить обложку месяца
            </Button>
            <img
              style={{ maxWidth: '100%', marginTop: 12 }}
              src={months[month].main}
              alt=""
            />
          </div>
        </div>
        <List style={{ paddingTop: 30 }}>{children(month)}</List>
      </ListItem>
      <ListItem>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(addRelease(type, year, month))
          }}
        >
          Добавить релиз
        </Button>
      </ListItem>
      <ListItem>
        {last(array) === month && array.length > 1 && (
          <IconButton
            onClick={() => {
              dispatch(removeMonth(type, year, month))
            }}
          >
            <Delete />
          </IconButton>
        )}
      </ListItem>
    </Fragment>
  ))
}

export default MonthList
