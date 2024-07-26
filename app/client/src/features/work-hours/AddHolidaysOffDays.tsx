import { useForm } from 'react-hook-form'
import Input from '../../components/Input'
import Button from '../../ui/Button'
type FormValues = {
  holidaysOff: string
}

export default function AddHolidaysOffDays() {
  const {
    register,
    formState: { errors },
  } = useForm<FormValues>()
  return (
    <form className='mt-10 flex flex-col gap-6'>
      <span className='text-center text-2xl uppercase'>
        Add Holidays Off Days
      </span>
      <Input
        htmlType='text'
        register={register('holidaysOff')}
        name='holidays Off days'
        error={errors.holidaysOff?.message}
      />
      <Button type='submit'>Add holidays</Button>
    </form>
  )
}
