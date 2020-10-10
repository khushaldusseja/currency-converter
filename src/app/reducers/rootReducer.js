import { combineReducers } from 'redux';

// combine all teh reducer here.. Import and include in the combineReducers()
const appReducer = combineReducers({
});

//rootReducer object to combine all reducers tied in application...
const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer;

