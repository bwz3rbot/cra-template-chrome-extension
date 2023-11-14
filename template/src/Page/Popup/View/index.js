import { Box, Typography } from "@mui/material";

export default function View() {
	return (
		<Box
			sx={{
				width: "500px",
				height: "500px",
				border: "1px solid black",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<img src="/assets/logo192.png" alt="logo" />
			<Typography variant="h1">Popup View</Typography>
		</Box>
	);
}
