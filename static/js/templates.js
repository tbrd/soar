'use strict';

define(
  function() {
    var todoItem = "<li id='todo_{{id}}' data-id='{{id}}'><label class='checkbox'><input type='checkbox'>{{title}}</label>\
    <a class='remove' href='#'><i class='icon-remove'></i></a></li>";
    
    var emptyItem = "<li class='empty'>There are no items. Add one above.</li>";
		
		return {
			todoItem: todoItem,
      emptyItem: emptyItem
		}
	}
);