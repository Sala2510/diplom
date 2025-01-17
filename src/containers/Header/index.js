import React from 'react'
import Wrapper from './HeaderWrapper'

export default function Header() {
	return (
		<Wrapper>
			<div className='container py-3 d-flex align-items-center justify-content-between'>
				<div>
					<img src='/images/logo.png' alt='' />
				</div>
				<button className='btn'>
					<img src='/images/search.svg' alt='' />
				</button>
			</div>
		</Wrapper>
	)
}
