# Expedia Clone

A full-stack travel booking application inspired by Expedia that allows users to search, compare, and book flights and hotels.

![Expedia Clone Screenshot](https://i.postimg.cc/QxksRNkQ/expedio-Logo.jpg)

## Features

- **User Authentication**: Register and login system with secure credential storage
- **Flight Search & Booking**: Search available flights with filtering options by price, airline, and duration
- **Hotel Search & Booking**: Browse hotels with filters for price, location, and amenities
- **Booking Management**: View and cancel bookings through user dashboard
- **Admin Panel**: Secure administrative interface to manage flights and hotels
- **Responsive Design**: Optimized for both desktop and mobile devices

## Tech Stack

- **Frontend**: React, Chakra UI
- **State Management**: Redux
- **Backend**: JSON Server (mock)
- **Authentication**: Firebase Authentication
- **Styling**: CSS, Chakra UI components

## Prerequisites

- Node.js (v14.0 or higher)
- npm (v6.0 or higher)

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Auhunwardsen/Project-1-Expedia-Class-3290.git
cd Project-1-Expedia-Class-3290
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up the JSON Server**

```bash
# Install JSON Server globally
npm install -g json-server

# Run JSON Server (in a separate terminal)
json-server --watch db.json --port 8080
```

4. **Start the development server**

```bash
npm start
```

5. **Access the application**

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing Guidelines

We welcome contributions to improve this project! Please follow these steps:

1. **Fork the repository** and create a new branch from `main`
2. **Make your changes**, ensuring code quality and consistency
3. **Test thoroughly** to ensure no functionality is broken
4. **Submit a pull request** with a clear description of your changes

### Code Style Guidelines

- Follow existing code formatting and naming conventions
- Comment complex code sections
- Write meaningful commit messages
- Update documentation for significant changes

### Issues & Feature Requests

Feel free to open issues for bugs or feature requests. Please include:

- Clear description of the bug or feature
- Steps to reproduce (for bugs)
- Any relevant screenshots or error messages

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from Expedia
- Icons provided by Chakra UI and React Icons
- All team members who contributed to the development
