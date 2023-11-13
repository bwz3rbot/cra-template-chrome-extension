import { Box } from "@mui/material";
import Hello from "@/Component/Hello";
export default function App() {
	return (
		<Box
			sx={{
				width: "500px",
				height: "500px",
				border: "1px solid black",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Hello />
		</Box>
	);
}
