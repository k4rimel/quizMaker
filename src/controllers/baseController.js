var baseController = function () {
	return this;
};

baseController.prototype.loadData = function () {

	
	var model = baseModel.find(arguments);
	var view = new baseView(model);

	view.render();
};


