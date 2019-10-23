const selectedUserReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_SELECTED_USER':
			return action.payload;
		case 'CLEAR_SELECTED_USER':
			return {};
		default:
			return state;
	}
};

export default selectedUserReducer;
