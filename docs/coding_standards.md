# Portfolio Coding Standards & Best Practices

## Project Structure

### Core Organization

```
src/
├── app/             # App Router pages and layouts
├── components/      # Reusable UI components
│   ├── ui/          # Basic UI elements
│   ├── forms/       # Form-related components
│   └── layouts/     # Layout components
├── lib/             # Third-party library configurations
├── utils/           # Utility functions
├── hooks/           # Custom React hooks
├── context/         # React context providers
├── services/        # API and external service integrations
├── types/           # TypeScript type definitions
└── styles/          # Global styles and themes
public/              # Static assets
```

### Best Practices

- Keep the directory structure flat where possible - avoid nesting beyond 3 levels[2]
- Create index files to export multiple components from a directory[2]
- Co-locate related files (tests, styles, types) with their components[2]
- Use the `src` directory to separate application code from configuration files[1]

## Modular Code Design

### Core Principles

- **Single Responsibility Principle (SRP)**: Each module should do one thing and do it well[11]
- **High Cohesion**: Keep related functionality together within a module[11]
- **Low Coupling**: Minimize dependencies between modules[11]
- **DRY (Don't Repeat Yourself)**: Eliminate code duplication through abstraction[7]

### Implementation Guidelines

- Design small, focused components that handle specific tasks[11]
- Abstract common logic into custom hooks and utility functions[7]
- Create clear boundaries between modules through well-defined interfaces[11]
- Limit component files to 250-300 lines maximum; split larger components[9]
- Use consistent naming conventions for all modules and components[11]

### Benefits of Modularity

- **Improved Maintainability**: Isolated changes reduce the risk of unintended side effects[10]
- **Enhanced Collaboration**: Teams can work on different modules simultaneously[13]
- **Easier Debugging**: Issues can be isolated to specific modules[13]
- **Better Reusability**: Well-designed modules can be reused across projects[6][12]
- **Simplified Testing**: Smaller, focused modules are easier to test thoroughly[10]

## Styling Standards

### Tailwind CSS Implementation

- Use Tailwind for consistent and maintainable styling
- Organize custom themes in a central configuration
- Create component-specific styles using composition pattern
- Extract common pattern combinations into reusable classes

### CSS Modules (Alternative)

- Use CSS Modules for component-specific styling when needed
- Follow BEM naming convention for legacy CSS
- Implement responsive designs using mobile-first approach

## TypeScript Standards

### Type Definitions

- Create dedicated types directory for shared interfaces and types
- Always specify return types for functions
- Use precise types instead of `any` or `unknown` when possible
- Leverage TypeScript utility types (Pick, Omit, Partial) for type manipulation

### Type Enforcement

```typescript
// Prefer this
function getUserData(id: string): Promise {
  // ...
}

// Instead of this
function getUserData(id): any {
  // ...
}
```

## Logging Standards

### Configuration

- Configure logging levels appropriately for each environment[3]
- Set up centralized logging to capture both client and server-side events[3]
- Implement structured logging using JSON format for better analysis[3]

### Implementation

```typescript
// Configure logging in next.config.js
module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

// Using logger in components
import log from 'next/log';

function DataFetcher() {
  useEffect(() => {
    log.info('Fetching data started', { component: 'DataFetcher' });
    try {
      // fetch logic
      log.info('Data fetched successfully', { dataSize: data.length });
    } catch (error) {
      log.error('Failed to fetch data', {
        error: error.message,
        component: 'DataFetcher',
      });
    }
  }, []);
}
```

### Best Practices

- **Environment-Specific Logging**: Use verbose logging in development, minimal in production[3]
- **Sanitize Sensitive Data**: Never log passwords, tokens, or personal information[3]
- **Correlation IDs**: Include unique identifiers to trace requests across systems[3]
- **Structured Format**: Use consistent structure for logs to enable filtering and analysis[3]
- **Performance Monitoring**: Include timing information for critical operations[3]

## ESLint and Formatting

### ESLint Configuration

Create `.eslintrc.json` with the following configuration[4]:

```json
{
  "extends": [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  "plugins": [
    "@typescript-eslint",
    "import",
    "unused-imports",
    "tailwindcss",
    "simple-import-sort"
  ],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowExpressions": true
      }
    ],
    "@typescript-eslint/consistent-type-imports": "error",
    "tailwindcss/no-custom-classname": "warn"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}
```

### Prettier Configuration

Create `.prettierrc` file:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true
}
```

### VS Code Integration

Create `.vscode/settings.json` for team consistency[4]:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript", "typescript", "javascriptreact", "typescriptreact"]
}
```

## Performance Optimization

### Code Splitting

- Use dynamic imports with `next/dynamic` for lazy loading components[9]
- Implement route-based code splitting to minimize initial load time[9]
- Optimize large dependencies by importing only what's needed[9]

### Image Optimization

- Always use Next.js `Image` component with appropriate sizing[9]
- Implement lazy loading for below-the-fold images[9]
- Use proper image formats (WebP, AVIF) with fallbacks[9]

### Render Optimization

- Implement proper memoization with `useMemo` and `useCallback`
- Use the React DevTools Profiler to identify and fix render bottlenecks
- Implement virtualization for long lists using `react-window` or `react-virtualized`

## Error Handling

### Client-Side Errors

- Implement global error boundaries to catch and report React rendering errors
- Use try/catch blocks for async operations with appropriate error logging
- Create user-friendly error messages for common failure scenarios

### API Error Handling

- Implement consistent error response format across all API endpoints
- Use HTTP status codes appropriately
- Include enough detail for debugging without exposing sensitive information

## Security Best Practices

### Data Protection

- Never store sensitive data in localStorage or client-side state
- Sanitize all user inputs to prevent XSS attacks
- Use environment variables for API keys and sensitive configuration

### Authentication

- Implement proper token handling and refresh mechanisms
- Use HTTP-only cookies for sensitive authentication data
- Apply proper CORS policies on API routes

## Testing Standards

### Component Testing

- Test components in isolation using React Testing Library
- Focus on testing behavior rather than implementation details
- Use mock service worker (MSW) for API mocking

### End-to-End Testing

- Implement Cypress or Playwright for critical user journeys
- Create stable selectors using data attributes
- Run E2E tests in CI/CD pipeline before deployment

## Git Workflow

### Commit Conventions

- Use conventional commits format: `type(scope): message`
- Keep commits small and focused on a single change
- Write descriptive commit messages explaining why, not just what

### Branch Strategy

- Use feature branches for all new work
- Require pull requests and code reviews before merging
- Set up branch protection for the main branch

## Documentation

### Code Documentation

- Document complex logic and non-obvious behavior
- Use JSDoc comments for functions and components
- Create README.md files for major directories explaining their purpose

### Component Documentation

- Use a tool like Storybook to document and showcase components
- Include usage examples and prop documentation
- Document accessibility considerations for UI components

By implementing these comprehensive coding standards, your Next.js project will benefit from improved maintainability, better collaboration among team members, and higher overall code quality. The modular approach will particularly help in managing complexity as the project grows.
