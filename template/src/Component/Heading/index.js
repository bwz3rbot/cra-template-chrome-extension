import { Typography } from "@mui/material";
export default function Heading({ text, children }) {
	return <Typography variant="h5">{text || children}</Typography>;
}
