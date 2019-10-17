const selectedApplicantReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_APPLICANT_DETAIL':
            return action.payload;
        case 'CLEAR_APPLICANT_DETAIL':
            return {};
        default:
            return state;
    }
};

export default selectedApplicantReducer;
