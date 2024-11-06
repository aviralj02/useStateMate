import * as vscode from "vscode";
import { inferType } from "../utils/helper";

async function insertUseStateWithTypes(
  editor: vscode.TextEditor,
  initialValue: string,
  type: string
) {
  const stateVarName = await vscode.window.showInputBox({
    prompt: "Enter a name for your state variable",
    placeHolder: "e.g., count, user, isVisible",
  });

  if (!stateVarName) {
    vscode.window.showErrorMessage("State variable name is required.");
    return;
  }

  const useStateSnippet = `const [${stateVarName}, set${
    stateVarName.charAt(0).toUpperCase() + stateVarName.slice(1)
  }] = useState<${type}>(${initialValue});`;

  editor
    .edit((editBuilder) => {
      editBuilder.replace(editor.selection, useStateSnippet);
    })
    .then((success) => {
      if (!success) {
        vscode.window.showErrorMessage("Failed to insert useState snippet");
      }
    });
}

export function addUseStateCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No active editor found");
    return;
  }

  const selection = editor.selection;
  if (selection.isEmpty) {
    vscode.window.showErrorMessage("Please select text to infer useState type");
    return;
  }

  const initialText = editor.document.getText(selection).trim();
  if (!initialText) {
    vscode.window.showErrorMessage(
      "Selected text is empty. Please select a valid initial value."
    );
    return;
  }

  const inferredType = inferType(initialText);
  if (!inferredType) {
    vscode.window.showErrorMessage("Could not infer type for useState");
    return;
  }

  insertUseStateWithTypes(editor, initialText, inferredType);
}
