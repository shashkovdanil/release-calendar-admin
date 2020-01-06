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

function MonthList({
  months,
  type,
  year,
  children,
  values,
  setValues,
  setFieldValue,
}) {
  return months.map(month => {
    const bgWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setFieldValue(`${type}.${year}.${month}.main`, result.info.secure_url)
        }
      },
    )

    return (
      <React.Fragment key={`${type}_${year}_${month}`}>
        <ListItem style={{ fontSize: '1.6rem' }} alignItems="flex-start">
          <div>
            {monthsList[month]}
            <div
              style={{ display: 'flex', flexDirection: 'column', width: 360 }}
            >
              <button
                style={{ marginTop: 12 }}
                type="button"
                className="cloudinary-button"
                onClick={() => {
                  bgWidget.open()
                }}
              >
                Загрузить бэкграунд месяца
              </button>
              <img
                style={{ maxWidth: '100%', marginTop: 12 }}
                src={values[type][year][month].main}
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
    )
  })
}

export default MonthList
