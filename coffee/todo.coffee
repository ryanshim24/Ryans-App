app.controller "ToDoCtrl", ($scope, $ionicModal, $localForage) ->
  $scope.items = []
  $localForage.getItem("TASKS").then (tasks) ->
    $scope.items = tasks  if tasks



  # Initialize the dialog window
  $ionicModal.fromTemplateUrl("task-prompt.html",
    scope: $scope
    animation: "slide-in-up"
  ).then (modal) ->
    $scope.modal = modal


  $scope.showTaskPrompt = ->
    newTask =
      title: ""
      description: ""
      isComplete: null

    $scope.newTask = newTask
    $scope.modal.show()


  $scope.saveTask = ->
    $scope.items.push $scope.newTask
    console.log $scope.items
    $localForage.setItem("TASKS", $scope.items).then ->
      $scope.modal.hide()




  $scope.cancelTask = ->
    $scope.modal.hide()


  $scope.completeItem = (item) ->
    $scope.removeItem item


  $scope.ignoreItem = (item) ->
    $scope.removeItem item


  $scope.removeItem = (item) ->
    i = -1
    angular.forEach $scope.items, (task, key) ->
      i = key  if item is task


    if i >= 0
      $scope.items.splice i, 1
      $localForage.setItem "TASKS", $scope.items
      true
    false


