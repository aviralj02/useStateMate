# VSCode Extension Quickstart Guide

## Project Overview

This extension enhances JavaScript and TypeScript development by allowing developers to:

- Automatically convert selected text to a `useState` hook with an inferred type.
- Provide a suggestion for the setter function of `useState` when defining a new state variable.

This guide will walk you through the setup, activation, and usage of this extension.

## Features

1. **Suggested Setter Function**

   - When typing `const [stateVariable, `, the extension will suggest the `setStateVariable` function for use in your code.

2. **Convert Selection to `useState` Hook**

   - Select any text, right-click, and choose "Add useState With Types."
   - A prompt will appear for naming the state variable, then the extension will insert the corresponding `useState` hook.

## Setup

1. **Clone the repository** and open it in Visual Studio Code.
2. **Install dependencies** by running:

```bash
$ yarn install
```

3. Start the extension by pressing `F5` to launch a new VSCode window with the extension loaded.

## File Overview

- `extension.ts`: Registers commands and completion provider for this extension.
- `addUseStateCommand.ts`: Defines the command for converting selected text to a useState hook.
- `useStateCompletionProvider.ts`: Handles suggestions for the setter function.
- `helper.ts`: Contains utilities functions.
