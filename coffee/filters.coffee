app.filter("time", ()->
  (input)->
    time = input.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) or [time]
    console.log time
    if time.length >1
      time = time.slice(1)
      time[5] = (if time[0] < 12 then " AM" else " PM")
      time[0] = time[0] % 12 or 12
    time.splice(3, 1)
    time.join ""
)

app.filter "winnerArrow", ->
  (input) ->
    if input is "X"
      "← X"
    else if input is "O"
      "O →"
    else
      input

app.filter "movieTime", ->
  (input) ->
    time = input.split("")
    time = time.slice(11)
    time = time.join ""
    movieTime = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) or [time]

    if movieTime.length >1
      movieTime = movieTime.slice(1)
      movieTime[5] = (if movieTime[0] < 12 then " AM" else " PM")
      movieTime[0] = movieTime[0] % 12 or 12
    movieTime.splice(3, 1)
    movieTime.join ""