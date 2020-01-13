export const INIT_DB = 'INIT_DB'

export const ADD_YEAR = 'ADD_YEAR'
export const REMOVE_YEAR = 'REMOVE_YEAR'

export const ADD_MONTH = 'ADD_MONTH'
export const REMOVE_MONTH = 'REMOVE_MONTH'
export const SET_MONTH_BACKGROUND = 'SET_MONTH_BACKGROUND'

export const ADD_RELEASE = 'ADD_RELEASE'
export const REMOVE_RELEASE = 'REMOVE_RELEASE'
export const EDIT_RELEASE = 'EDIT_RELEASE'

export const initDB = db => ({
  type: INIT_DB,
  payload: db,
})

/* YEARS */
export const addYear = releaseType => ({
  type: ADD_YEAR,
  payload: releaseType,
})

export const removeYear = (releaseType, year) => ({
  type: REMOVE_YEAR,
  payload: {
    releaseType,
    year,
  },
})

/* MONTHS */
export const addMonth = (releaseType, year) => ({
  type: ADD_MONTH,
  payload: {
    releaseType,
    year,
  },
})

export const removeMonth = (releaseType, year, month) => ({
  type: REMOVE_MONTH,
  payload: {
    releaseType,
    year,
    month,
  },
})

export const setMonthBackground = (releaseType, year, month, src) => ({
  type: SET_MONTH_BACKGROUND,
  payload: {
    releaseType,
    year,
    month,
    src,
  },
})

/* RELEASES */
export const addRelease = (releaseType, year, month) => ({
  type: ADD_RELEASE,
  payload: {
    releaseType,
    year,
    month,
  },
})

export const removeRelease = (releaseType, year, month, releaseId) => ({
  type: REMOVE_RELEASE,
  payload: {
    releaseType,
    year,
    month,
    releaseId,
  },
})

export const editRelease = (
  releaseType,
  year,
  month,
  releaseId,
  field,
  value,
) => ({
  type: EDIT_RELEASE,
  payload: {
    releaseType,
    year,
    month,
    releaseId,
    field,
    value,
  },
})
