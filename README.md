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