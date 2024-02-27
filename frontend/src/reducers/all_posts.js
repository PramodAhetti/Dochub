const postReducer=(state=[{message:"login in"}],action)=>{
    switch(action.type){
        case 'SETPOSTS':
            return action.payload;
        default:
            return state;
        
    }
}
export default postReducer;