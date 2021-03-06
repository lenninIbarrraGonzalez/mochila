import { auth0 } from 'lib/auth0'
import { handleDefault } from 'lib/apiUtils'
import * as organizationModel from 'models/organization'

const ALLOWED_METHODS = ['GET', 'POST']

async function handleGet (req, res) {
  const organizations = await organizationModel.findAll()

  // TODO: Send the right status code according the operation result
  res.status(200).json(organizations)
}

async function handlePost (req, res) {
  const { body: attributes } = req
  const { insertedId: id } = await organizationModel.create(attributes)
  const organization = await organizationModel.get(id)

  // TODO: Send the right status code according the operation result
  res.status(200).json(organization)
}

// TODO: Add authorization using Auth0
export default auth0.requireAuthentication(async function handler (req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGet(req, res)
    case 'POST':
      return handlePost(req, res)
    default:
      return handleDefault(req, res, ALLOWED_METHODS)
  }
})
