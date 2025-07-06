import React from 'react'
import { ImSpinner9 } from "react-icons/im";

const SpinIcon = ({ spin }) => {
  return (
    <ImSpinner9 className={`hidden animate-spin  mx-2 ${spin && 'block'}`} />
  )
}

export default SpinIcon