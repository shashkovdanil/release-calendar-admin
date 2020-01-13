import omit from 'lodash.omit'
import nanoid from 'nanoid'
import {
  INIT_DB,
  ADD_YEAR,
  REMOVE_YEAR,
  ADD_MONTH,
  REMOVE_MONTH,
  SET_MONTH_BACKGROUND,
  ADD_RELEASE,
  REMOVE_RELEASE,
  EDIT_RELEASE,
} from '../actions/db'

const INITIAL_STATE = null

function dbReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INIT_DB: {
      return action.payload
    }

    case ADD_YEAR: {
      const releaseType = action.payload
      const years = Object.keys(state[releaseType])
      const lastYear = years[years.length - 1]
      const nextYear = lastYear
        ? parseInt(lastYear) + 1
        : new Date().getFullYear()
      const emptyYear = {
        '0': {},
      }

      return {
        ...state,
        [releaseType]: {
          ...state[releaseType],
          [nextYear]: emptyYear,
        },
      }
    }

    case REMOVE_YEAR: {
      const { releaseType, year } = action.payload

      return {
        ...state,
        [releaseType]: {
          ...omit(state[releaseType], year),
        },
      }
    }

    case ADD_MONTH: {
      const { releaseType, year } = action.payload
      const months = Object.keys(state[releaseType][year])
      const lastMonth = months.length > 0 ? +months[months.length - 1] + 1 : 0

      return {
        ...state,
        [releaseType]: {
          ...state[releaseType],
          [year]: {
            ...state[releaseType][year],
            [lastMonth]: {},
          },
        },
      }
    }

    case REMOVE_MONTH: {
      const { releaseType, year, month } = action.payload

      return {
        ...state,
        [releaseType]: {
          ...state[releaseType],
          [year]: {
            ...omit(state[releaseType][year], month),
          },
        },
      }
    }

    case SET_MONTH_BACKGROUND: {
      const { releaseType, year, month, src } = action.payload

      return {
        ...state,
        [releaseType]: {
          ...state[releaseType],
          [year]: {
            ...state[releaseType][year],
            [month]: {
              ...state[releaseType][year][month],
              main: src,
            },
          },
        },
      }
    }

    case ADD_RELEASE: {
      const { releaseType, year, month } = action.payload
      const newId = nanoid(12)
      const emptyRelease = {
        name: '',
        cover: '',
        release_day: '1',
        info: '',
        width: '160',
      }

      return {
        ...state,
        [releaseType]: {
          ...state[releaseType],
          [year]: {
            ...state[releaseType][year],
            [month]: {
              ...state[releaseType][year][month],
              [newId]: emptyRelease,
            },
          },
        },
      }
    }
    case REMOVE_RELEASE: {
      const { releaseType, year, month, releaseId } = action.payload

      return {
        ...state,
        [releaseType]: {
          ...state[releaseType],
          [year]: {
            ...state[releaseType][year],
            [month]: {
              ...omit(state[releaseType][year][month], releaseId),
            },
          },
        },
      }
    }
    case EDIT_RELEASE: {
      const {
        releaseType,
        year,
        month,
        releaseId,
        field,
        value,
      } = action.payload

      return {
        ...state,
        [releaseType]: {
          ...state[releaseType],
          [year]: {
            ...state[releaseType][year],
            [month]: {
              ...state[releaseType][year][month],
              [releaseId]: {
                ...state[releaseType][year][month][releaseId],
                [field]: value,
              },
            },
          },
        },
      }
    }

    default:
      return state
  }
}

export default dbReducer
