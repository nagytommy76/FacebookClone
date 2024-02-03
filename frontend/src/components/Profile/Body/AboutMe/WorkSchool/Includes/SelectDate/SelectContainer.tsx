import React from 'react'
import useSelectDate from './Hooks/useSelectDate'

import SelectYear from './SelectYear'
import SelectMonth from './SelectMonth'
import SelectDay from './SelectDay'

const SelectContainer: React.FC<{ setDate: React.Dispatch<React.SetStateAction<Date | undefined>> }> = ({
   setDate,
}) => {
   const { handleChangeYear, handleChangeMonth, handleChangeDay, year, month, day, disabled, daysOfMonth } =
      useSelectDate(setDate)
   return (
      <div style={{ maxWidth: '100%', display: 'flex' }}>
         <SelectYear handleChangeYear={handleChangeYear} year={year} />
         <SelectMonth handleChangeMonth={handleChangeMonth} month={month} disabled={disabled.month} />
         <SelectDay
            handleChangeDay={handleChangeDay}
            day={day}
            disabled={disabled.day}
            daysOfMonth={daysOfMonth}
         />
      </div>
   )
}

export default SelectContainer
