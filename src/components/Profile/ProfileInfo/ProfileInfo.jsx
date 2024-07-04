import React from 'react'

import classes from './ProfileInfo.module.css'

const ProfileInfo = () => {
	return (
		<div>
			<div>
				<img
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwNCAhmYPPtqEFzGVd3YzV0K9biTLO0PDbQw&s'
					alt=' '
				/>
			</div>
			<div className={classes.descriptionBlock}>
				ava + description
			</div>
		</div>
	)
}

export default ProfileInfo
