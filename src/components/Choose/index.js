import { DatePicker } from 'antd'
import styled from 'styled-components'

const Choose = ({ data, addProductToKorzina, changeSoni, setOpen }) => {
	const onOk = value => {
		console.log('onOk: ', value)
	}
	return (
		<ChooseWrapper>
			<div className='chooseProduct bg-white shadow p-0'>
				<img className='img-fluid w-100' src={data.img} alt={data.name} />
				<div className='p-3'>
					<div className='content'>
						<h3>{data.name}</h3>
						<p>{data.desc}</p>
					</div>
					<div className='actions text-center'>
						<div className='d-flex justify-content-between aligin-items-center'>
							<h4 className='price'>{data.price * data.soni} сум</h4>
							<div className='btn-group d-flex align-items-center'>
								<DatePicker />

								{/* <input type='date' /> */}
							</div>
						</div>
						<button
							className='styledBtn'
							onClick={() => {
								addProductToKorzina(data)
								setOpen(false)
							}}
						>
							Записаться
						</button>
					</div>
				</div>
			</div>
		</ChooseWrapper>
	)
}
const ChooseWrapper = styled.div`
	.price {
		font-size: 18px;
		margin-top: 20px;
	}
	.content {
		h3 {
			font-size: 24px;
			text-transform: capitalize;
		}
		p {
			font-size: 16px;
		}
	}
	.styledBtn {
		margin-top: 30px;
		width: 100%;
		font-size: 18px !important;
	}
	.ant-picker {
		z-index: 1002; /* Increase the value if necessary */
	}
`

export default Choose
