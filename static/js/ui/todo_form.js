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
				removeTodoSelector: ".remove",
        removeAllSelector: ".remove-all",
        doneTodoSelector: 'li input[type="checkbox"]',
        doneAllSelector: '.actions input[type="checkbox"]'
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
      
      this.removeAllTodos = function(e) {
        var ids = [];
        if ($("#items .empty").length <= 0) {
          $.each($("#items li"), function(index, value) {
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
          $.each($("#items li"), function(index, value) {
            if ($(value).hasClass('done')) return;
          
            objects.push({"id": $(value).data('id'), "done": true});
          
            $(value).find('input[type="checkbox"]').attr('checked', 'checked');
          });
        } else {
          $.each($("#items li"), function(index, value) {
            if ($(value).hasClass('done')) {
              objects.push({"id": $(value).data('id'), "done": false});
          
              $(value).find('input[type="checkbox"]').removeAttr('checked');
            }
          });
        }
        
        this.trigger("done", {objects: objects});
      };
			
			this.after("initialize", function() {
        this.on("keypress", {
					newTodoSelector: this.createOnEnter
				});
				
				this.on('click', {
					removeTodoSelector: this.removeTodo
				});
        
        this.on('click', {
          removeAllSelector: this.removeAllTodos
        });
        
        this.on('change', {
          doneTodoSelector: this.toggleDone
        });
        
        this.on('change', {
          doneAllSelector: this.toggleAllDone
        });
        
        this.trigger('loadTodos');
      });
    }
  }
);