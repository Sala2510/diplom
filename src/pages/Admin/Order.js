import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import TableRow from '../../components/TableRow'

const Order = () => {
	const ordersObj = useSelector(state => state.orders)
	const orders = Object.entries(ordersObj)
	let summa = orders.reduce((first, order) => {
		if (order[1].done) return first
		return first + order[1]['sum']
	}, 0)

	return (
		<div
			className='table-cover d-flex flex-column pt-5'
			style={{ height: '90vh', overflow: 'auto' }}
		>
			<h3 className='mt-2'>Заказы</h3>
			<div className='d-flex flex-wrap align-items-center justify-content-between mb-2'>
				<p className='text-secondary m-0'>
					Вы можете отслеживать выполненные заказы
				</p>
				<p className='text-secondary my-0 me-3'>Общая сумма {summa} сум</p>
			</div>
			<Table striped bordered size='sm' className='orders flex-1'>
				<thead>
					<tr>
						<th>Ф. И. О</th>
						<th>Телефон</th>
						<th>Сумма</th>
						<th>Доктор</th>
						<th>Статус</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order, i) => {
						if (order[1].done) return
						return <TableRow order={order} key={i} />
					})}
				</tbody>
			</Table>
		</div>
	)
}

export default Order
