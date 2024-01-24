import { addFinishedDiscussion, addRepliedDiscussion, getAllFinishedDiscussion, getAllRepliedDiscussion } from './data/db.js'
import courses from './courses.json' assert {type: 'json'}

chrome.runtime.onMessage.addListener(message => {
    switch (message.type) {
        case 'REPLIED_DISCUSSION':
            addRepliedDiscussion(message.data)
            renderRefliedDiscussion()
            break
        case 'FINISHED_DISCUSSION':
            addFinishedDiscussion(message.data)
            renderFinishedDiscussion()
            break
        default:
            break
    }
})

document.addEventListener('DOMContentLoaded', () => {
    renderRefliedDiscussion()
    renderFinishedDiscussion()

    const activitiesButton = document.querySelector('#user-activities')
    activitiesButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true }, tabs => {
            const activeTabId = tabs[0].id
            chrome.tabs.sendMessage(activeTabId, { type: 'OPEN_USER_ACTIVITY' })
        })
    })
})

function renderRefliedDiscussion() {
    const discussions = getAllRepliedDiscussion()
    let discussionCount = 0

    const repliedCoursesElement = document.querySelector('#replied-discussion-courses')
    repliedCoursesElement.innerHTML = ''
    discussions.forEach(discussion => {
        const course = courses.find(course => course.id === discussion.courseId)
        repliedCoursesElement.innerHTML += `<p>${course.name} : ${discussion.discussions.length}</p>`
        discussionCount += discussion.discussions.length
    })

    const repliedCountElement = document.querySelector('#replied-discussion-count')
    repliedCountElement.innerHTML = discussionCount
}

function renderFinishedDiscussion() {
    const discussions = getAllFinishedDiscussion()
    let discussionCount = 0

    const finishedCoursesElement = document.querySelector('#finished-discussion-courses')
    finishedCoursesElement.innerHTML = ''
    discussions.forEach(discussion => {
        const course = courses.find(course => course.id === discussion.courseId)
        finishedCoursesElement.innerHTML += `<p>${course.name} : ${discussion.discussions.length}</p>`
        discussionCount += discussion.discussions.length
    })

    const repliedCountElement = document.querySelector('#finished-discussion-count')
    repliedCountElement.innerHTML = discussionCount
}
