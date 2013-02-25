'use strict';

define(

  [
    'components/flight/lib/component',
    'js/templates',
    'components/handlebars/handlebars'
  ],

  function (defineComponent, templates) {

    return defineComponent(todoForm);

    function todoForm() {
      this.defaultAttrs({
        newTodoSelector: '#newTodo',
        removeTodoSelector: '.remove',
        removeAllSelector: '.remove-all',
        doneTodoSelector: 'li input[type="checkbox"]',
        doneAllSelector: '.actions input[type="checkbox"]',
        itemsContainerSelector: '#items',
        itemSelector: '.item',
        actionsSelector: '.actions',
        ownerIdSelector: '#ownerId',
        doneClass: 'done',
        isDoneCheckboxSelector: '.is-done'
      });

      this.template = Handlebars.compile(templates.todoItem);

      this.createOnEnter = function (e) {
        if (e.keyCode != 13) return;
        var input = $(e.target);
        if (!input.val()) return;
        var $ownerId = this.select('ownerIdSelector');

        this.trigger('addTodo', {title: input.val(), ownerId: $ownerId.val()});

        input.val('');
      };

      this.removeTodo = function (e) {
        this.trigger('removeTodos', { ids: [$(e.target).parent().parent().data('id')] });
        e.preventDefault();
      };

      this.removeAllTodos = function (e) {
        var ids = [];

        this.select('itemSelector').each(function (index, value) {
          ids.push($(value).data('id'));
        });
        if(ids.length > 0) {
          this.trigger('removeTodos', { ids: ids});
        }
        e.preventDefault();
      };

      this.toggleDone = function (e) {
        var $item = $(e.target).closest(this.attr.itemSelector);
        var done = $(e.target).is(':checked');
        this.trigger('done', {
          objects: [
            {
              id: $item.data('id'),
              done: done
            }
          ]
        });
      };

      this.toggleAllDone = function (e) {
        var objects = [];
        if ($(e.target).is(':checked')) {
          this.select('itemSelector').each(function (index, itemElement) {
            var $item = $(itemElement);
            if ($item.hasClass('done')) return;
            objects.push({
              id: $item.data('id'),
              done: true
            });

            $item.find(this.attr.isDoneCheckboxSelector).attr('checked', 'checked');
          });
        } else {
          this.select('itemSelector').each(function (index, item) {
            var $item = $(item);
            if ($item.hasClass(this.attr.doneClass)) {
              objects.push({
                id: $(item).data('id'),
                done: false
              });
              $item.find(this.attr.isDoneCheckboxSelector).removeAttr('checked');
            }
          });
        }

        this.trigger('done', {objects: objects});
      };

      this.handleTodosData = function (e, data) {
        if (data.todos && data.todos.length > 0) {
          this.select('actionsSelector').show();
        }
        data.todos.forEach(function (value, index) {
          var result = this.template(value);
          this.select('itemsContainerSelector').append(result);
        }, this);
      };

      this.handleTodoCreated = function (e, data) {
        var todo = data.todo;
        var result = this.template(todo);

        this.select('actionsSelector').show();

        this.select('itemsContainerSelector').prepend(result);
      };

      this.getItemById = function (id) {
        return this.select('itemSelector').filter(function () {
          return $(this).data('id') === id;
        });
      };

      this.handleTodoRemoved = function (e, data) {
        this.getItemById(data.id).remove();
        if (this.select('itemSelector').length <= 0) {
          this.select('actionsSelector').hide();
        }
      };

      this.handleTodoDone = function (e, data) {
        this.getItemById(data.id).toggleClass(this.attr.doneClass);
      };

      this.after('initialize', function () {
        this.on('keypress', {
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