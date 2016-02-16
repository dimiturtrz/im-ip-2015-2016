$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:8080/05_SampleBackend/api/v1/tasks";
	function taskEndpoint(taskId) {
		return ENDPOINT + "/" + taskId;
	}

	function showPanel(panelName) {
		var ALL_PANELS = ["emptyPanel", "readPanel", "updatePanel", "createPanel"];
		_.forEach(ALL_PANELS, function(nextValue) {
			$("#"+nextValue).hide();
		});
		$("#"+panelName).show();
	}

	
	// list tasks
	function listTasks() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	//create task
	function addTask(task) {
		return $.ajax(ENDPOINT, {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(task),
			dataType: "json"
		});
	}

	//read task
	function readTask(taskId) {
		return $.ajax(taskEndpoint(taskId), {
			method: "GET",
			dataType: "json"
		});
	}
	
	// delete task
	function deleteTask(taskId){
		$.ajax(taskEndpoint(taskId), {
			method: "DELETE"
		});
	}
	
	// update task
	function updateTask(task, taskId){
		$.ajax(taskEndpoint(taskId), {
			method: "PUT",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(task),
			dataType: "json"
		})
	}
	
	// read panel
	function setupReadPanel(taskId){
		readTask(taskId).then(showTaskView);
		$("#readPanel .task-action-remove").click(function(){
			resetFields();
			deleteTask(taskId);
			reloadTasks();
		});
		$("#readPanel .task-action-ok").click(function(){
			setupEditPanel(taskId);
		});
	}
	
	// edit panel
	function setupEditPanel(taskId){
		showPanel("updatePanel");
		$("#updatePanel input[name=title]").val($("#readPanel .panel-body .task-title").text());
		$("#updatePanel textarea[name=description]").val($("#readPanel .panel-body .task-description").text());
		$("#updatePanel .task-action-ok").click(function(){
			var task = getTaskObject("update");
			updateTask(task, taskId);
			showPanel("emptyPanel");
		});
	}
	
	
	// create panel
	function setupCreatePanel(){
		showPanel("createPanel");
		$("#createPanel .task-action-ok").click(function() {
			var task = getTaskObject("create");
			addTask(task);
			reloadTasks();
			$("#createPanel input[name=title]").val("");
			$("#createPanel textarea[name=description]").val("");
			showPanel("emptyPanel");
		});
	}
	
	function getTaskObject(inputPanel){
		var panelSelector = "#" + inputPanel + "Panel ";
		return {
			title: $(panelSelector + "input[name=title]").val(),
			description: $(panelSelector + "textarea[name=description]").val(),
		}
	}
	
	function showTaskView(task) {
		$("#readPanel .task-title").text(task.title);
		$("#readPanel .task-description").text(task.description);
		showPanel("readPanel");
	}
	function reloadTasks() {
		listTasks().then(function(response) {
			function addTaskToList(task) {
				var newItem = $("<li />");
				newItem.text(task.title);
				newItem.addClass("list-group-item");
				newItem.attr("data-task-id", task.id);
				$("#tasksList").append(newItem);
			}
			$("#tasksList").html("");
			_.forEach(response, addTaskToList);
		});
	}
	function resetFields(){
		$("#createPanel input[name=title]").val("");
		$("#createPanel textarea[name=description]").val("");
		$("#readPanel .task-title").text("");
		$("#readPanel .task-description").text("");
	}
	
	function attachHandlers() {
		$(document).on("click", "#tasksList [data-task-id]", function() {
			var taskId = $(this).attr("data-task-id");
			setupReadPanel(taskId);
		});
		
		$(document).on("click", "#addTaskButton", function() {
			setupCreatePanel();
		});
		
		$(".task-action-cancel").click(function() {
			resetFields();
			showPanel("emptyPanel");
		});
	}
	attachHandlers();
	reloadTasks();
});