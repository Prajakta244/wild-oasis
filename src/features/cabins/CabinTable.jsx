/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";


const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const CabinTable = () => {
  const {isLoading,cabins=[],isError} = useCabins()
  const [searchParams] = useSearchParams()

  const filterValue = searchParams.get('discount') || 'all'
  let filteredData
  if(filterValue === 'all') filteredData = cabins
  if(filterValue === 'no-discount') filteredData = cabins.filter(data => !data.discount)
  if(filterValue === 'with-discount') filteredData = cabins.filter(data => data.discount)

  const sortValue = searchParams.get('sortBy') || 'startDate-asc'
  const [field,direction] = sortValue.split('-')
  const modifier = direction == 'asc' ? 1:-1
  const sortedData = filteredData.sort((a,b) => (a[field] - b[field])*modifier)

  if(isLoading) return <Spinner/>
  return (
    <Menus>
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={sortedData} render={(data,i) => (
        <CabinRow cabinData={data} index={i+1} key={data.id}/>
      )}/>
    </Table>
    </Menus>
  )
}

export default CabinTable
