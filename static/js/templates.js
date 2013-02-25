'use strict';

define(
  function () {
    var todoItem = "<li data-id='{{id}}' class='item {{#if done}} done {{/if}}'><label class='checkbox'><input class='is-done' type='checkbox' {{#if done}}checked='checked'{{/if}}>{{title}}</label>\
    <a class='remove' href='#'><i class='icon-remove'></i></a></li>";

    var emptyItem = "<li class='empty'>There are no Todos. Add one above.</li>";

    return {
      todoItem: todoItem,
      emptyItem: emptyItem
    }
  }
);