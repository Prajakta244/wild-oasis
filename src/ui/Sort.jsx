/* eslint-disable react/prop-types */

import Select from "./Select"
import { useSearchParams } from "react-router-dom"

const Sort = ({options}) => {
    const [searchParams,setSearchParams] = useSearchParams()
    const selectedValue = searchParams.get('sortBy') || ''
    const handleClick = (val) => {
        searchParams.set('sortBy',val)
        setSearchParams(searchParams)
    }
  return (
    <Select options={options} value={selectedValue} onChange={handleClick}/>
  )
}

export default Sort