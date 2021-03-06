const userReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_USER':
			return action.payload;
		case 'SET_USER_SKILLS':
			return { ...state, skills: action.payload };
		case 'UNSET_USER':
			return {};
		default:
			return state;
	}
};

export default userReducer;
