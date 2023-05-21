const initialState = {
  list: [],
};

export default function appReducer(state = initialState, action) {
  
    switch (action.type) {
    
      case 'item/added': {
 
        return {

      list:[action.payload,...state.list]
  
         
        }
      }
      case 'item/toTop': {
 
        return {

      list:[state.list[action.payload],...state.list.slice(0,action.payload),...state.list.slice(action.payload+1)]
  
         
        }
      }
      case 'item/full': {
 
        return {

      list:[action.payload,...state.list.slice(0,9)]
  
         
        }
      }
      case 'item/delete': {
    
 
        return {
list:state.list.filter((elem)=>elem!==action.payload)
     
  
         
        }
      }
      default:
       
        return state
    }
  }
