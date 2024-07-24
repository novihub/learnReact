import profileReducer, { deletePostAC } from './profile-reducer'

let state = {
  posts: [
    { id: 1, message: 'Post 1', likesCount: '12' },
    { id: 2, message: 'Post 2', likesCount: '7' },
    { id: 3, message: 'Post 3', likesCount: '2' },
    { id: 4, message: 'Post 4', likesCount: '3' },
    { id: 5, message: 'Post 5', likesCount: '14' }
  ]
}

it('should delete a post with the given id', () => {
  // 1. initial state
  let action = deletePostAC(1)

  // 2. action
  let newState = profileReducer(state, action)
  
  // 3. expectation
  expect(newState.posts.length).toBe(4)
  // Optional: further verify that the correct post was deleted
  expect(newState.posts.find(post => post.id === 1)).toBeUndefined()
})
