import React from 'react'
import preloader from '../../../assets/images/loading.svg'
import classes from './Preloader.module.css'

const Preloader = props => {
	return (
		<div className={classes.Preloader}>
			<img src={preloader} />
		</div>
	)
}

export default Preloader
