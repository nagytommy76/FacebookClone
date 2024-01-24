import React from 'react'

import useYear from '../Hooks/useYear'

import SelectYear from './SelectDate/SelectYear'
import SelectMonth from './SelectDate/SelectMonth'
import SelectDay from './SelectDate/SelectDay'

const SelectContainer = () => {
   return (
      <div style={{ width: '100%', display: 'flex' }}>
         <SelectYear />
         <SelectMonth />
         <SelectDay />
      </div>
   )
}

export default SelectContainer
