/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useEffect } from "react";
import { supabaseUrl } from "../../services/supabase";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const CreateCabinForm = ({cabinToEdit={},onModalClose}) => {
  const{id:editId,...editValues} = cabinToEdit
  const isEditForm = Boolean(editId)
  const { register, handleSubmit, reset, getValues,formState,setValue } = useForm({defaultValues:isEditForm?editValues:{}});
  const {errors} = formState
  
  const {createCabin, isCreating } = useCreateCabin()
  const {editCabin, isEditing } = useEditCabin()
  const onSubmit = (data) => {
    if(isEditForm){
      console.log(data.image)
      const hasImagePath = typeof data.image == 'string'
      editCabin({newCabin:{...data,image:hasImagePath?data.image:data?.image[0]},id:editId},{
        onSuccess:()=>reset()
      })
    }else{
      createCabin({...data,image:data?.image[0]},{
        onSuccess:()=>reset()
      });
    }
    onModalClose()
  };
  const isPending = isCreating || isEditing
  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onModalClose?'modal':'regular '}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isPending} {...register("name",{
          required:'This field is required'
        })} />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isPending} {...register("maxCapacity",{
          required:'This field is required',
          min:{
            value:1,
            message:'Capacity should be atleast 1'
          }
        })} />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isPending} {...register("regularPrice",{
          required:'This field is required'
        })} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          defaultValue={0}
          {...register("discount",{
          validate:(value) => {
            console.log(value <= getValues().regularPrice || 'Discount should be less than regular price')
            return Number(value) <= Number(getValues().regularPrice) || 'Discount should be less than regular price'
          }
        })}
        />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isPending}
          defaultValue=""
          {...register("description",{
          required:'This field is required'
        })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput id="image" disabled={isPending} accept="image/*" {...register("image")}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onModalClose}>
          Cancel
        </Button>
        <Button disabled={isPending}>{isEditForm ? 'Edit cabin':'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
