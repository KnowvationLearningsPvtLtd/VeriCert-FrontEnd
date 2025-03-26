<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
=======
Here's a clear and concise message you can send to your teammates:  

---

**Hey Team!** 👋  

Please follow these steps for making any code changes:  

1. **Pull the Latest Code:**  
   ```bash
   git pull origin main
   ```
2. **Create a New Branch for Your Task:**  
   ```bash
   git checkout -b feature/your-task-name
   ```
3. **Write Your Code:**  
   Make your changes on this branch.  

4. **Follow Commit Message Rules Using CommitLint:**  
   - **Commit Types:** Use one of the following types:  
     `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
   - **Commit Message Format:**  
     ```
     <type>: <Capitalized subject (max 72 chars)>
     ```
     Example:  
     ```
     Feat: Add user authentication module
     Fix: Resolve login issue on mobile devices
     ```
   - **Additional Rules:**  
     - Commit type **must be lowercase** (e.g., `feat`, `fix`).  
     - The subject **must start with a capital letter** and follow sentence case.  
     - Subject line length should not exceed **72 characters**.  
     - Ensure the subject is not empty.  

5. **Push Your Branch:**  
   ```bash
   git add .
   git commit -m "Your Commit Message"
   git push origin feature/your-task-name
   ```
  
6. **Create a Pull Request:**  
   - Go to the GitHub repository.  
   - Create a Pull Request (PR) from your branch to `main`.  
   - Ensure your changes are reviewed and approved.  

⚠️ **Important:**  
- Direct pushes to the `main` branch are restricted.  
- All changes must go through a PR.  

Let me know if you have any questions! 😊
>>>>>>> origin/main
