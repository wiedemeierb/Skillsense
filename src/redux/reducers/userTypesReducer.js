const userTypesReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_USER_TYPES':
			return action.payload;
		default:
			return state;
	}
};

export default userTypesReducer;
