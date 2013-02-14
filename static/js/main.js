'use strict';

define(

  [
		'js/data/todo_form',
		'js/ui/todo_form'
  ],

  function(
    ToDoFormData,
		ToDoFormUI
		) {

    function initialize() {
      ToDoFormData.attachTo(document);
			ToDoFormUI.attachTo(document);
    }

    return initialize;
  }
);
