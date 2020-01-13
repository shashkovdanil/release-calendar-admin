import React from 'react'
import { List, ListItem, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { getDaysInMonth } from 'date-fns'
import Field from './field'

function ReleaseList({
  releasesObject,
  type,
  year,
  month,
  handleChange,
  handleBlur,
  values,
  setValues,
  setFieldValue,
}) {
  const releases = Object.keys(releasesObject)

  const date = new Date(`${year}-${+month + 1}-1`)

  const daysQty = getDaysInMonth(date)

  return releases.map((release, index) => {
    const { name, release_day, info, cover, width } = releasesObject[release]

    const baseName = `${type}.${year}.${month}.${release}.`

    const coverWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
      },
      (error, result) => {
        console.log(error)
        if (!error && result && result.event === 'success') {
          setFieldValue(baseName + 'cover', result.info.secure_url)
        }
      },
    )

    return (
      <React.Fragment key={`${type}_${year}_${month}_${release}`}>
        <ListItem alignItems="flex-start">
          <List>
            <ListItem alignItems="flex-start">
              <Field
                label="Название"
                name={baseName + 'name'}
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
                validate={value => {
                  if (!value) return 'Безымянные релизы мы не показываем'
                }}
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <Field
                label="День релиза"
                name={baseName + 'release_day'}
                value={release_day}
                onChange={handleChange}
                onBlur={handleBlur}
                validate={value => {
                  if (!value) return 'Заполни день'

                  if (isNaN(+value) || +value > daysQty || +value < 1)
                    return 'Не ломай календарь'
                }}
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <div
                style={{ display: 'flex', flexDirection: 'column', width: 360 }}
              >
                <button
                  type="button"
                  className="cloudinary-button"
                  onClick={() => {
                    coverWidget.open()
                  }}
                >
                  Загрузить обложку
                </button>
                <img
                  style={{ maxWidth: '100%', marginTop: 12 }}
                  src={cover}
                  alt=""
                />
              </div>
            </ListItem>
            <ListItem alignItems="flex-start">
              <Field
                label="Доп. информация"
                name={baseName + 'info'}
                value={info}
                onChange={handleChange}
                onBlur={handleBlur}
                validate={value => {
                  if (!value) return 'Введи режиссера, либо платформу'
                }}
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <Field
                label="Ширина в календаре"
                name={baseName + 'width'}
                value={width}
                onChange={handleChange}
                onBlur={handleBlur}
                validate={value => {
                  if (!value) return 'Введи ширину ячейки с релизом'

                  if (isNaN(+value) || +value > 1000 || +value < 46)
                    return 'Введи нормальное значение: число > 45 и < 1000'
                }}
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <IconButton
                onClick={() => {
                  const copyValues = { ...values }
                  delete copyValues[type][year][month][release]
                  setValues(copyValues)
                }}
              >
                <Delete />
              </IconButton>
            </ListItem>
          </List>
        </ListItem>
      </React.Fragment>
    )
  })
}

export default ReleaseList
