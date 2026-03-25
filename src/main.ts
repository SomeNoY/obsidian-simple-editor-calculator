import { Plugin, Editor, Notice } from "obsidian";
import { Parser } from "expr-eval";

export default class CalculatorPlugin extends Plugin {
	private calculate(
		editor: Editor,
		formatter: (expr: string, result: string) => string,
	) {
		const parser = new Parser();
		const selection = editor.getSelection();

		if (!selection) {
			new Notice("Select your expression");
		} else {
			try {
				const result = String(parser.evaluate(selection));
				editor.replaceSelection(formatter(selection, result));
			} catch {
				new Notice("Enter the correct expression");
			}
		}
	}
	async onload() {
		this.addCommand({
			id: "calculate",
			name: "Calculate",
			editorCallback: (editor) =>
				this.calculate(editor, (e, r) => `\`${e} = ${r}\``),
		});

		this.addCommand({
			id: "calculate-without-formatting",
			name: "Calculate without formatting",
			editorCallback: (editor) =>
				this.calculate(editor, (e, r) => `${e} = ${r}`),
		});

		this.addCommand({
			id: "calculate-with-replacement",
			name: "Calculate with replacement",
			editorCallback: (editor) => this.calculate(editor, (_, r) => r),
		});
	}
	async onunload() {}
}
