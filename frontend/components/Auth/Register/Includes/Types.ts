export interface IDateOfBirth {
   year: string
   month: string
   day: string
}

export type GenderTypes = 'female' | 'male'

export const InputValues: IInputValues = {
   location: '',
   msg: '',
   param: '',
   value: '',
}
export interface IInputValues {
   location: string
   msg: string
   param: string
   value: string
}
