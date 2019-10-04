const allMentorsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_MENTORS':
            return action.payload;
        default:
            return state;
    }
}

export default allMentorsReducer;