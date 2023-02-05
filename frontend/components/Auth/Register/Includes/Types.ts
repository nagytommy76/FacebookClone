export interface IDateOfBirth {
   year: string
   month: string
   day: string
   isError: boolean
   msg: string
}

export type GenderTypes = 'female' | 'male'

export interface IInputValues {
   isError: boolean
   msg: string
   param: string
   value: string
}

export const InputValues: IInputValues = {
   isError: false,
   msg: '',
   param: '',
   value: '',
}
