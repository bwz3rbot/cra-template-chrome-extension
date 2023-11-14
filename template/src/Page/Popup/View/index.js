import { Box, Tabs, Tab } from "@mui/material";
import ViewBox from "@Component/Viewbox";

import HomeView from "@PopupPage/View/Home";
import ConfigureView from "@PopupPage/View/Configure";
import { useValueStore } from "@/Context/Storage";
export default function View() {
	const [onTab, setOnTab, { loading, error }] = useValueStore(
		"popup-on-view",
		"Home"
	);

	if (loading) return;
	return (
		<Box
			sx={{
				width: "500px",
				height: "500px",
				border: "1px solid black",
			}}
		>
			<Tabs
				variant="scrollable"
				defaultValue={onTab}
				value={onTab}
				onChange={(_, val) => setOnTab(val)}
			>
				<Tab label="Home" value="Home" />
				<Tab label="Configure" value="Configure" />
			</Tabs>
			<ViewBox>
				{onTab === "Home" && <HomeView />}
				{onTab === "Configure" && <ConfigureView />}
			</ViewBox>
		</Box>
	);
}
