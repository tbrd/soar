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
      
      this.loadTodos = function(e, data) {
        var component = this,
        ownerId = $("#ownerId").val();
        $.ajax({
          url: 'api/v1/todo',
          dataType: 'JSON',
          data: JSON.stringify({"owner": ownerId}),
          processData: false,
          contentType: "application/json",
          type: 'GET',
          success: function(data, status, xhr) {
            if (data.objects.length > 0) {
               $(".actions").show();
            }
            $.each(data.objects, function(index, value) {
              var result = component.template(value);
              
              $("#items").append(result);
            });
          }
        });
      };
			
			this.createTodo = function(e, data) {
				var component = this,
        ownerId = $("#ownerId").val();
				$.ajax({
					url: 'api/v1/todo/',
					dataType: 'JSON',
					data: JSON.stringify({"title": data.title, "done": false, "owner": ownerId}),
					processData: false,
					contentType: "application/json",
					type: 'POST',
					success: function(data, status, xhr) {
						var result = component.template(data);
            
            $(".actions").show();
					
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
                $(".actions").hide();
							}
						}
					});
				});
			};
      
      this.toggleDone = function(e, data) {
        var component = this;
        $.each(data.objects, function(index, value) {
          $.ajax({
            url: 'api/v1/todo/' + value.id + '/',
            dataType: 'JSON',
            data: JSON.stringify({"done": value.done}),
            processData: false,
            contentType: "application/json",
            type: "PUT",
            success: function(data, status, xhr) {
              $("#todo_" + value.id).toggleClass("done");
            }
          });
        });
      };
			
			this.after("initialize", function() {
        this.on("addTodo", this.createTodo);
				this.on("removeTodos", this.removeTodos);
        this.on("loadTodos", this.loadTodos);
        this.on("done", this.toggleDone);
      });
    }
  }
);