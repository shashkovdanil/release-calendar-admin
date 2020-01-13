import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import omit from 'lodash.omit'
import { List, ListItem, IconButton, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { getDaysInMonth } from 'date-fns'
import Field from './field'
import { removeRelease, editRelease } from '../../actions/db'
import { cloudinary as config } from '../../constants/config'

function ReleaseItem({ type, year, month, release, releasesObject }) {
  const dispatch = useDispatch()
  const { cover } = releasesObject[release]

  const baseName = `${type}.${year}.${month}.${release}.`

  const date = new Date(`${year}-${+month + 1}-1`)
  const daysQty = getDaysInMonth(date)

  return (
    <>
      <ListItem alignItems="flex-start">
        <List>
          <ListItem alignItems="flex-start">
            <Field
              label="Название"
              name={baseName + 'name'}
              onChange={e => {
                dispatch(
                  editRelease(
                    type,
                    year,
                    month,
                    release,
                    'name',
                    e.target.value,
                  ),
                )
              }}
              validate={value => {
                if (!value) return 'Безымянные релизы мы не показываем'
              }}
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <Field
              label="День релиза"
              name={baseName + 'release_day'}
              onChange={e => {
                dispatch(
                  editRelease(
                    type,
                    year,
                    month,
                    release,
                    'release_day',
                    e.target.value,
                  ),
                )
              }}
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
              <Button
                variant="contained"
                color="secondary"
                type="button"
                onClick={() => {
                  window.cloudinary
                    .createUploadWidget(config, (error, result) => {
                      if (!error && result && result.event === 'success') {
                        dispatch(
                          editRelease(
                            type,
                            year,
                            month,
                            release,
                            'cover',
                            result.info.secure_url,
                          ),
                        )
                      }
                    })
                    .open()
                }}
              >
                Загрузить обложку
              </Button>
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
              onChange={e => {
                dispatch(
                  editRelease(
                    type,
                    year,
                    month,
                    release,
                    'info',
                    e.target.value,
                  ),
                )
              }}
              validate={value => {
                if (!value) return 'Введи режиссера, либо платформу'
              }}
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <Field
              label="Ширина в календаре"
              name={baseName + 'width'}
              onChange={e => {
                dispatch(
                  editRelease(
                    type,
                    year,
                    month,
                    release,
                    'width',
                    e.target.value,
                  ),
                )
              }}
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
                dispatch(removeRelease(type, year, month, release))
              }}
            >
              <Delete />
            </IconButton>
          </ListItem>
        </List>
      </ListItem>
    </>
  )
}

function ReleaseList(props) {
  const { type, year, month } = props
  const releasesObject = useSelector(state =>
    omit(state.db[type][year][month], 'main'),
  )
  const releaseList = Object.keys(releasesObject)

  return releaseList.map((release, index) => (
    <ReleaseItem
      key={`${type}_${year}_${month}_${release}`}
      {...props}
      releasesObject={releasesObject}
      release={release}
    />
  ))
}

export default ReleaseList
