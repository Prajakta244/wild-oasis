/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import { useCabinDelete } from "./useCabinDelete";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";


const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabinData,index }) => {
  const { regularPrice, discount, image, maxCapacity, id, name } = cabinData;
  const { isDeleting, deleteCabin } = useCabinDelete();
  const { createCabin, isCreating } = useCreateCabin();
  const duplicateCabin = () => {
    createCabin({
      regularPrice,
      discount,
      image,
      maxCapacity,
      name: `Copy of ${name}`,
    });
  };
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fit up to {maxCapacity} guests</div>
        <Price>{regularPrice}</Price>
        <Discount>{discount}</Discount>
        <div>
          {/* <button
            onClick={() => duplicateCabin(cabinData)}
            disabled={isCreating}
          >
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open opens={"cabin-edit"}>
              <button
                disabled={isDeleting}
              >
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name={"cabin-edit"}>
              <CreateCabinForm cabinToEdit={cabinData} />
            </Modal.Window>
          </Modal>
          <Modal>
            <Modal.Open opens={"cabin-delete"}>
              <button >
            <HiTrash />
          </button>
            </Modal.Open>
            <Modal.Window name={"cabin-delete"}>
              <ConfirmDelete resourceName={'cabin'} onConfirm={()=>deleteCabin(id)} disabled={isDeleting}/>
            </Modal.Window>
          </Modal> */}
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id}/>
              <Menus.List i={index*10} id={id}>
                <Menus.Button icon={<HiSquare2Stack />} onClick={() => duplicateCabin(cabinData)}>Duplicate</Menus.Button>
                 <Modal.Open opens={"cabin-edit"}><Menus.Button icon={<HiPencil />}>Edit</Menus.Button></Modal.Open> 
                <Modal.Open opens={"cabin-delete"}><Menus.Button icon={<HiTrash />}>Delete</Menus.Button></Modal.Open>
              </Menus.List>
              <Modal.Window name={"cabin-edit"}>
              <CreateCabinForm cabinToEdit={cabinData} />
            </Modal.Window>
            <Modal.Window name={"cabin-delete"}>
              <ConfirmDelete resourceName={'cabin'} onConfirm={()=>deleteCabin(id)} disabled={isDeleting}/>
            </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;
