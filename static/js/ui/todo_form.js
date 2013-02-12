'use strict';

define(

  [
		'components/flight/lib/component'
  ],

  function(defineComponent) {
		
		return defineComponent(todoForm);
		
    function todoForm() {
			this.defaultAttrs({
				newTodoSelector: "#newTodo",
				removeTodoSelector: ".remove"
			});
			
			this.createOnEnter = function(e) {
				if (e.keyCode != 13) return;
				var input = $(e.target);
				if (!input.val()) return;
				
				this.trigger("addTodo", {title: input.val()});
				
				input.val("");
			};
			
			this.removeTodo = function(e) {
				this.trigger("removeTodos", { ids: [$(e.target).parent().parent().data('id')] });
				e.preventDefault();
			};
			
			this.after("initialize", function() {
        this.on("keypress", {
					newTodoSelector: this.createOnEnter
				});
				
				this.on('click', {
					removeTodoSelector: this.removeTodo
				})
      });
    }
  }
);