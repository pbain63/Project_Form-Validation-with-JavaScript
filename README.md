# Form Validation with JavaScript

A lightweight, robust client-side form validation solution built with **Vanilla JavaScript**. This project demonstrates industry best practices for DOM manipulation, Regular Expressions (Regex), and user experience (UX) design by providing real-time, semantic feedback without relying on heavy external libraries.

## [Live Demo](https://pbain63.github.io/Project_Form-Validation-with-JavaScript/)

## Table of Contents

- [Screenshot](#screenshot)
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Future Improvements](#future-improvements)
- [Contributing](#Contributing)
- [License](#license)

---

## Screenshot

---

## Overview

This project demonstrates client-side form validation using the **Constraint Validation API** — a native browser API that provides built-in validation without external libraries.[reference:0] The form collects user registration data (name, password, email, country, postal code) with real-time validation feedback and a success state upon submission.

## Features

- **Real-time validation** — Each field validates on input, providing instant feedback
- **Constraint Validation API** — Leverages native browser validation (`validity.valueMissing`, `validity.typeMismatch`, `validity.tooShort`)[reference:2]
- **Country‑specific postal code validation** — Supports Switzerland (4 digits), France (5 digits), Germany (5 digits), The Netherlands (4 digits + 2 letters), and Bangladesh (4 digits)[reference:3]
- **Password confirmation check** — Ensures both password fields match[reference:4]
- **Success overlay** — Displays a confirmation message with the user's name after successful submission[reference:5]
- **Fully responsive** — Adapts to mobile screens with a single‑column layout[reference:6]
- **Accessible feedback** — Clear error and success messages with appropriate ARIA‑friendly styling

## Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Markup     | HTML5                                   |
| Styling    | CSS3 (Flexbox, Grid, custom properties) |
| Logic      | Vanilla JavaScript (ES6+)               |
| Validation | Constraint Validation API               |

No external dependencies, pure vanilla implementation.

<!-- ### **Tech Stack**
*   **HTML5**: Semantic markup for form structure.
*   **CSS3**: Custom variables and Flexbox for responsive layout.
*   **JavaScript (ES6+)**: Event listeners, arrow functions, and DOM API. -->

---

## Project Structure

```bash
Project_Form-Validation-with-JavaScript/
├── index.html # Main form markup and structure
├── styles.css # All styling (desktop + mobile responsive)
├── main.js # Validation logic and event handling
└── README.md # Project documentation

```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or server required, this is a static project

### Local Development

1. **Clone the repository**

   ```
   git clone https://github.com/pbain63/Project_Form-Validation-with-JavaScript.git
   cd Project_Form-Validation-with-JavaScript
   ```

2. **Open the project**

Double‑click index.html to open in your browser, OR

Use a local development server (recommended):

```
# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

```

### Validation Flow

A. User inputs data: Each field triggers validation on input events

B. Constraint checks: The browser's Constraint Validation API evaluates:

- valueMissing: Required fields

- typeMismatch: Email format

- tooShort: Minimum length requirements

- Custom logic: Password confirmation and postal‑code patterns

C. Visual feedback: Error messages appear inline with color coded styling:

- Red background for errors

- Green background for success (e.g. password match)

D. Form submission: Only proceeds if all validations pass, then displays a success overlay.

---

## Future Improvements

- Password strength indicator
- Show/hide password feature
- Confirm password validation
- Phone number validation
- Accessibility improvements
- Dark mode
- Unit testing
- Better animation and transitions

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository

2. Create a feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add some amazing feature`)

4. Push to the branch (`git push origin feature/amazing-feature`)

5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
