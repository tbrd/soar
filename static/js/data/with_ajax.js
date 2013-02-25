define([], function() {
  return withAjax;

  var withAjax = function() {
    this.makeAjaxRequest = function(method, url, data, success) {
      $.ajax({
        url: url,
        dataType: 'JSON',
        data: data,
        processData: false,
        contentType: "application/json",
        type: method,
        success: success
      });
    };

    this.get = function(url, data, success) {
      this.makeAjaxRequest('GET', url, data, success);
    };

    this.post = function(url, data, success) {
      this.makeAjaxRequest('POST', url, data, success);
    };

    this.delete = function(url, data, success) {
      this.makeAjaxRequest('DELETE', url, data, success);
    };

    this.put = function(url, data, success) {
      this.makeAjaxRequest('PUT', url, data, success);
    };
  }
});