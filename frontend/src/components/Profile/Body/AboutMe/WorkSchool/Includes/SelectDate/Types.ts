export type Error = {
   value: string
   error: boolean
   errorMsg: string
}

export type DateError = {
   value: Date | undefined
   error: boolean
   errorMsg: string
}

export type ErrorResponse = { location: string; msg: string; path: string; value: string }[]
