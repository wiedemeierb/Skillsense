const selectedUserReducer = (state = {}, action) => {
	//selected reducer to use for viewing details of a specific user
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
