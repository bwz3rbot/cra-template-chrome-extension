import { IconButton, Box, Button, OutlinedInput } from "@mui/material";
import Heading from "@Component/Heading";
import { useValueStore } from "@/Context/Storage";
import ClearIcon from "@mui/icons-material/Clear";
export default function ConfigureView() {
	const [name, setName, { state, error }] = useValueStore("name");
	let message = "What should I call you?";
	if (name) message = `Hello, ${name}!`;
	return (
		<Box>
			<Heading text={message} />
			<form
				onSubmit={e => {
					e.preventDefault();
					setName(e.target.name.value);
				}}
			>
				<OutlinedInput
					size="small"
					type="text"
					name="name"
					defaultValue={name}
					endAdornment={
						<IconButton onClick={() => setName(null)}>
							<ClearIcon />
						</IconButton>
					}
				/>
			</form>
		</Box>
	);
}
