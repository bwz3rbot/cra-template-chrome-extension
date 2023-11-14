// send message to the background script

(async () => {
	const res = await chrome.runtime.sendMessage({
		message: "Sent message from content script",
	});

	console.log("got response from background script", res);
})();
