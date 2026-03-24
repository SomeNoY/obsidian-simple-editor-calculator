/* eslint-disable @typescript-eslint/no-misused-promises */

import { Plugin, Editor, Notice } from "obsidian";
import { evaluate } from "mathjs";

export default class CalculatorPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "calculate",
			name: "Calculate",
			editorCallback: (editor: Editor) => {
				const selection = editor.getSelection();
				if (!selection) {
					new Notice("You need to select something");
					return;
				}

				try {
					editor.replaceSelection(
						`\`${selection} = ${evaluate(selection)}\``,
					);
				} catch {
					new Notice("Enter the correct expression");
				}
			},
		});

		this.addCommand({
			id: "calculate-without-formatting",
			name: "Calculate without formatting",
			editorCallback: (editor: Editor) => {
				const selection = editor.getSelection();
				if (!selection) {
					new Notice("You need to select something");
					return;
				}

				try {
					editor.replaceSelection(
						`${selection} = ${evaluate(selection)}`,
					);
				} catch {
					new Notice("Enter the correct expression");
				}
			},
		});
		this.addCommand({
			id: "calculate-with-replacement",
			name: "Calculate with replacement",
			editorCallback: (editor: Editor) => {
				const selection = editor.getSelection();
				if (!selection) {
					new Notice("You need to select something");
					return;
				}

				try {
					editor.replaceSelection(`${evaluate(selection)}`);
				} catch {
					new Notice("Enter the correct expression");
				}
			},
		});
	}
	async onunload() {}
}
