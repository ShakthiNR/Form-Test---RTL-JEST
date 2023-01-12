import { setupServer } from 'msw/node'
import { usersHandlers } from './usersHandlers'

export const usersServer = setupServer(...usersHandlers)