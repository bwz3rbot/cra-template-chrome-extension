import { Box } from "@mui/material";
export default function ViewBox({ children }) {
	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				// padding: "10px",
				border: "1px solid green",
			}}
		>
			{children}
		</Box>
	);
}
