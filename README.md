# Playwright + TypeScript Automation Framework

A comprehensive automation testing framework built with Playwright and TypeScript, featuring Page Object Model (POM), custom fixtures, environment-based configuration, and 20+ UI + API test examples.

## 🚀 Features

- **Page Object Model (POM)**: Well-structured page objects for maintainable tests
- **Custom Fixtures**: Reusable fixtures for common test utilities
- **Global Setup**: Automated authentication and storage state management
- **Environment Configuration**: Support for dev/qa/prod environments
- **20+ Test Examples**: Comprehensive UI and API test coverage
- **TypeScript**: Full type safety and IntelliSense support

## 📁 Project Structure

```
playwright-demo/
├── src/
│   ├── fixtures/
│   │   └── testFixtures.ts      # Custom fixtures
│   ├── pages/                    # Page Object Models
│   │   ├── BasePage.ts
│   │   ├── FormAuthenticationPage.ts
│   │   ├── CheckboxPage.ts
│   │   ├── DropdownPage.ts
│   │   ├── InputsPage.ts
│   │   ├── HoversPage.ts
│   │   ├── AlertsPage.ts
│   │   ├── TablesPage.ts
│   │   ├── FileUploadPage.ts
│   │   └── DragDropPage.ts
│   ├── utils/
│   │   ├── envLoader.ts          # Environment configuration loader
│   │   ├── testHelpers.ts        # Test utility functions
│   │   └── apiHelpers.ts         # API testing utilities
│   └── globalSetup.ts            # Global test setup
├── tests/
│   ├── e2e/                      # UI test examples (12+ tests)
│   │   ├── form-authentication.spec.ts
│   │   ├── checkboxes.spec.ts
│   │   ├── dropdown.spec.ts
│   │   ├── inputs.spec.ts
│   │   ├── hovers.spec.ts
│   │   ├── alerts.spec.ts
│   │   ├── dynamic-content.spec.ts
│   │   ├── tables.spec.ts
│   │   ├── drag-drop.spec.ts
│   │   ├── file-upload.spec.ts
│   │   └── navigation.spec.ts
│   └── api/                      # API test examples (20+ tests)
│       ├── users.spec.ts
│       ├── posts.spec.ts
│       ├── comments.spec.ts
│       ├── albums.spec.ts
│       └── todos.spec.ts
├── env/                          # Environment configuration
│   └── env.example.dev
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/srinidhi82/playwright-demo.git
   cd playwright-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## ⚙️ Configuration

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp env/env.example.dev env/.env.dev
   ```

2. Update the environment variables in `env/.env.dev`:
   ```
   BASE_URL=https://the-internet.herokuapp.com
   API_URL=https://jsonplaceholder.typicode.com
   USE_STORAGE_STATE=false
   TIMEOUT=30000
   HEADLESS=true
   ```

3. Create similar files for other environments:
   - `env/.env.qa`
   - `env/.env.prod`

## 🧪 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run all tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run only smoke tests
npm run test:smoke

# Run only regression tests
npm run test:regression
```

### UI Tests

```bash
# Run all UI tests
npm run test:ui

# Run smoke UI tests
npm run test:ui:smoke
```

### API Tests

```bash
# Run all API tests
npm run test:api

# Run smoke API tests
npm run test:api:smoke
```

### Environment-Specific

Set the environment before running tests:

```bash
# Development
ENV=dev npm test

# QA
ENV=qa npm test

# Production
ENV=prod npm test
```

### View Test Reports

```bash
npm run test:report
```

## 📝 Test Examples

### UI Tests (11 test suites, 45+ individual tests)

- **Form Authentication**: Login/logout flows, validation
- **Checkboxes**: Check/uncheck interactions
- **Dropdown**: Select option by value/label
- **Inputs**: Number input handling
- **Hovers**: Mouse hover interactions
- **Alerts**: JavaScript alert handling
- **Dynamic Content**: Content loading verification
- **Tables**: Table data extraction
- **Drag & Drop**: Drag and drop functionality
- **File Upload**: File upload testing
- **Navigation**: Page navigation and titles

### API Tests (5 test suites, 27+ individual tests)

- **Users API**: CRUD operations on users
- **Posts API**: Create, read, update, delete posts
- **Comments API**: Comment management
- **Albums API**: Album operations
- **Todos API**: Todo list management

## 🏗️ Page Object Model

All page objects extend the `BasePage` class and provide:
- Navigation methods
- Element interaction methods
- Utility methods for common actions

Example:
```typescript
import { FormAuthenticationPage } from '../../src/pages/FormAuthenticationPage';

test('Login test', async ({ page }) => {
  const formAuthPage = new FormAuthenticationPage(page);
  await formAuthPage.navigate();
  await formAuthPage.login('username', 'password');
});
```

## 🔧 Custom Fixtures

Use custom fixtures for cleaner test code:

```typescript
import { test, expect } from '../../src/fixtures/testFixtures';

test('Test with fixture', async ({ formAuthPage }) => {
  await formAuthPage.navigate();
  // formAuthPage is already initialized
});
```

## 🌍 Environment Configuration

The framework supports multiple environments with different configurations:

- **Base URLs**: Different URLs for dev/qa/prod
- **Timeouts**: Environment-specific timeout values
- **Storage State**: Enable/disable authentication state
- **API Keys**: Environment-specific API keys

## 📊 Test Tags

Tests are tagged for easy filtering:

- `@smoke`: Critical path tests
- `@regression`: Full regression suite

Run tagged tests:
```bash
npm run test:smoke      # Only smoke tests
npm run test:regression # Only regression tests
```

## 🔐 Global Setup & Storage State

The `globalSetup.ts` file handles:
- Pre-authentication before test runs
- Saving authentication state to `storage-state.json`
- Reusing authentication across tests

Enable storage state in your `.env` file:
```
USE_STORAGE_STATE=true
```

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

### Code Generation
```bash
npm run test:codegen
```

### Playwright Inspector
Add `await page.pause()` in your test to open the inspector.

## 📦 Dependencies

- `@playwright/test`: ^1.40.0
- `typescript`: ^5.3.3
- `ts-node`: ^10.9.2
- `@types/node`: ^20.10.0

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License

## 👤 Author

Srinidhi

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev/) - Powerful browser automation
- [The Internet](https://the-internet.herokuapp.com/) - Testing playground
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake REST API for testing
