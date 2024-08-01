import React from 'react'
import preloader from '../../../assets/loading.svg'
import classes from './Preloader.module.css'

const Preloader: React.FC = () => {
	return (
		<div className={classes.Preloader}>
			<img src={preloader} alt='Preloader' />
		</div>
	)
}

export default Preloader
