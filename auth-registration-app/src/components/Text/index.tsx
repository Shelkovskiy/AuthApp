import React from "react";
import styled from "styled-components";

interface IText {
	width?: string;
	margin?: string;
	padding?: string;
	color?: string;
	fontWeigth?: string;
	fontSize?: string;
}

const Text = styled.div<IText>`
	margin: ${(p) => p.margin};
	padding: ${(p) => p.padding}px;
	font-size: ${(p) => p.fontSize || "28px"};
	color: ${(p) => p.color};
	width: ${(p) => p.width}px;
	font-weight: ${(p) => p.fontWeigth};
`;

export default React.memo(Text);
