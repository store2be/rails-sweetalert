import Rails from 'rails-ujs'
import sweetAlert from 'sweetalert2/dist/sweetalert2.all'

const confirmed = (element, result) => {
  if (result.value) {
    // User clicked confirm button
    element.removeAttribute('data-confirm-swal')
    element.click()
  }
}

// Display the confirmation dialog
const showConfirmationDialog = (element) => {
  const message = element.getAttribute('data-confirm-swal')
  const text = element.getAttribute('data-text')

  sweetAlert({
    title: message || 'Are you sure?',
    text: text || '',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
  }).then(result => confirmed(element, result))
}

const allowAction = (element) => {
  if (element.getAttribute('data-confirm-swal') === null) {
    return true
  }

  showConfirmationDialog(element)
  return false
}

function handleConfirm(element) {
  if (!allowAction(this)) {
    Rails.stopEverything(element)
  }
}

Rails.delegate(document, 'a[data-confirm-swal]', 'click', handleConfirm)

