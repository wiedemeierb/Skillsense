const selectedUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_USER':
            return action.payload;
        default:
            return state;
    }
}

export default selectedUserReducer;