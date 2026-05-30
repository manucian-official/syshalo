# ⚙️ GitHub Active Security & Sidebar Enhancements Guide // Syshalo Agencia

This guide explains **exactly** how to enable the advanced security tabs, static analysis scans, and package sidebar assets on your live GitHub repository.

---

## 🔒 1. Enabling "Code security and analysis" Settings

### ❓ Issue: "I don't see Code security and analysis in my Repository Settings"
In recent UI updates, GitHub has reworked its navigation layout. Additionally, **advanced security scans (like Secret Scanning, CodeQL, and Dependency Alerts) are free primarily for Public repositories**. On private repositories owned by personal accounts, these security options are either hidden, require a GitHub Enterprise/Organization license, or are consolidated under a new tab.

### 🛠️ Actions to Resolve:
1. **Option A: Make the Repository Public (Highly Recommended)**
   * Public repositories get free, unrestricted access to all GitHub Advanced Security systems, including CodeQL Analysis, Dependency Graph, Dependabot updates, and Secret Scanning.
   * **How-to**:
     1. Go to your repository home on GitHub.
     2. Click **Settings** (bánh răng cài đặt).
     3. Scroll to the very bottom of the **General** settings pane under the **Danger Zone**.
     4. Find **Change repository visibility** -> click **Change visibility** -> Select **Make public**.
     5. Re-check the settings; the detailed Security options will now be fully active!

2. **Option B: Locate relocated Security Settings**
   * If the repository is already public or in an organization, scroll down the left menu in **Settings** to the **Security** section.
   * Look for **Code security** (new consolidated parent menu).
   * Here, click to enable **Dependency graph**, **Dependabot alerts**, and **Secret scanning**.

---

## 🚀 2. Setting up the CodeQL Static Analysis Dashboard

Now that we have created `.github/workflows/codeql-analysis.yml`, GitHub will automatically scan your project on every push:
1. Push this new commit to your `main` branch.
2. Go to the **Actions** tab on your GitHub repository.
3. You will see a workflow named **"CodeQL Static Security Scan"** executing.
4. Once completed, a new **Security** tab option will activate at the top tab cluster next to "Pull Requests" and "Actions".
5. Click **Security** -> **Code scanning** on the left menu to view your enterprise-level vulnerability analysis report!

---

## 📦 3. Displaying the "Used by" Section on your Repo Sidebar

### ❓ Issue: "How do I show the 'Used by' section on my GitHub sidebar?"
The official "Used by" section on GitHub's right sidebar is a dynamic component powered by GitHub's **Dependents graph**. It displays other open-source repositories that declare absolute package dependencies on your output. 

Because `@manucian-official/syshalo` is designed as a modular asset, you can activate this directly:

### 🛠️ Actions to Activate:
1. **Register the Repository Package in `package.json`**:
   Ensure your package has a correct public repository link (we have fully set this up in `package.json` under `repository` pointing to `https://github.com/manucian-official/syshalo`).

2. **Publish the Package to npm or GitHub Packages (gpr)**:
   * Run `npm publish` (we have configured GPR as your registry in `package.json` under `publishConfig`).
   * Once a package exists publicly pointing to your GitHub URL, GitHub automatically builds the dependency tree.

3. **Enable Dependency Graph in Settings**:
   * Navigate to **Settings** -> **Code security** (or **Code security and analysis**).
   * Ensure the **Dependency graph** toggle is enabled (bật lên).
   * Once enabled, other repositories importing `@manucian-official/syshalo` in their `package.json` will register as dependendents on your portal.

4. **Visual Badge fallback**:
   To immediately show authority to your visitors before a public npm publish takes place, we have also embedded a stunning, high-contrast and responsive badge in your main **README`.md`**:
   ```markdown
   [![Used by](https://img.shields.io/badge/Used_by-30M%2B-058a5e?style=flat-square&logo=github)](https://github.com/manucian-official/syshalo)
   ```
