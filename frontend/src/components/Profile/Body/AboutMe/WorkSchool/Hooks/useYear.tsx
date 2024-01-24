const useYear = () => {
   // Itt esetleg lehet a születési évet megadni mint minumum évszám a DB-ből dateOfBirth
   const fillYears = () => {
      let years: number[] = []
      const startDate = new Date().getFullYear()
      for (let i = startDate; i > 1950; i--) {
         years.push(i)
      }
      return years
   }

   return fillYears
}

export default useYear
