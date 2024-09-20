# Secure Node.js Express.js & TypeScript Boilerplate 🛡️

A robust and secure Express.js boilerplate with TypeScript, featuring advanced security middleware, MongoDB integration, and development tools for building production-ready Node.js applications.

## 🚀 Features

- **Express.js with TypeScript**: Modern, type-safe backend development
- **MongoDB Integration**: Easy database setup with Mongoose
- **Advanced Security Measures**:
  - 🔒 Helmet for setting various HTTP headers
  - 🌐 CORS support
  - 🚦 Rate limiting to prevent abuse
  - 🧹 Data sanitization against NoSQL injection and XSS
  - 🛑 Parameter pollution prevention
- **Environment Configuration**: dotenv for easy environment variable management
- **Logging**: Morgan for HTTP request logging
- **Error Handling**: Custom error handling middleware
- **API Routing**: Structured API routing setup
- **Development Tools**:
  - 🐛 Debug for better debugging experience
  - 🔄 Nodemon for auto-restarting the server (add to your devDependencies)

## 📋 Prerequisites

- Node.js (v14+ recommended)
- MongoDB

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/manju1807/node-ts-express-template.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   NODE_ENV=development
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## 🚦 API Routes

All routes are prefixed with `/api/v1`. Add your routes in `src/routes/index.ts`.

## 🛡️ Security

This boilerplate comes with several security measures:

-\* **Helmet**: Sets various HTTP headers

-\* **CORS**: Configures Cross-Origin Resource Sharing

-\* **Rate Limiting**: Limits repeated requests to public APIs

-\* **Data Sanitization**: Prevents NoSQL injections and XSS attacks

-\* **Parameter Pollution Prevention**: Prevents parameter pollution

## 🐛 Debugging

Use the `debug` package for debugging. Start your application with:

```bash
DEBUG=app:* npm start
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check issues page.

## 😎 Author

Manjunath R

## 📜 License

This project is MIT licensed.
