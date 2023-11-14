import { createContext, useContext, useEffect, useState } from "react";
const Context = createContext({
	get: async key => {},
	set: async (key, value) => {},
});
export const useStorage = () => useContext(Context);
export const useStoredValue = (key, defaultValue = null) => {
	const { get, set } = useStorage();

	const [{ state, value: val }, setState] = useState({
		state: "loading",
		value: defaultValue,
	});

	useEffect(() => {
		get(key).then(({ error, value }) => {
			if (error) {
				console.error(error);
				setState({ state: "error", value: defaultValue });
			} else {
				setState({ state: "loaded", value: value || defaultValue });
			}
		});
	}, [key, get]);

	const setVal = async value => {
		await set(key, value);
		setState({ state: "loaded", value });
	};

	return [val, setVal, { state }];
};

const chromeStorage = {
	get: async key => {
		return new Promise((resolve, reject) => {
			chrome.storage.local.get(key, result => {
				if (chrome.runtime.lastError) {
					resolve({
						error: chrome.runtime.lastError,
						value: null,
					});
				} else {
					resolve({ value: result[key], error: null });
				}
			});
		});
	},
	set: async (key, value) => {
		return new Promise((resolve, reject) => {
			chrome.storage.local.set({ [key]: value }, () => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				} else {
					resolve();
				}
			});
		});
	},
};
const localStorage = {
	get: async key => {
		return new Promise((resolve, reject) => {
			try {
				resolve({
					value: JSON.parse(window.localStorage.getItem(key)),
					error: null,
				});
			} catch (error) {
				reject({ error, value: null });
			}
		});
	},
	set: async (key, value) => {
		return new Promise((resolve, reject) => {
			try {
				console.log("setting local storage", key, "to", value);
				window.localStorage.setItem(key, JSON.stringify(value));
				resolve();
			} catch (e) {
				reject(e);
			}
		});
	},
};
export default function StorageContext({ children }) {
	// is chrome storage available?

	let provider;
	if (typeof chrome !== "undefined" && chrome.storage) {
		provider = "chrome";
	} else {
		provider = "local";
	}

	return (
		<Context.Provider
			value={provider === "chrome" ? chromeStorage : localStorage}
		>
			{children}
		</Context.Provider>
	);
}
