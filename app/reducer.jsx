
const reducer = function(state, action) {
	switch(action.type) {
		case "SET_STATE":
			console.log('SET_STATE', action.state);
			return {...action.state};
		case "ADD_EMPLOYER": {
      const employers = [
      	...state.employers,
				{...action.employer, id: 1 + Math.max.apply(Math, state.employers.map(function(item){return item.id;}))}];
      return {...state, employers};
    }
		case "UPDATE_EMPLOYER": {
      console.log('UPDATE_EMPLOYER:', action.employer);
      const employers = state.employers.map(employer => employer.id === action.employer.id ? action.employer : employer);
      return {...state, employers};
    }
		case "DELETE_EMPLOYER":
			return {...state, employers: state.employers.filter(employer => employer.id !== action.employerId)};
	}
	return state;
}

module.exports = reducer;
