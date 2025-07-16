import * as vscode from 'vscode';
import * as prettier from 'prettier';

// El tipo sigue siendo útil para que TypeScript nos ayude.
type PrettierPlugin = prettier.Plugin;

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('xml-fira-formatter.format', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No hay un editor de texto activo.');
			return;
		}

		try {

			const prettierPluginXmlModule = await import('@prettier/plugin-xml');
			const prettierPluginXml = (prettierPluginXmlModule.default || prettierPluginXmlModule) as PrettierPlugin;

			const prettierPluginHtmlModule = await import('prettier/parser-html');
			const prettierPluginHtml = (prettierPluginHtmlModule.default || prettierPluginHtmlModule) as PrettierPlugin;


			const document = editor.document;
			const originalText = document.getText();
			let processedText = originalText;

			// --- Paso 1: Formatear HTML dentro de CDATA ---
			const cdataRegex = /<!\[CDATA\[([\s\S]*?)\]\]>/g;
			const replacements = [];

			// Usamos un bucle `for...of` con `matchAll` que es más limpio.
			for (const match of originalText.matchAll(cdataRegex)) {
				const cdataContent = match[1]; // Contenido dentro del CDATA
				if (cdataContent.trim()) { // Solo formatear si no está vacío
					const formattedHtml = await prettier.format(cdataContent, {
						parser: 'html',
						plugins: [prettierPluginHtml], // Pasamos el plugin de HTML
						printWidth: 100,
					});
					replacements.push({
						from: match[0], // El bloque CDATA completo original
						to: `<![CDATA[\n${formattedHtml.trim()}\n]]>`
					});
				}
			}

			// Realizar los reemplazos
			for (const r of replacements) {
				processedText = processedText.replace(r.from, r.to);
			}

			// --- Paso 2: Formatear el documento XML completo ---
			const finalFormattedText = await prettier.format(processedText, {
				parser: 'xml',
				plugins: [prettierPluginXml], // Pasamos el plugin de XML
				xmlWhitespaceSensitivity: 'ignore',
			});

			// --- Paso 3: Reemplazar el texto en el editor ---
			const fullRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(originalText.length)
			);

			await editor.edit(editBuilder => {
				editBuilder.replace(fullRange, finalFormattedText);
			});

			vscode.window.showInformationMessage('Documento XML FIRA formateado con éxito.');

		} catch (error) {
			console.error('Error en el proceso de formateo:', error);
			const message = error instanceof Error ? error.message : String(error);
			vscode.window.showErrorMessage(`Ocurrió un error al formatear: ${message}`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }