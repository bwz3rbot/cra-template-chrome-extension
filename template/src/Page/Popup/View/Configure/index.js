import {
	Box,
	Typography,
	TextField,
	Button,
	OutlinedInput,
} from "@mui/material";
import Heading from "@Component/Heading";
import { useStoredValue } from "@/Context/Storage";
export default function ConfigureView() {
	const [name, set, { state }] = useStoredValue("name");
	let message;
	if (name) {
		message = `Hello, ${name}!`;
	} else {
		message = "What should I call you?";
	}
	return (
		<Box>
			<Heading text="Configure View" />

			<Typography>{message}</Typography>
			<form
				onSubmit={e => {
					e.preventDefault();
					set(e.target.name.value);
				}}
			>
				<OutlinedInput
					size="small"
					type="text"
					name="name"
					defaultValue={name}
					endAdornment={
						<Button
							variant="contained"
							onClick={() => {
								set(null);
							}}
						>
							clear
						</Button>
					}
				/>
			</form>
		</Box>
	);
}
