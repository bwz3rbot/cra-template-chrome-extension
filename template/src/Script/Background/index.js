// listen for messages from the content script
console.log("background script running");
chrome.runtime.onMessage.addListener(async function (
	request,
	sender,
	sendResponse,
	...other
) {
	if (request.type === "SIGN_CONNECT") return; // this is handled by the extension reload script
	console.log("got message in background script", {
		request,
		sender,
		sendResponse,
		other,
	});
	await sendResponse({
		message: "Sent response from background",
	});
});
