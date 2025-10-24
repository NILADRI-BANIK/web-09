import { useCallback } from "react";
import sanitizeHtml from "sanitize-html";
function CreateSanitizeCallback(setItem) {
	const sanitizeConf = {
		allowedTags: ["b", "i", "a", "p"],
		allowedAttributes: { a: ["href"] },
	};

	return useCallback(
		(evt) => {
			setItem(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf));
		},
		[setItem]
	);
}

function ContentEditableDiv({ style, contentEditable, text, onChange ,className}) {
	return (
		<div className={className} style={style} contentEditable={contentEditable} onBlur={onChange}>
			{text}
		</div>
	);
}

export { ContentEditableDiv, CreateSanitizeCallback };
