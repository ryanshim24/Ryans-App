app.controller "ToDoCtrl", ($scope, $ionicModal) ->
  $scope.tasks = [{ title: 'Collect coins' },
    { title: 'Eat mushrooms' },
    { title: 'Get high enough to grab the flag' },
    { title: 'Find the Princess' }]

  $scope.deleteTask = (task) ->
    index = $scope.tasks.indexOf(task);
    $scope.tasks.splice(index, 1)


  # Create and load the Modal
  $ionicModal.fromTemplateUrl "new-task.html", ((modal) ->
    $scope.taskModal = modal

  ),
    scope: $scope
    animation: "slide-in-up"


  # Called when the form is submitted
  $scope.createTask = (task) ->
    $scope.tasks.push title: task.title
    console.log $scope.tasks
    $scope.taskModal.hide()
    task.title = ""



  # Open our new task modal
  $scope.newTask = ->
    $scope.taskModal.show()



  # Close the new task modal
  $scope.closeNewTask = ->
    $scope.taskModal.hide()
