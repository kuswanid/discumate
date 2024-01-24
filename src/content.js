const courseId = location.pathname.split('/')[2]
const discussionId = location.pathname.split('/')[4]

// Creating Open Panel Button
const openPanelButton = document.createElement('button')
openPanelButton.setAttribute('class', 'open-panel-button')
openPanelButton.innerHTML = '<img src="https://i.ibb.co/yddWVyK/icon.png">'
openPanelButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'open-panel' })
})
document.body.append(openPanelButton)

// Reply Button
const replyButton = Array.from(document.querySelectorAll('.dcd-btn'))[1]
replyButton?.addEventListener('click', () => {
    chrome.runtime.sendMessage({
        type: 'REPLIED_DISCUSSION',
        data: { courseId, discussionId }
    })
})

// Finish Button
const finishButton = Array.from(document.querySelectorAll('.dropdown-item'))[11]
finishButton?.addEventListener('click', () => {
    chrome.runtime.sendMessage({
        type: 'FINISHED_DISCUSSION',
        data: { courseId, discussionId }
    })
})

chrome.runtime.onMessage.addListener(message => {
    switch (message.type) {
        case 'OPEN_USER_ACTIVITY':
            openUserActivityTab()
            break
        default:
            break
    }
})

function openUserActivityTab() {
    const userId = Array.from(document.querySelectorAll('.text-gray-700'))[0].getAttribute('href').split('/').slice(-1)[0]
    open(`https://www.dicoding.com/users/${userId}/activities/academies`)
}
