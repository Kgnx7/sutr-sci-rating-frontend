import roles from './roles';

export default {
  University: [roles.Admin, roles.Rector],
  Faculty: [roles.Dean],
  Department: [roles.HeadOfDepartment],
  Worker: [roles.Lecturer, roles.SeniorLecturer, roles.Docent, roles.Professor]
}