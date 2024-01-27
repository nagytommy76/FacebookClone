import React from 'react'
import useSelectDate from '../Hooks/useSelectDate'

import SelectYear from './SelectDate/SelectYear'
import SelectMonth from './SelectDate/SelectMonth'
import SelectDay from './SelectDate/SelectDay'

const SelectContainer = () => {
   const { handleChangeYear, handleChangeMonth, handleChangeDay } = useSelectDate()
   return (
      <div style={{ width: '100%', display: 'flex' }}>
         <SelectYear />
         <SelectMonth />
         <SelectDay />
      </div>
   )
}

export default SelectContainer
