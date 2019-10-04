const selectedJobReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_JOB':
            return action.payload;
        default:
            return state;
    }
}

export default selectedJobReducer;