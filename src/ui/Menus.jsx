/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useClick from "../hooks/useClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  z-index: 1;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenuContext = createContext();
const Menus = ({ children }) => {
  const [openId,setOpenId] = useState('')
  const [position,setPosition] = useState({x:20,y:20})
  const close = ()=>setOpenId('')
  const open = setOpenId
  return <MenuContext.Provider value={{open,setOpenId,close,openId,position,setPosition}}>{children}</MenuContext.Provider>;
};

const List = ({ children,i,id }) => {
  const {openId,position,close} = useContext(MenuContext)
  const ref = useClick(close)

  if(openId !== id) return null
  return (
   <StyledList position={position} ref={ref}>{children}</StyledList>
  )
};

const Button = ({ children,icon,onClick }) => {
  const {close} = useContext(MenuContext)
  const handleClick = ()=>{
    onClick?.()
    close()
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>{icon}{children}</StyledButton>
    </li>
  )
};

const Toggle = ({ id }) => {
  const {openId,setOpenId,close,setPosition} = useContext(MenuContext)
  const handleClick = (e) =>{
    const rect = e.target.closest('button').getBoundingClientRect()
    console.log(rect)
    setPosition({x:window.innerWidth-rect.width-rect.x,y:rect.y+rect.height+8})
    openId == id ? close() : setOpenId(id)
    
  }
  return (
    <StyledToggle onClick={handleClick} >
      <HiEllipsisVertical/>
    </StyledToggle>
  );
};
Menus.Menu = Menu;
Menus.List = List;
Menus.Button = Button;
Menus.Toggle = Toggle;

export default Menus;
