import * as vscode from "vscode";
import { stateRegexPatterns } from "../utils/helper";

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

    let stateName;
    for (const regex of stateRegexPatterns) {
      const match = linePrefix.match(regex!);
      if (match) {
        stateName = match[1];
        break;
      }
    }
    if (!stateName) {
      return undefined;
    }

    const setterName = `set${
      stateName.charAt(0).toUpperCase() + stateName.slice(1)
    }`;

    const completionItem = new vscode.CompletionItem(
      setterName,
      vscode.CompletionItemKind.Variable
    );
    completionItem.detail = "useState setter function";
    completionItem.insertText = setterName;
    completionItem.documentation = new vscode.MarkdownString(
      `Automatically suggests the setter function for \`${stateName}\` defined with \`useState\`.`
    );

    return [completionItem];
  }

  handleBackspaceEvent(event: vscode.TextDocumentChangeEvent) {
    const editor = vscode.window.activeTextEditor;
    if (!editor || event.document !== editor.document) return;

    const change = event.contentChanges[0];
    if (!change) return;

    if (change.text === "") {
      const position = change.range.start;
      const linePrefix = editor.document
        .lineAt(position.line)
        .text.substring(0, position.character);

      let stateName;
      for (const regex of stateRegexPatterns) {
        const match = linePrefix.match(regex!);
        if (match) {
          stateName = match[1];
          break;
        }
      }

      if (stateName) {
        vscode.commands.executeCommand("editor.action.triggerSuggest");
      }
    }
  }
}
