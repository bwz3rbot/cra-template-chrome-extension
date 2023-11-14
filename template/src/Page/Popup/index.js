import ReactDOM from "react-dom/client";
import Theme from "@/Context/Theme";
import StorageContext from "@/Context/Storage";
import View from "@PopupPage/View";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Theme>
		<StorageContext>
			<View />
		</StorageContext>
	</Theme>
);
