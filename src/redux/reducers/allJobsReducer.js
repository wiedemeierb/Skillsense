const allJobsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_JOBS':
            return action.payload;
        default:
            return state;
    }
}

export default allJobsReducer;