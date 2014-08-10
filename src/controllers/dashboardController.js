var DashboardController = function () {
	this.container = $('.mainContainer');
	return this;
};

// if(DashboardController.prototype.initializer === true) return;
// DashboardController.prototype.initializer = true;

DashboardController.prototype.init = function () {
	var that = this;
	var themes = that.getThemeList();
	if(typeof(themes) !== 'undefined') {
		that.loadThemes.apply(that, themes);
	}
};

DashboardController.prototype.getThemeList = function () {
	var themeFiles;
	var data = {"reqtype":"read"};
	$.ajax({
  		type: 'GET',
  		url: 'server/app.php',
  		async: false,
  		data: data,
  		success: function(response){
  			console.log(response);
		 	themeFiles = JSON.parse(response);
  		},
  		error: function(xhr, type){
  			console.log("error");
  		}
	});
	return themeFiles;
}
DashboardController.prototype.loadThemes = function () {
	var model = DashboardModel.find(arguments);
	var view = new DashboardView(model);
	view.render();
};
DashboardController.prototype.destroy = function () {
	this.container.addClass('hidden');
};
Core.register('Dashboard', function()
{
	var controller = new DashboardController();
   	return controller;
});


