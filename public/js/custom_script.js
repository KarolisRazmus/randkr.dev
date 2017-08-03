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

        this.show = function()
        {

            view.removeClass( "hidden" );

            enable();

        }

        this.hide = function()
        {

            view.addClass( "hidden" );
            // input.unbind();
            // button.unbind();
            userAction = true;

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
                $(".level").html('FAST!!');
            } else if(delay == 2000) {
                $(".level").html('NORMAL');
            } else {
                $(".level").html('SLOW...');
            }

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

                console.log(duration);

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

        this.show = function()
        {

            view.removeClass( "hidden" );

        }

        this.hide = function()
        {

            view.addClass( "hidden" );

        }

        function enable()
        {

            // input.keyup(function(){
            // if(input.val().length >= 3)
            // 	button.prop('disabled', false);
            // else
            // 	button.prop('disabled', true);

            // });

            button.click(function () {
                // name = input.val();

                console.log('kukuk game over, start again')
                button.unbind();
                input.val('');

                changeState(STATE_LEVEL_SELECTION);
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