const selectedMessageReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SELECTED_MESSAGE':
            return action.payload;
        default:
            return state;
    }
}

export default selectedMessageReducer;