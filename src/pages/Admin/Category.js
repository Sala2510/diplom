import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { pushCategory } from '../../firebase/functions'
const Category = () => {
	const [isSubmit, setIsSubmit] = useState(false)

	const navigate = useNavigate()

	const { register, reset, handleSubmit } = useForm({
		// defaultValues: index ? products[index] : {},
	})

	const submit = data => {
		pushCategory(data.category)
		reset()
		setIsSubmit(true)
	}
	return (
		<div>
			{/* <AlertMini
        isSubmit={isSubmit}
        text={"Kategoria qo'shildi!"}
        /> */}
			<form onSubmit={handleSubmit(submit)}>
				<div className='row mb-5'>
					<div className='col-md-12 mb-3'>
						<input
							className='form-control w-100'
							placeholder='Категория'
							{...register('category', { required: true })}
						></input>
					</div>
				</div>
				<div className='text-center'>
					<button className='btn styledBtn w-25' type='submit'>
						Сохранить
					</button>
				</div>
			</form>
		</div>
	)
}

export default Category
