const useGetYears = () => {
   let array = []
   for (let i = 2023; i >= 1901; i--) {
      array.push(i)
   }
   return array
}

export default useGetYears
