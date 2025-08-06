````markdown
# i18n-key-sync

A CLI tool to **sync and validate i18n translation keys** across multiple JSON locale files.  
It ensures that all locale files have the same keys, detects missing or extra keys, and optionally fixes discrepancies.

---

## ✨ Features

- ✅ Detects missing keys in translation files
- ✅ Detects extra/unexpected keys
- ✅ Optionally adds missing keys with indicators (e.g., `__MISSING__`)
- ✅ Works with any number of locale JSON files
- ✅ Provides a clear CLI output with summary
- ✅ Can be added as a **dev dependency** and used in CI pipelines

---

## 📦 Installation

```bash
npm install --save-dev i18n-key-sync
```
````

or with yarn:

```bash
yarn add -D i18n-key-sync
```

---

## 🚀 Usage

### Command

```bash
i18n-key-sync [options] <locales...>
```

### Options

| Option                     | Description                                            |
| -------------------------- | ------------------------------------------------------ |
| `-r, --reference <file>`   | Specify the reference locale file (default: `en.json`) |
| `-f, --fix`                | Automatically add missing keys with an indicator value |
| `-o, --output <directory>` | Output directory for fixed locale files                |
| `-h, --help`               | Show help                                              |
| `-v, --version`            | Show version                                           |

---

## 🛠 Example

Given the following files:

**`locales/en.json`**

```json
{
  "hello": "Hello",
  "bye": "Goodbye"
}
```

**`locales/de.json`**

```json
{
  "hello": "Hallo"
}
```

### ✅ Check for missing keys:

```bash
i18n-key-sync -r locales/en.json locales/*.json
```

**Output:**

```
[de.json] Missing key: bye
```

### ✅ Auto-fix missing keys:

```bash
i18n-key-sync -r locales/en.json locales/*.json --fix
```

**Result (`de.json`):**

```json
{
  "hello": "Hallo",
  "bye": "__MISSING__ Goodbye"
}
```

---

## 📂 Project Structure

```
src/
 ├─ cli/             # CLI entry
 │   └─ cli.ts
 ├─ core/            # Core logic
 │   └─ I18nFixer.ts
 └─ utils/           # File utilities
     └─ fileUtils.ts

tests/
 ├─ core/            # Core tests
 │   └─ I18nFixer.spec.ts
 └─ utils/
     └─ fileUtils.spec.ts
```

---

## 🔧 Adding as an NPM Script

You can add it to your `package.json`:

```json
{
  "scripts": {
    "i18n:check": "i18n-key-sync -r locales/en.json locales/*.json"
  }
}
```

Run:

```bash
npm run i18n:check
```

---

## 🧪 Running Tests

This project uses **Mocha** + **Chai** + **NYC** for 100% coverage.

```bash
npm test
```

---

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📄 License

MIT License © 2025 \[Fahad Mustjab]

---

## 💡 Roadmap

- [ ] Support nested JSON key detection
- [ ] Support YAML files
- [ ] Add interactive mode for fixing keys
- [ ] Provide VSCode extension for real-time i18n sync checks

---

🚀 **Maintained with ❤️ by [fahadmustjab](https://github.com/fahadmustjab)**

```

```
