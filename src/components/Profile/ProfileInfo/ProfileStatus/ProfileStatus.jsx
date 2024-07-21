import React from 'react'
import classes from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editMode: false,
			status: this.props.status
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
		this.props.updateStatus(this.state.status)
	}

	onStatusChange = e => {
		this.setState({
			status: e.currentTarget.value
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.editMode && !prevState.editMode) {
			this.inputRef.current.select()
		}
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status
			})
		}
	}

	render() {
		return (
			<div className={classes.ProfileStatus}>
				{this.state.editMode ? (
					<div>
						<input
							autoFocus
							onChange={this.onStatusChange}
							ref={this.inputRef}
							onBlur={this.deactivateEditMode}
							value={this.state.status}
							// value={this.props.aboutMe}
						/>
					</div>
				) : (
					<div>
						<p onDoubleClick={this.activateEditMode}>{this.props.status || 'No status'}</p>
						{/* <p onDoubleClick={this.activateEditMode}>{this.props.aboutMe}</p> */}
					</div>
				)}
			</div>
		)
	}
}

export default ProfileStatus
