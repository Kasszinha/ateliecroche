function toggleMenu() {
  const menu = document.getElementById("mobile-menu")
  if (menu) {
    menu.classList.toggle("hidden")
  }
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el)
  })
}

function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      showFieldError(field, "Este campo é obrigatório")
      isValid = false
    } else {
      clearFieldError(field)
    }

    if (field.type === "email" && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(field.value)) {
        showFieldError(field, "Email inválido")
        isValid = false
      }
    }
  })

  return isValid
}

function showFieldError(field, message) {
  clearFieldError(field)

  field.classList.add("border-red-500")

  const error = document.createElement("div")
  error.className = "text-red-500 text-sm mt-1 field-error"
  error.textContent = message

  field.parentNode.appendChild(errorw)
}

function clearFieldError(field) {
  field.classList.remove("border-red-500")

  const error = field.parentNode.querySelector(".field-error")
  if (error) {
    error.remove()
  }
}

function showToast(message, type = "info") {
  const toast = document.createElement("div")
  toast.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transform transition-all duration-300 translate-x-full`

  switch (type) {
    case "success":
      toast.classList.add("bg-green-600")
      break
    case "error":
      toast.classList.add("bg-red-600")
      break
    default:
      toast.classList.add("bg-blue-600")
  }

  toast.textContent = message
  document.body.appendChild(toast)

  setTimeout(() => {
    toast.classList.remove("translate-x-full")
  }, 100)

  setTimeout(() => {
    toast.classList.add("translate-x-full")
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 3000)
}

function simulateButtonLoading(button, duration = 2000) {
  const originalText = button.textContent
  button.classList.add("btn-loading")
  button.disabled = true

  setTimeout(() => {
    button.classList.remove("btn-loading")
    button.disabled = false
    button.textContent = originalText
  }, duration)
}

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScrolling()
  initScrollAnimations()

  const tailwind = window.tailwind
  if (typeof tailwind !== "undefined") {
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            modern: ["Inter", "system-ui", "sans-serif"],
          },
          animation: {
            "fade-in": "fadeIn 0.8s ease-in-out",
            "slide-up": "slideUp 0.8s ease-out",
            float: "float 3s ease-in-out infinite",
            "pulse-slow": "pulse 3s infinite",
          },
        },
      },
    }
  }
})
