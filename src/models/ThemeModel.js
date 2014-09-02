'use strict';
var ThemeModel = function (data) {
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
	return this;
};
ThemeModel.find = function () {
	var args = arguments[0];
	var managerData = this.getData(args);


	var manager = new ThemeModel(managerData)
	return manager;
};

ThemeModel.getData = function (args) {

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