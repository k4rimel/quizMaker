

	'use strict';
/*
 * ManagerModel
 */

// a ManagerModel is where the data object is created.
var ManagerModel = function (data) {
	this.quizzes = data;
	this.getQuiz = function(id) {

		if(this.quizzes.length > 1) {
			for (var i = 0; i < this.quizzes.length; i++) {
				if(this.quizzes[i].Quiz.id === id) {
					return this.quizzes[i].Quiz;
				}
			};
		} else {
			return this.quizzes[0].Quiz;
		}
	}
	// return the ManagerModel instance
	return this;
};
// a ManagerModel constructor might have a function that creates new ManagerModel instances.
ManagerModel.find = function () {
	// data used to create a new ManagerModel may come from anywhere
	// but in this example data comes from this inline object.
	var args = arguments[0];
	var managerData = this.getData(args);


	var manager = new ManagerModel(managerData)
	return manager;
};

ManagerModel.getData = function (args) {

	var outputData = [];
	for (var i = 0; i < args.length; i++) {
		$.ajax({
	  		type: 'GET',
	  		url: 'data/'+args[i]+'.json',
	  		dataType: 'json',
	  		async: false,
	  		success: function(data){
			 	outputData.push(data);	
	  		},
	  		error: function(xhr, type){
	  			console.log("error");
	  		}
		});
	};
	
	return outputData;
};