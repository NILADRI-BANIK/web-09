import React from "react";

const TextArea = ({ value, setValue, readOnly, className }) => {
	return (
		<textarea
			defaultValue={value}
			onChange={(e) => setValue(e.target.value)}
			className={className}
			readOnly={readOnly}
			style={{
				resize: "none",
				background: "transparent",
				border: "none",
				outline: readOnly ? "none" : "",
				overflowY: "scroll",
				display: "block",
				strokeWidth: "none",
			}}></textarea>
	);
};

export default TextArea;
