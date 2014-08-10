
(function (scope)
{
    //Editor Class
    function QuizEditor()
    {
    var that                 = this;
    that.container           = null;
    that.rightPanelContainer = null;
    that.selectedQuiz        = null;
    that.theme               = null;
    that.quizList            = [];


        if(QuizEditor.prototype.initializer === true) return;

        QuizEditor.prototype.initializer = true;

        QuizEditor.prototype.load = function(theme)
        {
            if(typeof(quiz) !== undefined) {
                that.setQuizList(theme.quizzes);
                that.launch();
            }
        };

        QuizEditor.prototype.setQuizList = function(names, cb) {
            var fileNames = names.split(',');
            for (var i = fileNames.length - 1; i >= 0; i--) {
                var quiz = that.getQuiz(fileNames[i]);
                // that.quizList.push();
                that.quizList[quiz.Quiz.id] = quiz;
            };
        };
        QuizEditor.prototype.getQuiz = function(fileName) {
            var quiz;
                $.ajax({
                    type: 'GET',
                    url: 'data/'+fileName+'.json',
                    dataType: 'json',
                    async: false,
                    success: function(data){
                        quiz = data;
                    },
                    error: function(xhr, type){
                        console.log("error");
                    }
                });
            return quiz;
        }
        QuizEditor.prototype.launch = function()
        {
            that.container = $(".mainContainer");
            that.displayQuizList();
        };
        QuizEditor.prototype.hide = function()
        {
            // fade or slide
        }
        QuizEditor.prototype.show = function() {
            // fade/slide
            that.container.removeClass('hidden');
        }
        QuizEditor.prototype.displayQuizList = function() {
            that.render($('.editorContainer'), that.getEditorTemplate(), function() {
                that.rightPanelContainer = $(".editSection");
                that.setMainHandlers();
            });
        };
        QuizEditor.prototype.displayQuestions = function(target)
        {
            that.render(that.rightPanelContainer, that.getRightPanelTemplate(), function() {
                that.setRightPanelHandlers();
            });
        };
        QuizEditor.prototype.render = function(target, data, cb)
        {
            target.html(data);
            if(typeof(cb) !== 'undefined') {
                cb();
            }
        };
        QuizEditor.prototype.getEditorTemplate = function() {
            var quizObjects = [];

            Object.keys(that.quizList).forEach(function (key) {
               quizObjects.push(that.quizList[key]);
            });

            var modelData = quizObjects;
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
        QuizEditor.prototype.getRightPanelTemplate = function() {
            var modelData = that.selectedQuiz;
            console.log(that.selectedQuiz);
            var htmlData;
            var template;
            var tempFunc;
            var html;


            $.ajax({
                type: 'GET',
                url: 'src/views/html/editorRightPanel.html',
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

        QuizEditor.prototype.setRightPanelHandlers = function()
        {
            $(".question").click(function(event) {
                
            });
        };
        QuizEditor.prototype.setMainHandlers = function()
        {
            $('.quizListItem').click(function(event) {
                var quizId = $(this).children('.quiz').children('.quizLink').attr('data-quiz-id');
                that.selectedQuiz = that.quizList[quizId];
                that.displayQuestions(that.rightPanelContainer);
            });
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