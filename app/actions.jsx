const addEmployer = function(employer) {
	return {
		type: "ADD_EMPLOYER",
		employer
	}
};

const updateEmployer = function(employer) {
	return {
		type: "UPDATE_EMPLOYER",
		employer
	}
};

const deleteEmployer = function(employerId) {
	return {
		type: "DELETE_EMPLOYER",
		employerId
	}
};

module.exports = {addEmployer, updateEmployer, deleteEmployer};
