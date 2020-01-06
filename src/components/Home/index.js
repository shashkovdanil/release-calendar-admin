import React, { useState, useEffect, useContext } from 'react'
import { Formik, Form } from 'formik'
import { Button, Container } from '@material-ui/core'
import JSONPretty from 'react-json-pretty'
import omit from 'lodash/omit'
import { useCheckAuth } from '../Session'
import { FirebaseContext } from '../Firebase'
import TypeList from './type-list'
import YearList from './year-list'
import MonthList from './month-list'
import ReleaseList from './release-list'

function Home() {
  const [db, setDb] = useState({})
  const [json, setJson] = useState('')
  const [loading, setLoading] = useState(true)

  const condition = authUser => !!authUser
  useCheckAuth(condition)

  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    firebase.getDB().on('value', snapshot => {
      const db = snapshot.val()
      if (db !== null) {
        setDb(db)
        setLoading(false)
      } else {
        setDb({})
        setLoading(false)
      }
    })
  }, [firebase])

  if (loading) return <h1>Загрузка...</h1>

  return (
    <Container maxWidth="lg">
      <Formik
        initialValues={db}
        onSubmit={values => {
          setJson(values)
        }}
      >
        {({
          values,
          setValues,
          handleChange,
          handleBlur,
          errors,
          submitCount,
          setFieldValue,
        }) => {
          return (
            <Form>
              <TypeList values={values} setValues={setValues}>
                {type => (
                  <YearList
                    years={Object.keys(values[type])}
                    type={type}
                    values={values}
                    setValues={setValues}
                  >
                    {year => (
                      <MonthList
                        months={Object.keys(values[type][year])}
                        type={type}
                        year={year}
                        values={values}
                        setValues={setValues}
                        setFieldValue={setFieldValue}
                      >
                        {month => (
                          <ReleaseList
                            releasesObject={omit(
                              values[type][year][month],
                              'main',
                            )}
                            type={type}
                            year={year}
                            month={month}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            values={values}
                            setValues={setValues}
                          />
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
