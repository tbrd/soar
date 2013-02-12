'use strict';

define(

  [
		'components/flight/lib/component',
		'js/templates',
		'components/handlebars/handlebars'
  ],

  function(defineComponent, templates) {
		
		return defineComponent(todoForm);
		
    function todoForm() {
			this.template = Handlebars.compile(templates.todoItem);
			
			this.emptyTemplate = Handlebars.compile(templates.emptyItem);
			
			this.createTodo = function(e, data) {
				var component = this;
				$.ajax({
					url: 'api/v1/todo/',
					dataType: 'JSON',
					data: JSON.stringify({"title": data.title, "done": false}),
					processData: false,
					contentType: "application/json",
					type: 'POST',
					success: function(data, status, xhr) {
						var result = component.template(data);
						
						if ($("#items .empty").length > 0) {
							$("#items .empty").remove();
						}
					
						$("#items").prepend(result);
					}
				});
			};
			
			this.removeTodos = function(e, data) {
				var component = this;
				$.each(data.ids, function(index, value) {
					$.ajax({
						url: 'api/v1/todo/' + value + '/',
						dataType: 'JSON',
						data: JSON.stringify({}),
						processData: false,
						contentType: "application/json",
						type: 'DELETE',
						success: function(data, status, xhr) {
							$("#todo_" + value).remove();
							if ($("#items").children().length <= 0) {
								var result = component.emptyTemplate({});
								
								$("#items").prepend(result);
							}
						}
					});
				});
			};
			
			this.after("initialize", function() {
        this.on("addTodo", this.createTodo);
				
				this.on("removeTodos", this.removeTodos);
      });
    }
  }
);