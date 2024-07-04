import React from 'react'
import MyPosts from './MyPosts/MyPosts'
import classes from './Profile.module.css'

const Profile = () => {
	return (
		<main>
			<div>
				<img
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwNCAhmYPPtqEFzGVd3YzV0K9biTLO0PDbQw&s'
					alt=' '
				/>
			</div>
			<MyPosts />
		</main>
	)
}

export default Profile
