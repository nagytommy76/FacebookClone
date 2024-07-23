export const errorResponse = (isError: boolean, msg: string, path: string, value: string = '') => {
   return {
      errors: [
         {
            isError,
            msg,
            path,
            value,
         },
      ],
   }
}
