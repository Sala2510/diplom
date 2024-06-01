import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { pushProduct, uploadDoctorImage } from '../../firebase/functions'

const Meal = () => {
	;<h1>Meal</h1>
	const categories = Object.values(useSelector(store => store.categories))
	const navigate = useNavigate()
	const [isSubmit, setIsSubmit] = useState(false)

	// const index = params.category;

	const { register, reset, handleSubmit } = useForm({
		// defaultValues: index ? products[index] : {},
	})

	const submit = async data => {
		console.log(data.img)
		const picture = await uploadDoctorImage(data.img[0])
		console.log(picture)
		const obj = {
			productName: `${data.title} ${data.secondName}  ${data.thirdName}`,
			price: data.price,
			img: picture,
			description: data.description,
		}
		console.log(obj.img[0])
		await pushProduct(data.category, obj)
		reset()
		setIsSubmit(true)
	}
	return (
		<>
			{/* <AlertMini
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        text={"Mahsulot qo'shildi!"}
        /> */}
			<form onSubmit={handleSubmit(submit)}>
				<div className='row mb-5'>
					<div className='col-md-6 mb-3'>
						<input
							className='form-control w-100'
							placeholder='Изображение'
							type='file'
							{...register('img', { required: true })}
						/>
					</div>
					<div className='col-md-6 mb-3'>
						<input
							className='form-control w-100'
							placeholder='Имя доктора'
							{...register('title', { required: true })}
						></input>
					</div>{' '}
					<div className='col-md-6 mb-3'>
						<input
							className='form-control w-100'
							placeholder='Фамилия доктора'
							{...register('secondName', { required: true })}
						></input>
					</div>
					<div className='col-md-6 mb-3'>
						<input
							className='form-control w-100'
							placeholder='Отчество доктора'
							{...register('thirdName', { required: true })}
						></input>
					</div>
					<div className='col-md-12 mb-3'>
						<textarea
							className='form-control textArea w-100'
							placeholder='Описание'
							type='text'
							{...register('description', { required: true })}
						></textarea>
					</div>
					<div className='col-md-6 mb-3'>
						<input
							className='form-control w-100'
							placeholder='Цена услуги'
							type={'number'}
							{...register('price', { required: true })}
						></input>
					</div>
					<div className='col-md-6 mb-3'>
						<select
							className='form-control w-100'
							placeholder=''
							name='category'
							{...register('category', { required: true })}
						>
							{categories.map((item, i) => (
								<option key={i} className='p-2'>
									{item}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className='text-center'>
					<button className='btn styledBtn w-25 ' type='submit'>
						Сохранить
					</button>
				</div>
			</form>
		</>
	)
}

export default Meal
