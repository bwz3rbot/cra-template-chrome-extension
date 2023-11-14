// listen for messages from the content script
chrome.runtime.onMessage.addListener(async function (
	request,
	sender,
	sendResponse
) {
	console.log("got message in background script", request);
	await sendResponse({
		message: "Sent response from background",
	});
});
