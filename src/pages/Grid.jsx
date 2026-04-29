import styled from 'styled-components'
import './Grid.css'
const GridDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(3,200px);
    grid-template-rows: 50px 100px 200px;
`
const Grid = () => {
  return (
    <GridDiv>
        <div className="grid-item item-1">1</div>
        <p className="grid-item item-2">2</p>
        <div className="grid-item item-3">3</div>
        <div className="grid-item item-4">4</div>
        <div className="grid-item item-5">5</div>
        <div className="grid-item item-6">6</div>
        <div className="grid-item item-7">7</div>
        <div className="grid-item item-8">8</div>
    </GridDiv>
  )
}

export default Grid