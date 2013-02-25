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
			this.defaultAttrs({
				newTodoSelector: "#newTodo",
				removeTodoSelector: ".remove",
        removeAllSelector: ".remove-all",
        doneTodoSelector: 'li input[type="checkbox"]',
        doneAllSelector: '.actions input[type="checkbox"]',
        itemsContainerSelector: '#items',
        itemSelector: '#items li',
        actionsSelector: '.actions',
        ownerIdSelector: '#ownerId',
        doneClass: 'done'
			});

      this.template = Handlebars.compile(templates.todoItem);

			this.createOnEnter = function(e) {
				if (e.keyCode != 13) return;
				var input = $(e.target);
				if (!input.val()) return;
        var $ownerId = this.select('ownerIdSelector');

				this.trigger("addTodo", {title: input.val(), ownerId: $ownerId.val()});

				input.val("");
			};

			this.removeTodo = function(e) {
				this.trigger("removeTodos", { ids: [$(e.target).parent().parent().data('id')] });
				e.preventDefault();
			};

      this.removeAllTodos = function(e) {
        var ids = [];
        if ($("#items .empty").length <= 0) {
          this.select('itemSelector').each(function(index, value) {
            ids.push($(value).data('id'));
          });
          this.trigger("removeTodos", { ids: ids});
        }
        e.preventDefault();
      };

      this.toggleDone = function(e) {
        this.trigger("done", { objects: [{"id": $(e.target).parent().parent().data('id'), "done": $(e.target).is(":checked")}] });
      };

      this.toggleAllDone = function(e) {
        var objects = [];
        if ($(e.target).is(':checked')) {
          this.select('itemSelector').each(function(index, value) {
            if ($(value).hasClass('done')) return;

            objects.push({"id": $(value).data('id'), "done": true});

            $(value).find('input[type="checkbox"]').attr('checked', 'checked');
          });
        } else {
          this.select('itemSelector').each(function(index, item) {
            var $item = $(item);
            if ($item.hasClass('done')) {
              objects.push({"id": $(item).data('id'), "done": false});

              $item.find('input[type="checkbox"]').removeAttr('checked');
            }
          });
        }

        this.trigger("done", {objects: objects});
      };

      this.handleTodosData = function(e, data) {
        if (data.todos && data.todos.length > 0) {
          this.select('actionsSelector').show();
        }
        $.each(data.todos, function(index, value) {
          var result = this.template(value);
          this.select('itemsContainerSelector').append(result);
        });
      };

      this.handleTodoCreated = function(e, data) {
        var todo = data.todo;
        var result = this.template(todo);

        this.select('actionsSelector').show();

        this.select('itemsContainerSelector').prepend(result);
      };

      this.handleTodoRemoved = function(e, data) {
        $("#todo_" + data.id).remove();
        if (this.select('itemSelector').length <= 0) {
          this.select('actionsSelector').hide();
        }
      };

      this.handleTodoDone = function(e, data) {
        $("#todo_" + data.id).toggleClass(this.attr.doneClass);
      };

      this.after("initialize", function() {
        this.on("keypress", {
          newTodoSelector: this.createOnEnter
        });

        this.on('click', {
          removeTodoSelector: this.removeTodo,
          removeAllSelector: this.removeAllTodos
        });

        this.on('change', {
          doneTodoSelector: this.toggleDone,
          doneAllSelector: this.toggleAllDone
        });

        this.on('dataTodoCreated', this.handleTodoCreated);
        this.on('dataTodoDone', this.handleTodoDone);
        this.on('dataTodoRemoved', this.handleTodoRemoved);
        this.on('dataTodos', this.handleTodosData);
        this.trigger('loadTodos');
      });
    }
  }
);