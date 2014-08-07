
(function (scope)
{
    //Editor Class
    function QuizEditor()
    {
    var that                = this;
    that.container          = $(".quizContainer");

    that.theme              = null;
    that.quizList           = [];
    that.questionContainer  = null;
    

        /*TODO : HANDLE MCQ/UCQ (quiz type) */
        if(QuizEditor.prototype.initializer === true) return;

        QuizEditor.prototype.initializer = true;

        QuizEditor.prototype.load = function(quiz)
        {
            if(typeof(quiz) !== undefined) {
                that.quiz = quiz;
                that.launch();
            }
        };
        QuizEditor.prototype.launch = function()
        {
            that.currentIndex = 0;
            that.currentQuestion = that.quiz.Questions[that.currentIndex];
            that.displayQuiz();
        };
        QuizEditor.prototype.hide = function()
        {
            var width = $(window).width();
            that.container.removeClass('center');
            that.container.removeClass('transition');
            that.container.addClass('right');
        }
        QuizEditor.prototype.show = function() {
            that.backBtn.removeClass('hidden');
            that.backBtn.addClass('fa fa-bars fa-2x backBtn visible');
            that.container.removeClass('right');
            that.container.addClass('center transition');
        }
        QuizEditor.prototype.displayQuiz = function() {
            that.render(that.container, that.getQuizTemplate(), function() {
                that.questionContainer = $("#questionContainer");
                that.displayQue();
                that.setMainHandlers();
            });
        };

        QuizEditor.prototype.displayRecapScreen = function() {
            that.render(that.container, that.getRecapTemplate());
        }
        QuizEditor.prototype.displayQue = function(target)
        {
            that.updateProgressBar();
            that.render(that.questionContainer, that.getQuestionTemplate(), function() {
                that.setQuestionHandlers();
            });
        };
        QuizEditor.prototype.render = function(target, data, cb)
        {
            target.html(data);

            // target.innerHTML = data;
            if(typeof(cb) !== 'undefined') {
                cb();
            }
        };
        QuizEditor.prototype.getRecapTemplate = function() {
            var modelData = that.quiz;
            var htmlData;
            var template;
            var tempFunc;
            var html;

            modelData.points = that.correctAnswers;
            modelData.nbQuestions = that.quiz.Questions.length;
            modelData.percent = modelData.points/modelData.nbQuestions*100;
            $.ajax({
                type: 'GET',
                url: 'src/views/html/recap.html',
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
        }
        QuizEditor.prototype.getQuizTemplate = function() {
            var modelData = that.quiz;
            var htmlData;
            var template;
            var tempFunc;
            var html;

            // modelData.currentQuestionIndex = that.currentIndex + 1;
            // modelData.nbQuestions = that.quiz.Questions.length;
            $.ajax({
                type: 'GET',
                url: 'src/views/html/quiz.html',
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
        QuizEditor.prototype.getQuestionTemplate = function() {
            var modelData = that.currentQuestion;
            var htmlData;
            var template;
            var tempFunc;
            var html;


            $.ajax({
                type: 'GET',
                url: 'src/views/html/question.html',
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
        QuizEditor.prototype.submitQue = function()
        {
            that.answered = true;
            var propositions = document.getElementsByClassName("proposition selected");
            var answers = [];
            for (var i = propositions.length - 1; i >= 0; i--) {
                answers.push(propositions[i].getAttribute("data-id"));
            };
            if(answers.length > 0) {
                that.isCorrect(answers[0]);
            } else {
                return false;
            }
        };
        QuizEditor.prototype.uncheckPropositions = function()
        {
            for (var i = that.propositions.length - 1; i >= 0; i--) {
                that.propositions[i].className = "proposition";
            };
        }
        /*TODO : MCQ (check quiz type: if mcq , remvoe unchecking) */
        QuizEditor.prototype.selectProposition = function(element)
        {
            that.uncheckPropositions();
            element.className = "proposition selected";
        }
        QuizEditor.prototype.isCorrect = function(id)
        {
            var isCorrect = false;
            var correctId = that.currentQuestion.correctAnswer;
            var props = that.currentQuestion.propositions;
            var propLen = props.length;
            var correctLabel;
            if(that.answered) {
                if(correctId === id) {
                    that.correctAnswers++;
                    isCorrect = true;
                    that.answered = false;
                }
                for (var i = 0; i < propLen; i++) {
                    if(correctId === props[i].id) {
                        correctLabel = props[i].label;
                    }
                };
                that.showAnswer(isCorrect, correctLabel);
                that.highlightProposition(id, isCorrect, correctId);
            }
        }
        QuizEditor.prototype.highlightValidProposition = function(id)
        {
            var props = document.getElementsByClassName("proposition");
            for (var i = props.length - 1; i >= 0; i--) {
                if(props[i].getAttribute("data-id") === id ) {
                    props[i].className = 'proposition correct';
                }
            };
        }
        QuizEditor.prototype.highlightProposition = function(id, isValid, correctId)
        {
            var classLbl = (isValid ? "correct" :  "wrong");
            var props = document.getElementsByClassName("proposition");
            for (var i = props.length - 1; i >= 0; i--) {
                if(props[i].getAttribute("data-id") === id ) {
                    props[i].className = 'proposition '+classLbl;
                }
            };
            that.highlightValidProposition(correctId);
        }
        QuizEditor.prototype.showAnswer = function(isValid, answer)
        {

            var msgContainer = document.getElementById('msgContainer');
            var msg = "";
            if(isValid) {

                msg = "Correct ! The answer was '"+answer+"'.";
                msgContainer.className = "correctMsg msg";
            } else {
                msg = "Wrong answer, the right answer was '" + answer +"'.";
                msgContainer.className = "wrongMsg msg";
            }
            msgContainer.innerHTML = msg;
        };
        QuizEditor.prototype.updateProgressBar = function()
        {
            var bar = document.getElementById("progress");
            var index = that.currentIndex+1;
            var percent = index/that.quiz.Questions.length*100;

            bar.style.width = percent + '%';
        }
        QuizEditor.prototype.next = function()
        {
            if(that.currentIndex < that.quiz.Questions.length-1) {
                that.currentIndex ++;
                that.updateProgressBar();
                that.currentQuestion = that.quiz.Questions[that.currentIndex];
                that.displayQue();
                that.clearMessage();
            } else {
                that.displayRecapScreen();
            }
        };
        QuizEditor.prototype.clearMessage = function()
        {
            var msgContainer = document.getElementById('msgContainer');
            msgContainer.innerHTML = "";
        }
        QuizEditor.prototype.setQuestionHandlers = function()
        {
            that.propositions = document.getElementsByClassName('proposition');

            for(var i = 0; i < that.propositions.length; i++) {
                that.propositions[i].addEventListener("click", function(event) {
                    that.selectProposition(event.target);
                }, false);
            }
        }
        QuizEditor.prototype.setMainHandlers = function()
        {

            that.submitBtn = $("#submit");
            that.nextBtn = $("#next");
            that.backBtn = $("#backButton");


            that.submitBtn.click(function(event) {
               that.submitQue();
            });
            that.nextBtn.click(function(event) {
               that.next();
            });          
            that.backBtn.click(function(event) {
               Core.go('QuizManager');
            });
            that.show();
            that.container.css('left', 0);
        };
        QuizEditor.prototype.unsetHandlers = function()
        {
            that.submitBtn = null;
            that.nextBtn = null;
            that.backBtn.removeClass('visible');
            that.backBtn.addClass('hidden');
        };
        QuizEditor.prototype.destroy = function()
        {
            that.unsetHandlers();
            that.correctAnswers = 0;
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