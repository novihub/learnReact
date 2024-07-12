import { connect } from 'react-redux'
import Music from './Music'

let mapStateToProps = state => {
	return {
		musicPage: state.musicPage
	}
}

let mapDispatchToProps = dispatch => {
	return {}
}

const MusicContainer = connect(mapStateToProps, mapDispatchToProps)(Music)

export default MusicContainer
