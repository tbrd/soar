'use strict';

define(

  [
		'js/ui/todo_form',
		'js/data/todo_form'
  ],

  function(
		ToDoFormUI,
		ToDoFormData
		) {

    function initialize() {
			ToDoFormUI.attachTo(document);
			ToDoFormData.attachTo(document);
    }

    return initialize;
  }
);
