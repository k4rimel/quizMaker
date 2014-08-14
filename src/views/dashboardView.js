var DashboardView = function ( model ) {
	var that = this;
	that.container =
	that.model = model;

	return that;
};

DashboardView.prototype.output = function () {
	var instance = this;
	var modelData = instance.model;
	var htmlData;
	var template;
	var tempFunc;
	var html;

	$.ajax({
  		type: 'GET',
  		url: 'src/views/html/dashboard.html',
  		dataType: 'html',
  		async: false,
  		success: function(data){

 	  		template = data;
 	  		tempFunc = doT.template(template);
 	  		html = tempFunc(modelData);
  		},
  		error: function(xhr, type, data){
  			alert("error");
  		}
	});

	return html;
};

DashboardView.prototype.render = function () {
	var outputValue = this.output();
	var container = $(".mainContainer");
	container.html(outputValue);
	this.setHandlers();
	container.removeClass('hidden');
};

DashboardView.prototype.setHandlers = function() {
	var that = this;
	//TODO : PASS OBJECT {THEME + QUIZZES}
	$(".themeListItem").click(function(event) {
		var id = $(this).attr('data-id');
		var theme = that.model.getTheme(id);
		that.displayQuizzes(theme);
	});
	$(".addThemeButton").click(function(event) {
		// TODO : CORE.GO('THEME EDITOR') ETC.
	});
}
DashboardView.prototype.displayQuizzes = function(theme) {
	Core.go('QuizEditor', theme);
}