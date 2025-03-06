# Travel Planner

A modern React application for planning travels built with Vite.

## Tech Stack

- React 19
- Vite 6
- Material UI v6
- React Router DOM v7

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## Setup Instructions

1. Clone the repository

```bash
git clone <your-repo-url>
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Starts development server with hot reload
- `npm run build` - Creates production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Dependencies

### Core

- `react` - Frontend UI library
- `react-dom` - React rendering for web
- `react-router-dom` - Routing and navigation

### UI Components

- `@mui/material` - Material UI components
- `@mui/icons-material` - Material UI icons
- `@emotion/react` & `@emotion/styled` - Styling solution

### Data Fetching

- `axios` - HTTP client
- `query-string` - URL query string parsing

### Development Tools

- `vite` - Build tool and dev server
- `eslint` - Code linting
- `prettier` - Code formatting
- TypeScript types for development

## Project Structure

```
travel-planner/
├── src/
├── public/
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## ESLint Configuration

The project enforces code quality through ESLint with:

- React recommended rules for consistent React patterns
- Browser globals enabled for DOM API access
- JavaScript recommended settings for best practices
- Support for modern ES modules
- Integration with Vite for real-time linting feedback

## Expanding the ESLint configuration

- If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Contributing

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Follow the coding standards:

   - Use meaningful component and variable names
   - Write comments for complex logic
   - Follow React best practices
   - Ensure ESLint rules pass
   - Add proper TypeScript types where applicable

4. Commit your changes

```bash
git commit -m 'Add some amazing feature'
```

5. Push to the branch

```bash
git push origin feature/amazing-feature
```

6. Open a Pull Request

### Development Guidelines

- Keep components small and focused
- Use Material UI components for consistent UI
- Follow React hooks best practices
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation when needed

### Bug Reports

- Use the issue tracker
- Describe the bug in detail
- Include steps to reproduce
- Add screenshots if applicable
- Mention your environment details

## License

© 2025 Travel Planner Team. All rights reserved.

This is a private project. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without explicit permission from the project owners.
