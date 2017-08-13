let default_state = {
  id_property: 0
}

export default function selectCardReducer (state = default_state, action){
  if(action.type === 'SELECT_CARD'){
    console.log('ESTAS EN SELECT_CARD')
    console.log(action.key)
    return {
      id_property: action.key
    };
  }
  return state;
}
