import React, { useState, useEffect, useContext } from 'react'
import { Formik, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container } from '@material-ui/core'
import JSONPretty from 'react-json-pretty'
import { useCheckAuth } from '../Session'
import { FirebaseContext } from '../Firebase'
import TypeList from './type-list'
import YearList from './year-list'
import MonthList from './month-list'
import ReleaseList from './release-list'
import { initDB } from '../../actions/db'

function Home() {
  const [json, setJson] = useState('')
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const db = useSelector(state => state.db)

  const condition = authUser => !!authUser
  useCheckAuth(condition)

  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    firebase.getDB().on('value', snapshot => {
      const db = snapshot.val()
      if (db !== null) {
        dispatch(initDB(db))
        setLoading(false)
      } else {
        dispatch({})
        setLoading(false)
      }
    })
  }, []) // eslint-disable-line

  if (loading) return <h1>Загрузка...</h1>

  return (
    <Container maxWidth="lg">
      <Button
        style={{
          margin: '24px 0',
        }}
        type="button"
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          firebase.doSignOut()
        }}
      >
        Выйти из аккаунта
      </Button>
      <Formik
        initialValues={db}
        onSubmit={values => {
          setJson(values)
        }}
        enableReinitialize
      >
        {({ handleChange, handleBlur, errors, submitCount, setFieldValue }) => {
          return (
            <Form>
              <TypeList>
                {type => (
                  <YearList type={type}>
                    {year => (
                      <MonthList type={type} year={year}>
                        {month => (
                          <ReleaseList type={type} year={year} month={month} />
                        )}
                      </MonthList>
                    )}
                  </YearList>
                )}
              </TypeList>
              <div style={{ marginTop: 50, marginBottom: 50 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Сформировать ЖСОН
                </Button>
                {Object.keys(errors).length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    Походу ты допустил ошибки при заполнении, поскролль и поищи
                    их ({JSON.stringify(errors)})
                  </div>
                )}
              </div>
              {json && (
                <div>
                  <JSONPretty data={json} />
                  <Button
                    style={{ marginTop: 50, marginBottom: 50 }}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                      firebase.setDB(json)
                    }}
                  >
                    Обновить Базу данных
                  </Button>
                </div>
              )}
            </Form>
          )
        }}
      </Formik>
    </Container>
  )
}

export default Home
