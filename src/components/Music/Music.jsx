import React from 'react'

const Music = props => {
	const musicPage = props.musicPage

	return (
		<div>
			{musicPage.musics.map(m => (
				<div key={m.id}>{m.name}</div>
			))}
		</div>
	)
}

export default Music
