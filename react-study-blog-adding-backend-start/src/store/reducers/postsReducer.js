import { actionTypes } from "../actions/actionTypes"

const initialState = {
    posts: [],
    showModal: false
}

export const postsReducer = (state = initialState, action) => {

    switch(action.type) {
        case(actionTypes.SHOW_MODAL): 
        return {
            ...state,
            showModal: true
        }

        case(actionTypes.HIDE_MODAL) :
            console.log(state)
            return {
                ...state,
                showModal: false
            }

        default:
            return state
    }

}

