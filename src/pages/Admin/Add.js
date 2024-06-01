import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Add = () => {
	const navigate = useNavigate()
	useEffect(() => {
		navigate('category')
	}, [])
	return (
		<div className='pt-5'>
			<h3 className='mt-3'>Записаться</h3>
			<p className='text-secondary'>Записаться новую категорию/доктора</p>
			<div className='mb-5 d-flex'>
				<NavLink
					className='nav-link me-3'
					activeClassName='active'
					to='category'
				>
					Категория
				</NavLink>
				<NavLink className='nav-link' activeClassName='active' to='meal'>
					Доктор
				</NavLink>
			</div>
			<Outlet />
		</div>
	)
}

export default Add
