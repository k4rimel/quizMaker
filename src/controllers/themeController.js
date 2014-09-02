var ThemeController = function () {
	this.container = $('#mainContainer');
	return this;
};

if(ThemeController.prototype.initializer === true) return;
ThemeController.prototype.initializer = true;

ThemeController.prototype.init = function () {
	var that = this;
	
};

ThemeController.prototype.loadThemes = function () {
	var model = ThemeModel.find(arguments);
	var view = new ThemeView(model);

	view.render();
};
ThemeController.prototype.destroy = function () {
	// Zoom in
};
Core.register('ThemeController', function()
{
   var controller = new ThemeController();
   return controller;
});


