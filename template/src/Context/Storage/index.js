import { createContext, useContext, useEffect, useState } from "react";
const Context = createContext({
	get: async key => {},
	set: async (key, value) => {},
	clearStore: async () => {},
});
export const useStorage = () => useContext(Context);
export const useValueStore = (key, defaultValue = null) => {
	const { get, set } = useStorage();

	const [{ loading, error, value }, setState] = useState({
		loading: true,
		error: null,
		value: defaultValue,
	});

	useEffect(() => {
		get(key).then(({ error, value }) => {
			if (error) {
				console.error(error);
				setState({ loading: false, error, value: null });
			} else {
				setState({ loading: false, error: null, value });
			}
		});
	}, [key, get]);

	const setValue = async value => {
		await set(key, value);
		setState({ state: "ready", value });
	};

	return [value, setValue, { loading, error }];
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
	delete: async key => {
		return new Promise((resolve, reject) => {
			chrome.storage.local.remove(key, () => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				} else {
					resolve();
				}
			});
		});
	},
	clear: async () => {
		return new Promise((resolve, reject) => {
			chrome.storage.local.clear(() => {
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
	clear: async () => {
		return new Promise((resolve, reject) => {
			try {
				window.localStorage.clear();
				resolve();
			} catch (e) {
				reject(e);
			}
		});
	},
};
const isChromeAvailable = typeof chrome !== "undefined" && chrome.storage;
export default function StorageContext({ children }) {
	return (
		<Context.Provider
			value={isChromeAvailable ? chromeStorage : localStorage}
		>
			{children}
		</Context.Provider>
	);
}
