import { AbilityBuilder, Ability } from '@casl/ability'
import groups from '../constants/groups'

export default function defineAbilityFor(user) {
  const { can, build } = new AbilityBuilder(Ability)

  if (!user || !user.accessGroup) {
    return build()
  }

  switch (user.accessGroup) {
    case groups.Admin:
      can('list', 'User')
      can('listByDepartment', 'User')
      can('get', 'User')
      can('create', 'User')
      can('edit', 'User')
      can('delete', 'User')
      can('create', 'UserStatus')

      can('list', 'Faculty')
      can('get', 'Faculty')

      can('list', 'Department')
      can('listByFaculty', 'Department')
      can('get', 'Department')

      can('list', 'AccessGroup')

      can('list', 'DegreeType')

      can('create', 'AcademicDegree')
      can('delete', 'AcademicDegree')

      break
    case groups.ResearchDepartment:
      can('list', 'User')
      can('listByDepartment', 'User')
      can('get', 'User')
      can('create', 'User')
      can('edit', 'User')
      can('delete', 'User')
      can('create', 'UserStatus')

      can('list', 'faculties')
      can('get', 'Faculty')

      can('list', 'Department')
      can('listByFaculty', 'Department')
      can('get', 'Department')

      can('list', 'DegreeType')

      can('create', 'AcademicDegree')
      can('delete', 'AcademicDegree')
      break
    case groups.University:
      can('list', 'User')
      can('listByDepartment', 'User')
      can('get', 'User')

      can('list', 'faculties')
      can('get', 'Faculty')

      can('list', 'Department')
      can('listByFaculty', 'Department')
      can('get', 'Department')

      can('list', 'DegreeType')

      can('create', 'AcademicDegree')
      can('delete', 'AcademicDegree')
      break
    case groups.Faculty:
      can('list', 'User')
      can('listByDepartment', 'User')
      can('get', 'User')

      can('list', 'Faculty')
      can('get', 'Faculty')

      can('list', 'Department')
      can('listByFaculty', 'Department')
      can('get', 'Department')

      can('list', 'DegreeType')

      can('create', 'AcademicDegree')
      can('delete', 'AcademicDegree')
      break
    case groups.Department:
      can('list', 'User')
      can('listByDepartment', 'User')
      can('get', 'User')

      can('list', 'Faculty')
      can('get', 'Faculty')

      can('list', 'Department')
      can('listByFaculty', 'Department')
      can('get', 'Department')

      can('list', 'DegreeType')

      can('create', 'AcademicDegree')
      can('delete', 'AcademicDegree')
      break
    case groups.Worker:
      can('get', 'User')
      can('listByDepartment', 'User')
      can('list', 'User')

      can('list', 'Faculty')
      can('get', 'Faculty')

      can('list', 'Department')
      can('listByFaculty', 'Department')
      can('get', 'Department')

      can('list', 'DegreeType')

      can('create', 'AcademicDegree')
      can('delete', 'AcademicDegree')
      break
    default:
      break
  }

  return build()
}
