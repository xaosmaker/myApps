import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../components/Input'
import { validateEmail, validatePassword } from '../utils/validations'
import Button from '../ui/Button'

type FormValues = {
  email: string
  password: string
}

function LoginRegForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' })
  const onHandleSubmit: SubmitHandler<FormValues> = (data, event) => {
    // TODO: add form Submiting
    event?.preventDefault()
    console.log(data)
  }

  const hasErrors = Object.entries(errors).length !== 0
  return (
    <div className='h-screen w-full  bg-slate-900  text-slate-100'>
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className='mx-auto flex h-full w-3/4 flex-col items-center justify-center gap-10 sm:w-2/4 md:w-1/4'
      >
        <h2 className='text-2xl font-bold '>VHMS</h2>
        <h3 className='text-lg'> Login</h3>
        <Input
          error={errors.email?.message}
          htmlType='text'
          name='email'
          register={register('email', {
            validate: {
              email: (v) => validateEmail(v) || 'Enter a Valid Email Address',
            },
          })}
          required={true}
        />

        <Input
          htmlType='password'
          name='password'
          error={errors.password?.message}
          register={register('password', {
            minLength: {
              value: 8,
              message: 'password should be 8 or more chars',
            },
            validate: {
              password: (v) =>
                validatePassword(v)?.type || validatePassword(v)?.message,
            },
          })}
          required={true}
        />
        <div className='flex w-full items-center justify-between'>
          {!hasErrors ? <Button>Login</Button> : <div></div>}
          {/* TODO: add register functionality */}
          <button type='reset'></button>
        </div>
      </form>
    </div>
  )
}

export default LoginRegForm
