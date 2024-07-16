import preloader from '../../../assets/loading.svg'
import classes from './Preloader.module.css'


const Preloader = props => {
	return (
		<div className={classes.Preloader}>
			<img src={preloader} alt='Preloader' />
		</div>
	)
}


export default Preloader