# Thanks for using cra-template-chrome-extension :)

Use this cra template to quick-start your Chrome Extension development with React and MaterialUI.

---
# Commands:

```
> npm watch
```

Use this command to develop your extension. Webpack will watch the
nececary directories for any changes and automatically build the project with updated
files. Simply reload the extension via chrome://extensions to see the changes.

```
> npm build
```

This command builds a distribution suitable for installing on Chrome browser as an extension.

```
> npm test
```
Only use this command to test your app in the browser. It will serve all the files from the public directory.

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
Import aliases are pre-configured. Any imports can be conveniently referenced within the code as such:

- @ - `src/`
- @PopupPage - `src/Page/Popup/`
- @OptionsPage - `src/Page/Options/`
- @BackgroundScript - `src/Script/Background/`
- @ContentScript - `src/Script/Content/`
- @Component - `src/Component/`
- @Hook - `src/Hook/`
- @Util - `src/Util/`
- @Context - `src/Context/`
