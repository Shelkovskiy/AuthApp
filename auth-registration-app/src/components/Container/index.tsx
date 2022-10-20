import React from "react";
import styled from "styled-components";

interface ICustomComponentsContainer {
	maxWidth?: string;
	display?: string;
	margin?: string;
	padding?: string;
	justifyContent?: string;
	alignItems?: string;
	width?: string;
	fontSize?: string;
	color?: string;
	background?: string;
	borderRadius?: string;
}

interface IComponentsContainer extends ICustomComponentsContainer {
	children?: React.ReactNode;
}

const CustomComponentsContainer = styled.div<ICustomComponentsContainer>`
	border-radius: ${(props) => props.borderRadius || "0px"};
	background: ${(props) => props.background || "none"};
	font-size: ${(props) => props.fontSize || "16px"};
	color: ${(props) => props.color || "black"};
	width: ${(props) => props.width || "100%"};
	max-width: ${(props) => props.maxWidth || "100%"};
	display: ${(props) => props.display || "block"};
	margin: ${(props) => props.margin || "0"};
	padding: ${(props) => props.padding || 0};
	justify-content: ${(props) => props.justifyContent || "space-between"};
	flex-direction: row;
	align-items: ${(props) => props.alignItems || "center"};
`;

const ComponentsContainer = ({
	margin,
	display,
	maxWidth,
	padding,
	children,
	justifyContent,
	alignItems,
	width,
	color,
	fontSize,
	background,
	borderRadius,
}: IComponentsContainer) => {
	return (
		<CustomComponentsContainer
			color={color}
			margin={margin}
			padding={padding}
			maxWidth={maxWidth}
			display={display}
			justifyContent={justifyContent}
			alignItems={alignItems}
			width={width}
			fontSize={fontSize}
			background={background}
			borderRadius={borderRadius}
		>
			{children}
		</CustomComponentsContainer>
	);
};

export default ComponentsContainer;
