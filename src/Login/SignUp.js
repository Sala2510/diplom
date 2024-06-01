import { TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { createUser } from '../firebase/functions'
import LogInWrapper from './styled'

export default function SignUp() {
	const { register, reset, handleSubmit } = useForm()
	const navigate = useNavigate()

	const dispatch = useDispatch()
	const onSubmit = data => {
		createUser(data, dispatch)
		navigate('../')
		reset()
	}

	return (
		<LogInWrapper className='rounded p-4 shadow text-center'>
			<h2 style={{ fontWeight: '700' }} className='mb-4'>
				Зарегистрироваться
			</h2>
			<p className={'mb-2'}>У вас есть аккаунт?</p>
			<NavLink to={'/signin'} className='link pb-4'>
				Войти
			</NavLink>

			<form className='p-3' onSubmit={handleSubmit(onSubmit)}>
				<div className='text-field w-100 pb-3'>
					<TextField
						className='w-100'
						type={'text'}
						label={'Введите ваше польное имя'}
						{...register('fullName', { required: true })}
					/>
				</div>
				<div className='text-field w-100 pb-3'>
					<TextField
						className='w-100'
						type={'email'}
						label={'Введите электронную почту'}
						{...register('email', { required: true })}
					/>
				</div>

				<div className='text-field w-100 pb-3'>
					<TextField
						className='w-100'
						type={'password'}
						label={'Введите пароль'}
						{...register('password', { required: true })}
					/>
				</div>

				<div className='text-field w-100'>
					<TextField
						className='w-100'
						type={'number'}
						label={'Введите телефон номер'}
						{...register('phone', { required: true })}
					/>
				</div>
				<button className='styledBtn mt-4' type='submit'>
					Зарегистрироваться
				</button>
			</form>
		</LogInWrapper>
	)
}
