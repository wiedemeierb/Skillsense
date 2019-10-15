const selectedApplicantReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_APPLICANT_DETAIL':
            return action.payload;
        default:
            return state;
    }
};

export default selectedApplicantReducer;
