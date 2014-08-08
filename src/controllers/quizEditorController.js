
(function (scope)
{
    //Editor Class
    function QuizEditor()
    {
    var that                = this;
    that.container          = $(".editorContainer");
    that.leftPanelContainer = null;

    that.selectedQuiz       = null;
    that.theme              = null;
    that.quizList           = [];


        if(QuizEditor.prototype.initializer === true) return;

        QuizEditor.prototype.initializer = true;

        QuizEditor.prototype.load = function(quizzes)
        {
            if(typeof(quiz) !== undefined) {
                that.quizList = quizzes;
                that.launch();
            }
        };
        QuizEditor.prototype.launch = function()
        {
            that.displayEditor();
        };
        QuizEditor.prototype.hide = function()
        {
            // fade or slide
        }
        QuizEditor.prototype.show = function() {
            // fade/slide
            that.container.removeClass('hidden');
        }
        QuizEditor.prototype.displayEditor = function() {
            that.render(that.container, that.getEditorTemplate(), function() {
                that.leftPanelContainer = $(".editSection");
                that.displayLeftPanel();
                that.setMainHandlers();
            });
        };
        QuizEditor.prototype.displayLeftPanel = function(target)
        {
            that.render(that.leftPanelContainer, that.getLeftPanelTemplate(), function() {
                that.setLeftPanelHandlers();
                that.show();
            });
        };
        QuizEditor.prototype.render = function(target, data, cb)
        {
            console.log(target);
            console.debug(data);
            target.html(data);
            if(typeof(cb) !== 'undefined') {
                cb();
            }
        };
        QuizEditor.prototype.getEditorTemplate = function() {
            var modelData = that.theme;
            var htmlData;
            var template;
            var tempFunc;
            var html;

            // modelData.currentQuestionIndex = that.currentIndex + 1;
            // modelData.nbQuestions = that.quiz.Questions.length;
            $.ajax({
                type: 'GET',
                url: 'src/views/html/editorBox.html',
                dataType: 'html',
                async: false,
                cache: false,
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
        QuizEditor.prototype.getLeftPanelTemplate = function() {
            var modelData = that.selectedQuiz;
            var htmlData;
            var template;
            var tempFunc;
            var html;


            $.ajax({
                type: 'GET',
                url: 'src/views/html/editorLeftPanel.html',
                dataType: 'html',
                async: false,
                cache: false,
                success: function(data){
                    template = data;
                    tempFunc = doT.template(template);
                    html = tempFunc(modelData);
                },
                error: function(xhr, type, data){
                    alert("error");
                }
            });
            return html
        };

        QuizEditor.prototype.setLeftPanelHandlers = function()
        {

        };
        QuizEditor.prototype.setMainHandlers = function()
        {

        };
        QuizEditor.prototype.unsetHandlers = function()
        {

        };
        QuizEditor.prototype.destroy = function()
        {
            that.unsetHandlers();
            that.container.empty();
            that.hide();
        };
    }

    scope.Editor = new QuizEditor();

})(window);

Core.register('QuizEditor', function(quiz)
{
    Editor.load(quiz);
    return Editor;
});