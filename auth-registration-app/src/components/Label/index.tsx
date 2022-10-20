import React from "react";

interface iLabelProps {
	children?: React.ReactNode;
	htmlFor?: string;
	className?: string;
}

const Label = ({ children, htmlFor, className }: iLabelProps) => {
	return (
		<label className={className} htmlFor={htmlFor}>
			{children}
		</label>
	);
};

export default React.memo(Label);
