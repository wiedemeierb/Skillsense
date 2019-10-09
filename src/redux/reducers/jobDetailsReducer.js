const jobDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_JOB_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default jobDetailsReducer;