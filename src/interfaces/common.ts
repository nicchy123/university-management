import { IGenericErorMessage } from './error'

export type IGenericRespose = {
  statusCode: number
  message: string
  errorMessages: IGenericErorMessage[]
}
