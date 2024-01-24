chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'open-panel') {
        chrome.sidePanel.open({ tabId: sender.tab.id })
        chrome.sidePanel.setOptions({
            tabId: sender.tab.id,
            path: 'src/sidepanel.html',
            enabled: true
        })
    }
})
