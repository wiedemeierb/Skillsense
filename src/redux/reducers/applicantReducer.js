const applicantReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_APPLICANTS':
            return action.payload;
        default:
            return state;
    }
};

export default applicantReducer;
