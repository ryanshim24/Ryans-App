app.filter("time", ()->
  (input)->
    time = input.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) or [time]
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

