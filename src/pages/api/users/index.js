import { auth0 } from 'lib/auth0'
import { handleDefault } from 'lib/apiUtils'
import * as userModel from 'models/user'

const ALLOWED_METHODS = ['GET', 'POST']

async function handleGet (req, res) {
  const users = await userModel.findAll()

  // TODO: Send the right status code according the operation result
  res.status(200).json(users)
}

async function handlePost (req, res) {
  const { body: attributes } = req
  const { insertedId: id } = await userModel.create(attributes)
  const user = await userModel.get(id)

  // TODO: Send the right status code according the operation result
  res.status(200).json(user)
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
