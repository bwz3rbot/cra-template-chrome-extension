# Thanks for using cra-template-chrome-extension :)

<div align="center">
<div>
    <img width="auto" height="200" src="https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg"> 
      <img width="auto" height="200" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png">
</div>
  <br>

[![npm version](https://img.shields.io/npm/v/https://img.shields.io/npm/v/@bingobangobotto/cra-template-chrome-extension)](https://www.npmjs.com/package/@bingobangobotto/cra-template-chrome-extension)
[![Node.js CI](https://github.com/bwz3rbot/cra-template-chrome-extension/actions/workflows/node.js.yml/badge.svg)](https://github.com/bwz3rbot/cra-template-chrome-extension/actions/workflows/node.js.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/bwz3rbot/cra-template-chrome-extension/badge.svg)](https://snyk.io/test/github/bwz3rbot/cra-template-chrome-extension/)
[![NPM Downloads](https://img.shields.io/npm/dt/@bingobangobotto/cra-template-chrome-extension.svg)](https://www.npmjs.com/package/@bingobangobotto/cra-template-chrome-extension)

</div>
<!-- prettier-ignore -->
Use this cra template to quick-start your Chrome Extension development with React and MaterialUI.

---

# Getting Started

Run this command to quickstart the project from your terminal.

```
> npx create-react-app my-chrome-extension --template @bingobangobotto/cra-template-chrome-extension
```

---

# Commands:

<!-- prettier-ignore -->
Use this command to develop your extension. Webpack will watch the nececary directories for any changes and automatically build the project with updated files.

<!-- prettier-ignore -->
webpack-ext-reloader is installed and configured to automatically refresh the extension on changes - no need to manually reload from chrome://extensions

```
> npm watch
```

This command builds a production distributable ready to install in Chrome.

```
> npm build
```

<!-- prettier-ignore -->
Only use this command to test your app in the browser. It will serve all the files from the public directory.

```
> npm test
```

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

<!-- prettier-ignore -->
Import aliases are pre-configured. Any imports can be conveniently referenced within the code as such:

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

# Ready-to-use Hooks And Contexts

-   StorageContext

    -   `useValueStore`

    -   A hook to interact with the chrome storage api.
    -   Use it in your code just like you would useState and the value persists
        between sessions.
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
