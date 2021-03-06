import { IDENTIFICATION_TYPES, ROLES_TYPES, PROJECTS_TYPES, ATTACHMENT_TYPES, DEPARTMENTS, CITIES } from 'lib/constans'

export const getIdentificationTypeById = (identificationTypeId) => {
  return IDENTIFICATION_TYPES.find(({ key }) => key === identificationTypeId)
}

export const getRolesTypeById = (rolesTypeId) => {
  return ROLES_TYPES.find(({ key }) => key === rolesTypeId)
}

export const getProjectTypesById = (projectTypeId) => {
  return PROJECTS_TYPES.find(({ key }) => key === projectTypeId)
}

export const getAttachmentTypeById = (attachmentType) => {
  return ATTACHMENT_TYPES.find(({ key }) => key === attachmentType)
}

export const getDepartamentTypeById = (departamentId) => {
  return DEPARTMENTS.find(({ key }) => key === departamentId)
}

export const getCityTypeById = (cityId) => {
  return CITIES.find(({ key }) => key === cityId)
}

export const isAdmin = (userRole) => {
  return userRole === 'admin'
}

export const isManager = (userRole) => {
  return userRole === 'manager'
}

export const isOperator = (userRole) => {
  return userRole === 'operator'
}
