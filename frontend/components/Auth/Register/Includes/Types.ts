export interface IDateOfBirth {
   year: string
   month: string
   day: string
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
