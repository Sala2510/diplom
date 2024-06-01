import React from 'react'

const AboutPage = () => {
	return (
		<div style={styles.container}>
			<h1 style={styles.heading}>About This Project</h1>
			<p style={styles.paragraph}>
				This project represents the culmination of my graduation qualification
				work. It showcases the skills and knowledge I have acquired throughout
				my academic journey.
			</p>
			<p style={styles.paragraph}>
				My name is Salamat Kazakhbaev, and I am the creator of this project. It
				has been an incredible experience to apply what I have learned to a
				real-world application, and I am excited to share the results with you.
			</p>
			<p style={styles.paragraph}>
				I hope this project demonstrates not only my technical abilities but
				also my dedication and passion for this field. Thank you for taking the
				time to explore my work.
			</p>
		</div>
	)
}

const styles = {
	container: {
		padding: '20px',
		maxWidth: '800px',
		margin: '0 auto',
		fontFamily: 'Arial, sans-serif',
	},
	heading: {
		fontSize: '2.5em',
		marginBottom: '20px',
		textAlign: 'center',
	},
	paragraph: {
		fontSize: '1.2em',
		lineHeight: '1.6',
		marginBottom: '20px',
	},
}

export default AboutPage
