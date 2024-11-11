### `CHANGELOG.md`

# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2024-11-11

### New Features

- Backspace Suggestion Support: The extension now shows setter name suggestions if the user deletes back to the comma and space ensuring suggestion appears even after corrections.

### Improvements

- Enhanced Regex Matching: Expanded regex pattern matching to account for various styles and spacing formats.
- Improved suggestion prompt by adding additional trigger characters

## [0.0.4] - 2024-11-10

### Updated

- Updated extension icon to 128 x 128.

## [0.0.3] - 2024-11-09

### Added

- Added extension icon.

## [0.0.2] - 2024-11-09

### Added

- Updated README with better usage demo.

## [0.0.1] - 2024-11-09

### Added

- Initial release of the extension.
- Added feature to suggest `useState` setter function (e.g., `setStateName`) after typing `const [stateName,` in `.js`, `.jsx`, `.ts`, and `.tsx` files.
- Added feature to convert selected text to `useState` hook with inferred type in JavaScript and TypeScript files.
- Added support for setting a custom state variable name.
