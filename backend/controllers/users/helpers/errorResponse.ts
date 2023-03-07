export const errorResponse = (isError: boolean, msg: string, param: string, value: string = '') => {
   return {
      errors: [
         {
            isError,
            msg,
            param,
            value,
         },
      ],
   }
}
