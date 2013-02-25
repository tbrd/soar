'use strict';

define(

  [
    'components/flight/lib/component',
    './with_ajax'
  ],

  function (defineComponent, withAjax) {

    return defineComponent(todoForm, withAjax);

    function todoForm() {

      this.handleTodos = function (data, status, xhr) {
        this.trigger('dataTodos', {
          todos: data.objects
        });
      };

      this.handleTodoCreated = function (data, status, xhr) {
        this.trigger('dataTodoCreated', {
          todo: data
        });
      };

      this.handleTodoRemoved = function(data, status, xhr) {
        this.trigger('dataTodoRemoved', {
          id: data
        });
      };

      this.handleTodoDone = function (data, status, xhr) {
        this.trigger('dataTodoDone', {
          id: data.id
        });
      };

      this.loadTodos = function (e, data) {
        this.get('api/v1/todo', JSON.stringify({}), this.handleTodos.bind(this));
      };

      this.createTodo = function (e, data) {
        var requestData = JSON.stringify({"title": data.title, "done": false, "owner": data.ownerId});
        this.post('api/v1/todo/', requestData, this.handleTodoCreated.bind(this));
      };

      this.removeTodos = function (e, data) {
        data.ids.forEach(function(value, index) {
          var url = 'api/v1/todo/' + value + '/';
          this.delete(url, JSON.stringify({}), this.handleTodoRemoved.bind(this));
        }, this);
      };

      this.toggleDone = function (e, data) {
        data.objects.forEach(function(value, index) {
          var url = 'api/v1/todo/' + value.id + '/';
          this.put(url, JSON.stringify({"done": value.done}), this.handleTodoDone.bind(this));
        }, this);
      };

      this.after("initialize", function () {
        this.on("addTodo", this.createTodo);
        this.on("removeTodos", this.removeTodos);
        this.on("loadTodos", this.loadTodos);
        this.on("done", this.toggleDone);
      });
    }
  }
);