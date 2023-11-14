// send message to the background script
chrome.runtime.sendMessage(
	{ message: "hello from content script" },
	function (response) {
		console.log(response.message);
	}
);
