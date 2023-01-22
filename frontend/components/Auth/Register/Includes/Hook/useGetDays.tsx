const useGetDays = () => {
   let days: number[] = []
   for (let index = 1; index <= 31; index++) {
      days.push(index)
   }
   return days
}

export default useGetDays
