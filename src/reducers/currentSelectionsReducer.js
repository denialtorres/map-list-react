let default_state = {
	key: null,
	position: null,
	showInfoWindow: false
};

export default function currentSelectionsReducer (state = default_state, action) {
	if (action.type === 'UPDATE_SELECTION') {
		console.log(action);
		console.log('EEESTAS EN CURRENT SELECTION')
		console.log(action.key)
		return {
			key: action.key,
			position: action.position,
			showInfoWindow: action.showInfoWindow
		};
	}
	return state;
}
