import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'

const useBookings = () => {
    const [searchParams] = useSearchParams()
    const filter = searchParams.get('status')
    const sortBy = searchParams.get('sortBy')
    const [field,direction] = sortBy.split('-')
    const {isLoading,data:bookings,isError} = useQuery({queryKey:['booking',filter,sortBy],queryFn:()=>getBookings({filter:{field:'status',value:filter},sort:{field,direction}})})
  return {bookings,isError,isLoading}
}

export default useBookings