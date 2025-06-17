// Authentication JavaScript
document.addEventListener("DOMContentLoaded", () => {
  initializeAuth()
})

function initializeAuth() {
  setupPasswordToggles()
  setupFormValidation()
  setupSocialAuth()
}

function setupPasswordToggles() {
  const passwordToggles = document.querySelectorAll(".password-toggle")

  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const input = this.parentElement.querySelector("input")
      const icon = this.querySelector("i")

      if (input.type === "password") {
        input.type = "text"
        icon.className = "fas fa-eye-slash"
      } else {
        input.type = "password"
        icon.className = "fas fa-eye"
      }
    })
  })
}

function setupFormValidation() {
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }
}

function handleLogin(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const email = formData.get("email")
  const password = formData.get("password")

  // Basic validation
  if (!email || !password) {
    showAuthError("Por favor, completá todos los campos")
    return
  }

  // Simulate login API call
  showAuthLoading(true)

  setTimeout(() => {
    // Mock successful login
    const user = {
      id: 1,
      email: email,
      firstName: "Usuario",
      lastName: "Demo",
    }

    localStorage.setItem("currentUser", JSON.stringify(user))
    showAuthSuccess("¡Inicio de sesión exitoso!")

    setTimeout(() => {
      window.location.href = "index.html"
    }, 1500)
  }, 2000)
}

function handleRegister(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")
  const acceptTerms = formData.get("acceptTerms")

  // Validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    showAuthError("Por favor, completá todos los campos obligatorios")
    return
  }

  if (password !== confirmPassword) {
    showAuthError("Las contraseñas no coinciden")
    return
  }

  if (password.length < 8) {
    showAuthError("La contraseña debe tener al menos 8 caracteres")
    return
  }

  if (!acceptTerms) {
    showAuthError("Debés aceptar los términos y condiciones")
    return
  }

  // Simulate registration API call
  showAuthLoading(true)

  setTimeout(() => {
    // Mock successful registration
    const user = {
      id: Date.now(),
      email: email,
      firstName: firstName,
      lastName: lastName,
    }

    localStorage.setItem("currentUser", JSON.stringify(user))
    showAuthSuccess("¡Cuenta creada exitosamente!")

    setTimeout(() => {
      window.location.href = "index.html"
    }, 1500)
  }, 2000)
}

function setupSocialAuth() {
  const googleBtns = document.querySelectorAll(".btn-google")
  const facebookBtns = document.querySelectorAll(".btn-facebook")

  googleBtns.forEach((btn) => {
    btn.addEventListener("click", () => handleSocialAuth("google"))
  })

  facebookBtns.forEach((btn) => {
    btn.addEventListener("click", () => handleSocialAuth("facebook"))
  })
}

function handleSocialAuth(provider) {
  showAuthLoading(true)

  // Simulate social auth
  setTimeout(() => {
    const user = {
      id: Date.now(),
      email: `usuario@${provider}.com`,
      firstName: "Usuario",
      lastName: provider === "google" ? "Google" : "Facebook",
      provider: provider,
    }

    localStorage.setItem("currentUser", JSON.stringify(user))
    showAuthSuccess(`¡Conectado con ${provider}!`)

    setTimeout(() => {
      window.location.href = "index.html"
    }, 1500)
  }, 2000)
}

function showAuthError(message) {
  removeAuthMessages()

  const errorDiv = document.createElement("div")
  errorDiv.className = "auth-message auth-error"
  errorDiv.style.cssText = `
        background: #fef2f2;
        color: #dc2626;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        border: 1px solid #fecaca;
        font-size: 0.875rem;
    `
  errorDiv.textContent = message

  const form = document.querySelector(".auth-form")
  form.insertBefore(errorDiv, form.firstChild)
}

function showAuthSuccess(message) {
  removeAuthMessages()

  const successDiv = document.createElement("div")
  successDiv.className = "auth-message auth-success"
  successDiv.style.cssText = `
        background: #f0fdf4;
        color: #16a34a;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        border: 1px solid #bbf7d0;
        font-size: 0.875rem;
    `
  successDiv.textContent = message

  const form = document.querySelector(".auth-form")
  form.insertBefore(successDiv, form.firstChild)
}

function showAuthLoading(show) {
  const submitBtns = document.querySelectorAll('button[type="submit"]')

  submitBtns.forEach((btn) => {
    if (show) {
      btn.disabled = true
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...'
    } else {
      btn.disabled = false
      btn.innerHTML = btn.dataset.originalText || "Enviar"
    }
  })
}

function removeAuthMessages() {
  const messages = document.querySelectorAll(".auth-message")
  messages.forEach((msg) => msg.remove())
}

// Store original button text
document.addEventListener("DOMContentLoaded", () => {
  const submitBtns = document.querySelectorAll('button[type="submit"]')
  submitBtns.forEach((btn) => {
    btn.dataset.originalText = btn.textContent
  })
})
