import * as vscode from "vscode";
import { addUseStateCommand } from "./commands/addUseStateCommand";
import { useStateCompletionProvider } from "./completions/useStateCompletionProvider";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.addUseStateWithTypes",
    addUseStateCommand
  );
  context.subscriptions.push(disposable);

  const provider = vscode.languages.registerCompletionItemProvider(
    [
      { scheme: "file", language: "javascript" },
      { scheme: "file", language: "javascriptreact" },
      { scheme: "file", language: "typescript" },
      { scheme: "file", language: "typescriptreact" },
    ],
    new useStateCompletionProvider(),
    "[",
    ",",
    " "
  );
  context.subscriptions.push(provider);

  const completionProviderInstance = new useStateCompletionProvider();

  // For pressing backspaces
  vscode.workspace.onDidChangeTextDocument((event) => {
    completionProviderInstance.handleBackspaceEvent(event);
  });
}

export function deactivate() {}
