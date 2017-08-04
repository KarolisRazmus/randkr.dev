@extends('app')

@section('content')

    <div class="container">
        <div class="col-xs-4 col-xs-offset-4 form-group">


            <div>
                @foreach($games as $game)

                    <li>{{$game->name}} scores {{$game->score}}</li>

                @endforeach
            </div>



        </div>
    </div>

@endsection