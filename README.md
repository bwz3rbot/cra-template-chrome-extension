# Thanks for using cra-template-chrome-extension :)

Use this cra template to quick-start your Chrome Extension development with
React and MaterialUI.

---

# Commands:

```
> npm watch
```

Use this command to develop your extension. Webpack will watch the nececary
directories for any changes and automatically build the project with updated
files. Simply reload the extension via chrome://extensions to see the changes.

```
> npm build
```

This command builds a distribution suitable for installing on Chrome browser as
an extension.

```
> npm test
```

Only use this command to test your app in the browser. It will serve all the
files from the public directory.

---

# Notable files and folders

-   Manifest.json: `manifest.json`
-   Options Page: `src/Page/Options/index.js`
-   Popup Page `src/Page/Popup/index.js`
-   Background Script `src/Script/Background/index.js`
-   Content Script: `src/Script/Content/index.js`
-   Assets Directory: `public/assets`

---

# Import Aliases

Import aliases are pre-configured. Any imports can be conveniently referenced
within the code as such:

-   @ - `src/`
-   @PopupPage - `src/Page/Popup/`
-   @OptionsPage - `src/Page/Options/`
-   @BackgroundScript - `src/Script/Background/`
-   @ContentScript - `src/Script/Content/`
-   @Component - `src/Component/`
-   @Hook - `src/Hook/`
-   @Util - `src/Util/`
-   @Context - `src/Context/`

---
# Ready-to-use Contexts

-   StorageContext

    -   `useValueStore`

    -   A hook to interact with the chrome storage api.
    -   Use it in your code just like you would useState and the value persists between sessions.
    -   Takes in a storage key and a default value.
    -   Returns the value, a setter function, loading (true/false) and an error
        message if exists

```javascript
import { useStoredValue } from "@/Context/Storage";
export default function ConfigureView() {
	const [name, setName, { loading, error }] = useValueStore("name", null);
	let message = "What should I call you?";
	if (name) message = `Hello, ${name}!`;
	return (
		<Box>
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
						<IconButton onClick={() => setName(null)}>
							<ClearIcon />
						</IconButton>
					}
				/>
			</form>
		</Box>
	);
}
```
