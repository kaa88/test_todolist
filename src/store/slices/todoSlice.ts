import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
	name: 'todo',
	initialState: {
		active: false
	},
	reducers: {
		setTestTodo(state, action) {
			state.active = action.payload
		},
	}
})

export const {
	setTestTodo
} = todoSlice.actions

export default todoSlice.reducer
