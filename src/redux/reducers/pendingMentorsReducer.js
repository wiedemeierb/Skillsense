const pendingMentorsReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_PENDING_MENTORS':
			return action.payload;
		default:
			return state;
	}
};

export default pendingMentorsReducer
