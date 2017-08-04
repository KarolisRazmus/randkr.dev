var FastTyping = function () {

    const STATE_REGISTER = "register";
    const STATE_LEVEL_SELECTION = "level_select";
    const STATE_GAME_START = "game_start";
    const STATE_GAME_OVER = "game_over";
    var name;
    var state;
    var lastState;
    var level;
    var score = 0;
    var lifesCount = 10;
    var delay;
    var inputas = true;
    // var randomChar;
    var mykey;
    var userAction = true;
    var gold = false;
    var charSet = 'abcdefghijklmnopqrstuvwxyz';
    var gameStartTime;
    var gameEndTime;
    var gameTotalTime;
    var averageSpeedDuration;
    var saveULR;

    this.setSaveURL = function (value)
    {
        saveULR = value;
    };


// ---------------------------         RegisterLogics        ---------------------------------


    var RegisterLogics = function () {

        var view = $('#register-body');
        var input = $('#register-input');
        var button = $('#register-button');
        button.prop('disabled', true);

        this.show = function()
        {

            view.removeClass( "hidden" );

            enable();
        }

        this.hide = function()
        {

            view.addClass( "hidden" );

        }

        function enable()
        {

            input.keyup(function(){
                if(input.val().length >= 3)
                    button.prop('disabled', false);
                else
                    button.prop('disabled', true);

            });

            button.click(function () {
                name = input.val();

                input.unbind();
                button.unbind();
                input.val('');

                changeState(STATE_LEVEL_SELECTION);
            });

        }

    }

    var register = new RegisterLogics();


// ---------------------------         LevelSelectLogics        ---------------------------------


    var LevelSelectLogics = function () {

        var view = $('#level_select-body');
        var radio = $('input:radio');
        var button = $('#level-button');
        button.prop('disabled', true);

        this.show = function()
        {

            view.removeClass( "hidden" );

            enable();

        }

        this.hide = function()
        {

            view.addClass( "hidden" );

        }

        function enable()
        {
            $( document ).ready(function() {
                $( ".name" ).text(name);
            });

            radio.change(function(){
                if (radio.is(':checked')) {
                    var radioChecked = $('input[name=optradio]:checked');
                    delay = radioChecked.val();
                    button.prop('disabled', false);
                } else {
                    button.prop('disabled', true);
                }
            });

            button.click(function () {

                radio.unbind();
                button.unbind();

                changeState(STATE_GAME_START);
            });

        }

    }

    var level_select = new LevelSelectLogics();


// ---------------------------         GameStartLogics        ---------------------------------


    var GameStartLogics = function () {

        var view = $('#game_start-body');
        // var input = $('#register-input');
        // var button = $('#register-button');
        var timeout;
        var letterAppearanceTime;
        var keyUpTime;
        var duration;
        var totalDuration = 0;
        var totalKeyup = 0;
        var timeout;

        this.show = function()
        {

            view.removeClass( "hidden" );
            gameStartTime = Date.now();
            enable();

        }

        this.hide = function()
        {

            view.addClass( "hidden" );
            // input.unbind();
            // button.unbind();
            userAction = true;
            gameEndTime = Date.now();

            gameTotalTime = (gameEndTime - gameStartTime) / 1000;

        }

        function changeLetter()
        {
            clearTimeout(timeout);

            if(lifesCount == 0)
            {
                changeState(STATE_GAME_OVER);
                return;
            }

            if(!userAction)
            {
                lifesCount -=1;
                $(".lifes").html(lifesCount);
            }

            var position = Math.floor(Math.random() * charSet.length);
            randomChar = charSet.substring(position, position + 1);
            $( "#letterToType" ).text(randomChar);
            letterAppearanceTime = Date.now();

            timeout = setTimeout(function() { changeLetter(); }, delay);

            if(delay == 1500){
                level = 'FAST!!';
            } else if(delay == 2000) {
                level = 'NORMAL';
            } else {
                level = 'SLOW...';
            }

            $(".level").html(level);

            userAction = false;

            if(Math.random() < 0.1){

                gold = true;
                $( "#letterToType" ).addClass('gold');

            } else {

                $( "#letterToType" ).removeClass('gold');
                gold = false;

            }

        }

        function enable()
        {
            changeLetter();

            $(window).keyup(function(e){
                var myKey = e.key;

                keyUpTime = Date.now();

                duration = (keyUpTime - letterAppearanceTime) / 1000;

                totalDuration += duration;
                totalKeyup++;
                averageSpeedDuration = totalDuration / totalKeyup;

                console.log(duration);
                console.log(totalDuration);
                console.log(averageSpeedDuration);

                if(myKey === $( "#letterToType" ).text())
                {

                    if(score % 20 === 0)
                        if(score != 0)
                            lifesCount +=1;

                    if(gold === true)
                    {
                        for(i = 0; i < 5; i++)
                        {
                            score++;

                            if(score % 20 === 0)
                                lifesCount +=1;

                        }

                    } else {

                        score += 1;

                    }

                    $(".time").html(duration);

                    $(".lifes").html(lifesCount);

                    $(".score").html(score);

                    userAction = true;

                }
                else
                {

                    lifesCount -=1;
                    $(".lifes").html(lifesCount);

                }

                changeLetter();

                userAction = false;

            });

        }

    }

    var game_start = new GameStartLogics();


// ---------------------------         GameOverLogics        ---------------------------------


    var GameOverLogics = function () {

        var view = $('#game_over-body');
        var button = $('#game-over-button');
        var input = $('#game-over-input');

        this.show = function()
        {

            view.removeClass( "hidden" );

            enable()

            console.log('einaaaa! 1');

            window.onload = function() {

                document.getElementById("#results").onclick = function () {

                    console.log('einaaaa! 2 ');


                    $("#results").link.setAttribute("href", "results");

                    // document.getElementById("#results").href="resultssssss";
                    // $("#w3s").attr("href", "https://www.w3schools.com/jquery");
                    // window.location("results");
                    // location.href = "results/NORMAL";
                    return false;
                }

            }

        }

        this.hide = function()
        {

            view.addClass( "hidden" );

        }

        function enable()
        {

            saveResult();

            function saveResult() {

                $.ajax({
                    url: saveULR,
                    method: "POST",
                    data: {
                        name: name,
                        level: level,
                        score: score,
                        game_time: gameTotalTime,
                        speed_time: averageSpeedDuration,
                    }
                });
            }

            button.click(function () {
                // name = input.val();

                console.log('kukuk game over, start again')
                button.unbind();
                input.val('');


                changeState(STATE_REGISTER);
            });
        }
    }

    var game_over = new GameOverLogics();


// ---------------------------         changeState        ---------------------------------


    function changeState(value)
    {
        if(lastState)
            lastState.hide();

        switch(value) {
            case STATE_REGISTER:
                lastState = register;
                break;
            case STATE_LEVEL_SELECTION:
                lastState = level_select;
                break;
            case STATE_GAME_START:
                lastState = game_start;
                break;
            case STATE_GAME_OVER:
                lastState = game_over;
                break;
            default:

        }

        lastState.show();

    }

    changeState(STATE_REGISTER);

}