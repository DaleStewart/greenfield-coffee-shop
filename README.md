# Greenfield Coffee Shop

A greenfield demo application for a modern coffee shop, built with **Node.js**, **Express**, **EJS**, and **Bootstrap 5**.

## About

This project is a from-scratch ("greenfield") implementation of a coffee shop web application. It serves as a demo/learning project covering common patterns such as menu browsing and order placement.

> **Note:** The shopping cart and checkout flow are intentionally omitted — they will be built as part of a live demo exercise.

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section, featured drinks, and value propositions |
| About Us | `/about` | Shop story, values, and team |
| Order Coffee | `/order` | Full menu with category filters and "Add to Order" placeholder buttons |

## Project Structure

```
greenfield-coffee-shop/
├── app.js                  # Express server entry point
├── package.json
├── data/
│   └── coffees.json        # Coffee menu data (8 items)
├── public/
│   └── css/
│       └── styles.css      # Custom styles (warm coffee palette)
├── routes/
│   └── index.js            # Route definitions (/, /about, /order)
└── views/
    ├── home.ejs             # Home page
    ├── about.ejs            # About Us page
    ├── order.ejs            # Order menu page
    └── partials/
        ├── header.ejs       # Shared navbar + head
        └── footer.ejs       # Shared footer + scripts
```

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 4
- **Templating:** EJS
- **Styling:** Bootstrap 5 (CDN) + custom CSS
- **Data:** Static JSON file (no database required)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)

### Run Locally

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

For development with auto-restart on file changes (Node.js 18.11+):

```bash
npm run dev
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.