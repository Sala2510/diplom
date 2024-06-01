import {
	faArrowRightFromBracket,
	faBars,
	faCheck,
	faPlus,
	faSpinner,
	faUser,
	faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import AdminWrapper from './AdminWrapper'

const Admin = () => {
	const userData = useSelector(state => state.userData)
	const role = userData.role
	const rols = useSelector(state => state.rols)
	const navigate = useNavigate()
	const location = useLocation()
	const { pathname } = location
	const active = pathname.split('/')

	function toggleAside() {
		document.querySelector('#admin-aside').classList.toggle('d-none')
	}
	return (
		<AdminWrapper className='d-flex border'>
			<aside id='admin-aside'>
				<div>
					<img src='https://express24.uz/img/header-logo.svg' alt='' />
					<p>Hospital 404</p>
				</div>
				<ul className='list-unstyled'>
					<li>
						<Link
							className={`admin-link ${
								active.slice(-1) == 'admin' ? 'active' : ''
							}`}
							to=''
						>
							<FontAwesomeIcon className='admin-list-icon' icon={faUser} />
							<div>
								<p className='m-0 admin-list-title'>Профиль</p>
								<p className='m-0 admin-list-subtitle'>
									Следите за своим профилем
								</p>
							</div>
						</Link>
					</li>
					{role === rols.superAdmin && (
						<li>
							<Link
								className={`admin-link ${
									active.slice(-1) == 'users' ? 'active' : ''
								}`}
								to='users'
							>
								<FontAwesomeIcon className='admin-list-icon' icon={faUsers} />
								<div>
									<p className='m-0 admin-list-title'>Пользователи</p>
									<p className='m-0 admin-list-subtitle'>
										Информация о Пользователях Сайта
									</p>
								</div>
							</Link>
						</li>
					)}
					{(role === rols.admin ||
						role === rols.yetkazuvchi ||
						role === rols.superAdmin) && (
						<li>
							<Link
								className={`admin-link ${
									active.slice(-1) == 'order' ? 'active' : ''
								}`}
								to='order'
							>
								<FontAwesomeIcon className='admin-list-icon' icon={faSpinner} />
								<div>
									<p className='m-0 admin-list-title'>Заказы</p>
									<p className='m-0 admin-list-subtitle'>
										Вы можете отслеживать прибывший заказ
									</p>
								</div>
							</Link>
						</li>
					)}
					{(role === rols.admin ||
						role === rols.yetkazuvchi ||
						role === rols.superAdmin) && (
						<li>
							<Link
								className={`admin-link ${
									active.slice(-1) == 'done' ? 'active' : ''
								}`}
								to='done'
							>
								<FontAwesomeIcon className='admin-list-icon' icon={faCheck} />
								<div>
									<p className='m-0 admin-list-title'>Завершены</p>
									<p className='m-0 admin-list-subtitle'>
										Ознакомиться со списком Завершеных заказ
									</p>
								</div>
							</Link>
						</li>
					)}
					{(role === rols.admin || role === rols.superAdmin) && (
						<li>
							<Link
								className={`admin-link ${
									active.includes('add') ? 'active' : ''
								}`}
								to='add'
							>
								<FontAwesomeIcon className='admin-list-icon' icon={faPlus} />
								<div>
									<p className='m-0 admin-list-title'>Записаться</p>
									<p className='m-0 admin-list-subtitle'>
										Записаться новую категорию/Доктора
									</p>
								</div>
							</Link>
						</li>
					)}
				</ul>
			</aside>
			<main className='position-relative'>
				<header className='d-flex shadow-sm align-items-center justify-content-between text-secondary'>
					<FontAwesomeIcon
						className='header-icons'
						onClick={toggleAside}
						icon={faBars}
					/>
					<IconButton onClick={() => navigate('../')}>
						<FontAwesomeIcon
							className='header-icons'
							icon={faArrowRightFromBracket}
						/>
					</IconButton>
				</header>
				<section className='admin-main-content mt-3'>
					<Outlet />
				</section>
			</main>
		</AdminWrapper>
	)
}

export default Admin
