import * as vscode from "vscode";

export class useStateCompletionProvider
  implements vscode.CompletionItemProvider
{
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] | undefined {
    const linePrefix = document
      .lineAt(position)
      .text.substring(0, position.character);

    const match = linePrefix.match(/const\s*\[([a-zA-Z0-9_$]+),\s*$/);
    if (!match) {
      return undefined;
    }

    const stateName = match[1];
    const setterName = `set${
      stateName.charAt(0).toUpperCase() + stateName.slice(1)
    }`;

    const completionItem = new vscode.CompletionItem(
      setterName,
      vscode.CompletionItemKind.Variable
    );
    completionItem.detail = "useState setter function";
    completionItem.insertText = setterName;

    return [completionItem];
  }
}
