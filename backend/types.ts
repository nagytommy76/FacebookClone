import { Request } from 'express'
import type { Server } from 'socket.io'
import type { DefaultEventsMap } from 'socket.io/dist/typed-events'

export interface ISocketRequest extends Request {
   ioSocket?: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
}
