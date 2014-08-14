
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
            if(typeof(theme) !== undefined) {
                that.theme = theme;
                that.setQuizList(theme.quizzes);
                that.launch();
            }
        };

        QuizEditor.prototype.setQuizList = function(names, cb) {
            var fileNames = names.split(',');
            that.quizList.Quizzes = [];
            that.quizList.Theme = that.theme;
            for (var i = fileNames.length - 1; i >= 0; i--) {
                var quiz = that.getQuiz(fileNames[i]);
                that.quizList.Quizzes[quiz.Quiz.id] = quiz;
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
        QuizEditor.prototype.launch = function() {
            that.container = $(".mainContainer");
            that.displayQuizList();
        };
        QuizEditor.prototype.hide = function() {
            that.container.addClass('hidden');
        }
        QuizEditor.prototype.show = function() {
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
        QuizEditor.prototype.orderQuizList = function() {
            for(key in that.quizList.Quizzes) {
                for (var i = that.quizList.Quizzes[key].Quiz.Questions.length - 1; i >= 0; i--) {
                    var props = that.quizList.Quizzes[key].Quiz.Questions[i].propositions.split(',');
                    for (var j = props.length - 1; j >= 0; j--) {
                        if(props[j] == that.quizList.Quizzes[key].Quiz.Questions[i].correctAnswer) {
                            props[j] = "*"+props[j];
                        }
                    };
                    that.quizList.Quizzes[key].Quiz.Questions[i].propositions = props.join(",");
                };
            };
        };
        QuizEditor.prototype.getEditorTemplate = function() {
            that.orderQuizList();
            var modelData = that.quizList;
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
            // DElETE QUESTION
        };
        QuizEditor.prototype.setMainHandlers = function()
        {
            $('.quizListItem').click(function(event) {
                $('.quizListItem').removeClass('selected');
                $(this).addClass('selected');
                var quizId = $(this).children('.quiz').children('.quizLink').attr('data-quiz-id');
                that.selectedQuiz = that.quizList.Quizzes[quizId];
                that.displayQuestions(that.rightPanelContainer);
            });
            $('.backToThemesButton').click(function(event) {
                Core.go('Dashboard');
            });
            $('.addQuiz').click(function(event) {

                that.createNewQuiz();
            });
        };
        QuizEditor.prototype.createNewQuiz = function(){
            // generate json and call updateList
        }
        QuizEditor.prototype.updateList = function()
        {

        }
        QuizEditor.prototype.saveFile = function()
        {

        };
        QuizEditor.prototype.unsetHandlers = function()
        {

        };
        QuizEditor.prototype.destroy = function()
        {
            that.unsetHandlers();
            $('.editorContainer').empty();
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