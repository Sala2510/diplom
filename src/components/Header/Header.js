import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HeaderWrapper from './HeaderWrapper'

const Header = ({ setOpen, ...props }) => {
	const navigate = useNavigate()

	const userData = useSelector(state => state.userData)

	return (
		<HeaderWrapper className='pt-3 container'>
			<div className='row'>
				<div className='col-3'>
					<div className='d-flex flex-col justify-content-start align-items-center'>
						<img
							src='https://firebasestorage.googleapis.com/v0/b/web-hostipal.appspot.com/o/assets%2Fpngegg.png?alt=media&token=51ea10b2-ff4f-46f4-94e6-e777349873a9'
							width='80px'
							alt='24/7'
						/>
						<h5>Hospital 404</h5>
					</div>
				</div>
				<div className='col-6 ps-5'>
					<form>
						<input
							type='text'
							className='form-control'
							placeholder='Search'
							{...props}
						/>
					</form>
				</div>
				<div
					className='col-3'
					style={{ display: 'flex', justifyContent: 'flex-end' }}
				>
					{(userData.uid && (
						<div className='ml-10'>
							<IconButton
								onClick={() => {
									navigate('/admin')
								}}
							>
								<Avatar>{userData.fullName.slice(0, 1)}</Avatar>
							</IconButton>
						</div>
					)) || (
						<button
							className='styledBtn'
							onClick={() => {
								setOpen(true)
								navigate('/signin')
							}}
						>
							<FontAwesomeIcon icon='fa-solid fa-arrow-right-from-bracket' />{' '}
							Войти
						</button>
					)}
				</div>
			</div>
		</HeaderWrapper>
	)
}

export default Header
