import { TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { signIn } from '../firebase/functions'
import LogInWrapper from './styled'

export default function SignIn() {
	const { register, reset, handleSubmit } = useForm()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const onSubmit = data => {
		signIn(data, dispatch)
		navigate('../')
		reset()
	}

	return (
		<LogInWrapper className='rounded p-4 shadow text-center'>
			<h2 style={{ fontWeight: '700' }} className='mb-4'>
				Войти
			</h2>
			<p className={'mb-2'}>У вас еще нет учетной записи Hospital404?</p>
			<NavLink to={'/signup'} className='link pb-4'>
				Зарегистрироваться
			</NavLink>

			<form className='p-3' onSubmit={handleSubmit(onSubmit)}>
				<div className='text-field w-100'>
					<TextField
						className='mb-4 w-100'
						type={'email'}
						label={'Введите электронную почту'}
						{...register('email', { required: true })}
					/>
				</div>
				<div className='text-field w-100'>
					<TextField
						className='w-100'
						type={'passworn'}
						label={'Введите пароль'}
						{...register('password', { required: true })}
					/>
				</div>
				<button className='styledBtn mt-4' type='submit'>
					Войти
				</button>
			</form>
		</LogInWrapper>
	)
}
