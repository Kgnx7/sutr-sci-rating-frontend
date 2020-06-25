import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllFaculties } from '../../api/facultiesAPI'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const facultiesSlice = createSlice({
  name: 'faculties',
  initialState: { faculties: [], isLoading: false, error: null },
  reducers: {
    getFacultiesStart: startLoading,
    getFacultiesFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getFacultiesSuccess(state, { payload }) {
      // TODO: валидация данных
      state.faculties = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getFacultiesStart,
  getFacultiesFailure,
  getFacultiesSuccess,
  resetError,
} = facultiesSlice.actions

export const getAllFaculties = (router) => async (dispatch) => {
  try {
    dispatch(getFacultiesStart())

    let faculties = await apiGetAllFaculties()

    faculties = faculties.map((faculty) => ({
      ...faculty,
      dean: [faculty.dean.name, faculty.dean.surname, faculty.dean.patronymic].join(' ').trim(),
      deanAssistant: [
        faculty.deanAssistant.name,
        faculty.deanAssistant.surname,
        faculty.deanAssistant.patronymic,
      ]
        .join(' ')
        .trim(),
    }))

    dispatch(getFacultiesSuccess(faculties))
  } catch (error) {
    dispatch(getFacultiesFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

// export const getFacultyDepartments = (facultyId, departmentId, router) => async (dispatch) => {
//   try {
//     dispatch(getFacultyDepartmentsStart())

//     const departments = await apiGetFacultyDepartments(facultyId, departmentId)

//     dispatch(getFacultyDepartmentsSuccess(departments))
//   } catch (error) {
//     dispatch(getFacultyDepartmentsFailure(error))
//     handleServerErrors(error, router, dispatch)
//   }
// }

export default facultiesSlice.reducer
