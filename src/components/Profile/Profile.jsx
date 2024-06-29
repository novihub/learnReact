import React from 'react'
import Post from './MyPosts/Post/Post'
import classes from './Profile.module.css'

const Profile = () => {
	return (
		<main className={classes.main}>
			<div>
				<img
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwNCAhmYPPtqEFzGVd3YzV0K9biTLO0PDbQw&s'
					alt=' '
				/>
			</div>
			<Post />
			<Post />
			<Post />
		</main>
	)
}

export default Profile
