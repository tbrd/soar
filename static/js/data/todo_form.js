'use strict';

define(

  [
    'components/flight/lib/component'
  ],

  function(defineComponent) {

    return defineComponent(todoForm);

    function todoForm() {

      this.loadTodos = function(e, data) {
        var component = this;
        $.ajax({
          url: 'api/v1/todo',
          dataType: 'JSON',
          data: JSON.stringify({}),
          processData: false,
          contentType: "application/json",
          type: 'GET',
          success: function(data, status, xhr) {
            component.trigger(document, {
              todos: data.objects
            });
          }
        });
      };

			this.createTodo = function(e, data) {
				var component = this;
				$.ajax({
					url: 'api/v1/todo/',
					dataType: 'JSON',
					data: JSON.stringify({"title": data.title, "done": false, "owner": data.ownerId}),
					processData: false,
					contentType: "application/json",
					type: 'POST',
					success: function(data, status, xhr) {
						component.trigger('dataTodoCreated', {
              todo: data
            });
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
              component.trigger('dataTodoRemoved', {
                id: value
              });
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
              component.trigger('dataTodoDone', {
                id: value.id
              });
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