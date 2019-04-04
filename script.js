function c(p) {
  p.then((res) => {
    return res.text()
  }).then((text) => {
    try {
      const json = JSON.parse(text)
      $('#info').text(`Response (json): ${JSON.stringify(json)}`)
    } catch(error) {
      $('#info').text(`Response (plaintext): ${text}`)
    }
  }).catch((error) => {
    $('#info').text(`Error! ${error.message}`)
  })
}

$('#login').on('submit', (e) => {
  e.preventDefault()

  const email = $('#login-email').val()
  $('#login-email').val('')
  const password = $('#login-password').val()
  $('#login-password').val('')

  $('#info').text('Logging in...')
  c(fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email, password,
      rm: $('#login-rm').is(':checked').toString()
    }),
    credentials: 'include'
  }))
})

$('#signup').on('submit', (e) => {
  e.preventDefault()

  const name = $('#signup-name').val()
  $('#signup-name').val('')
  const email = $('#signup-email').val()
  $('#signup-email').val('')
  const password = $('#signup-password').val()
  $('#signup-password').val('')
  const passwordCnf = $('#signup-password-cnf').val()
  $('#signup-password-cnf').val('')

  $('#info').text('Registering...')
  c(fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name, email, password,
      confirm_password: passwordCnf
    }),
    credentials: 'include'
  }))
})

$('#confirm').on('submit', (e) => {
  e.preventDefault()

  const token = $('#confirm-token').val().replace(/%3D/g, '=')
  $('#confirm-token').val('')

  $('#info').text('Confirming...')
  c(fetch('http://localhost:3000/auth/confirm', {
    method: 'POST',
    body: JSON.stringify({
      cnf: token
    }),
    credentials: 'include'
  }))
})

$('#check').on('click', () => {
  $('#info').text('Checking...')
  fetch('http://localhost:3000/test', {
    credentials: 'include'
  }).then((res) => {
    if (res.ok) {
      $('#info').text('You are logged in!')
    } else {
      $('#info').text(`You are not logged in. Status: ${res.status}`)
    }
  })
})

$('#logout').on('click', () => {
  $('#info').text('Logging out...')
  c(fetch('http://localhost:3000/auth/logout', {
    method: 'POST',
    credentials: 'include'
  }))
})