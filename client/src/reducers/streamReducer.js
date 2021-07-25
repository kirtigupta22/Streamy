import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type) {
        case 'FETCH_STREAM':
            return { ...state, [action.payload.id]: action.payload };
        case 'CREATE_STREAM':
            return { ...state, [action.payload.id]: action.payload };
        case 'EDIT_STREAM':
            return { ...state, [action.payload.id]: action.payload };
        case 'DELETE_STREAM':
            return _.omit(state, action.payload );
        case 'FETCH_STREAMS':
            return { ...state, ..._.mapKeys( action.payload, 'id' )}; //mapKey returns a big object therefore the '...' before it is to tell to add the big object returned by it to the new object.
        default:
            return state;
    }
};