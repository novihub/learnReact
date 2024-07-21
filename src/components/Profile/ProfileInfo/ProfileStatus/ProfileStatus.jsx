import React from 'react'
import classes from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editMode: false
		}
		this.inputRef = React.createRef()
	}

	activateEditMode = () => {
		this.setState({
			editMode: true
		})
	}

	deactivateEditMode = () => {
		this.setState({
			editMode: false
		})
	}

	componentDidUpdate(prevState) {
		if (this.state.editMode && !prevState.editMode) {
			this.inputRef.current.select()
		}
	}

	render() {
		return (
			<div className={classes.ProfileStatus}>
				{this.state.editMode ? (
					<div>
						<input
							autoFocus
							ref={this.inputRef}
							onBlur={this.deactivateEditMode}
							value={this.props.aboutMe}
						/>
					</div>
				) : (
					<div>
						<p onDoubleClick={this.activateEditMode}>{this.props.aboutMe}</p>
					</div>
				)}
			</div>
		)
	}
}

export default ProfileStatus
