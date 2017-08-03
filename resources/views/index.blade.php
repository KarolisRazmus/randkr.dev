
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">

    <title>randNumberGenerator</title>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- my css -->
    <link href="custom.css" rel="stylesheet">

</head>

<body>

<div id="title" class="navbar">
    <h1>Fast Typing Game</h1>
</div>

<div id="register-body" class="hidden">

    <div class="col-xs-12 col-md-4 col-md-offset-4">
        <div class="col-xs-8 col-xs-offset-2 form-group">
            <!-- <label class="text-center" for="usr">Name:</label> -->
            <input id="register-input" type="text" class="form-control" placeholder="Name">
        </div>
        <div class="col-xs-12 form-group">
            <button id="register-button" type="submit" class="btn btn-default center-block">REGISTER!!</button>
        </div>
    </div>

</div>

<div id="level_select-body" class="hidden">
    <div class="col-xs-12 col-md-4 col-md-offset-4">
        <div class="navbar well">
            <h2 class="name" class="inline-headers"></h2>
            <h2 class="score" class="inline-headers">- Score</h2>
        </div>
    </div>
    <div class="col-xs-12 col-md-4 col-md-offset-4 radio-inline text-center">
        <div class="col-xs-4 form-group">
            <label><input type="radio" name="optradio" value="3000">SLOW</label>
        </div>
        <div class="col-xs-4 form-group">
            <label><input type="radio" name="optradio" value="2000">NORMAL</label>
        </div>
        <div class="col-xs-4 form-group">
            <label><input type="radio" name="optradio" value="1500">FAST</label>
        </div>
        <div class="col-xs-12 form-group">
            <button id="level-button" type="submit" class="btn btn-default center-block">START GAME!!</button>
        </div>
    </div>

</div>

<div id="game_start-body" class="hidden">
    <div class="col-xs-12 col-md-4 col-md-offset-4">
        <div class="navbar well">
            LEVEL<h2 class="level" class="inline-headers"></h2>
            name<h2 class="name" class="inline-headers"></h2>
            lifes<h2 class="lifes" class="inline-headers">10</h2>
            score<h2 class="score" class="inline-headers"></h2>
            TIME!!!<h2 class="time" class="inline-headers"></h2>
        </div>
    </div>
    <div class="container">
        <div class="col-xs-12 col-md-4 col-md-offset-4">
            <div class="navbar well">
                <h2 id="letterToType" class="inline-headers"></h2>
            </div>
        </div>
    </div>

</div>

<div id="game_over-body" class="hidden">

    <div class="container">
        <div class="col-xs-4 col-xs-offset-4 form-group">
            <!-- <label class="text-center" for="usr">Name:</label> -->
            <input id="game-over-input" type="text" class="form-control" placeholder="game_over">
        </div>
        <div class="col-xs-4 col-xs-offset-4 form-group">
            <button id="game-over-button" type="submit" class="btn btn-default center-block">PLAY AGAIN</button>
        </div>
    </div>

</div>


</body>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

<script type="text/javascript" src="custom_script.js"></script>

<script>

    var game = new FastTyping();

</script>

</html>
