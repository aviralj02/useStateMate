import * as vscode from "vscode";
import { addUseStateCommand } from "./command/addUseStateCommand";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.addUseStateWithTypes",
    addUseStateCommand
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
