import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import { useEffect } from 'react';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import { useEditSetting } from './useEditSetting';

function UpdateSettingsForm() {
  const {settings,isLoading} = useSettings()
  const {updateSetting,isUpdating} = useEditSetting()
  const {register,setValue,handleSubmit} = useForm()
  useEffect(()=>{
    if(!isLoading){
      setValue('minBookingLength',settings.minBookingLength)
      setValue('maxBookingLength',settings.maxBookingLength)
      setValue('maxGuestsPerBooking',settings.maxGuestsPerBooking)
      setValue('breakfastPrice',settings.breakfastPrice)
    }
  },[isLoading,setValue,settings])
  console.log(settings,isLoading)
  function onSubmit(data){
    console.log(data)
    updateSetting(data)
  }
  if(isLoading) return <Spinner/>
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='minBookingLength' {...register('minBookingLength')} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='maxBookingLength'  {...register('maxBookingLength')} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='maxGuestsPerBooking' {...register('maxGuestsPerBooking')} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfastPrice'  {...register('breakfastPrice')}/>
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update Setting</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
