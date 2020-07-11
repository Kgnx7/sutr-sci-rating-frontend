import { createSlice } from '@reduxjs/toolkit'
import { apiGetFaculty, apiDeleteFaculty, apiGetСonsolidatedRegister } from '../../api/facultiesAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const facultySlice = createSlice({
  name: 'faculty',
  initialState: {
    faculty: null,
    consolidatedRegister: [],
    departments: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    getFacultyStart: startLoading,
    getFacultyFailure: loadingFailed,
    getСonsolidatedRegisterStart: startLoading,
    getСonsolidatedRegisterFailure: loadingFailed,
    deleteFacultyStart: startLoading,
    deleteFacultyFailure: loadingFailed,
    getFacultyDepartmentsStart: startLoading,
    getFacultyDepartmentsFailure: loadingFailed,

    resetError(state) {
      state.error = null
    },
    getFacultySuccess(state, { payload }) {
      state.faculty = payload
      state.isLoading = false
      state.error = null
    },
    deleteFacultySuccess(state) {
      state.faculty = null
      state.isLoading = false
      state.error = null
    },
    getFacultyDepartmentsSuccess(state, { payload }) {
      state.departments = payload
      state.isLoading = false
      state.error = null
    },
    getСonsolidatedRegisterSuccess(state, { payload }) {
      state.consolidatedRegister = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getFacultyStart,
  getFacultyFailure,
  getFacultySuccess,

  getСonsolidatedRegisterStart,
  getСonsolidatedRegisterFailure,
  getСonsolidatedRegisterSuccess,

  deleteFacultyStart,
  deleteFacultySuccess,
  deleteFacultyFailure,

  getFacultyDepartmentsStart,
  getFacultyDepartmentsFailure,
  getFacultyDepartmentsSuccess,
  resetError,
} = facultySlice.actions

export const getFaculty = (facultyId, router) => async (dispatch) => {
  try {
    dispatch(getFacultyStart())

    const faculty = await apiGetFaculty(facultyId)

    faculty.dean = [faculty.dean.name, faculty.dean.surname, faculty.dean.patronymic]
      .join(' ')
      .trim()
    faculty.deanAssistant = [
      faculty.deanAssistant.name,
      faculty.deanAssistant.surname,
      faculty.deanAssistant.patronymic,
    ]
      .join(' ')
      .trim()

    dispatch(getFacultySuccess(faculty))
  } catch (error) {
    dispatch(getFacultyFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export const getСonsolidatedRegister = (facultyId, router) => async (dispatch) => {
  try {
    dispatch(getСonsolidatedRegisterStart())

    const consolidatedRegister = await apiGetСonsolidatedRegister(facultyId)

    dispatch(getСonsolidatedRegisterSuccess(consolidatedRegister))
  } catch (error) {
    dispatch(getСonsolidatedRegisterFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export const deleteFaculty = (facultyId, router) => async (dispatch) => {
  try {
    dispatch(deleteFacultyStart())

    const faculty = await apiDeleteFaculty(facultyId)

    dispatch(deleteFacultySuccess(faculty))
    router.push('/faculties')
    dispatch(enqueueSnackbar('Факультет успешно создан', 'success'))
  } catch (error) {
    dispatch(deleteFacultyFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

// export const getFacultyDepartments = (facultyId, router) => async (dispatch) => {
//   try {
//     dispatch(getFacultyDepartmentsStart())

//     const departments = await apiDepartmentByFaculty(facultyId)

//     dispatch(getFacultyDepartmentsSuccess(departments))
//   } catch (error) {
//     dispatch(getFacultyDepartmentsFailure(error))
//     handleServerErrors(error, router, dispatch)
//   }
// }

export default facultySlice.reducer
