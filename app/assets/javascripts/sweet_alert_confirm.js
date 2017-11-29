(function() {
  var handleConfirm = function(element) {
    if (!allowAction(this)) {
      Rails.stopEverything(element)
    }
  }

  var allowAction = function(element) {
    if (element.getAttribute('data-confirm-swal') === null) {
      return true
    }

    showConfirmationDialog(element)
    return false
  }

  // Display the confirmation dialog
  var showConfirmationDialog = function(element) {
    var message = element.getAttribute('data-confirm-swal')
    var text = element.getAttribute('data-text')

    swal({
      title: message || 'Are you sure?',
      text: text || '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then(function(result) {
      confirmed(element, result)
    })
  }

  var confirmed = function(element, result) {
    if (result.value) {
      // User clicked confirm button
      element.removeAttribute('data-confirm-swal')
      element.click()
    }
  }

  // Hook the event before the other rails events so it works togeter
  // with `method: :delete`.
  // See https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts/rails-ujs/start.coffee#L69
  document.addEventListener('rails:attachBindings', function(e) {
    Rails.delegate(document, 'a[data-confirm-swal]', 'click', handleConfirm)
  })

}).call(this)
