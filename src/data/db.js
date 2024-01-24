export function addRepliedDiscussion({ courseId, discussionId }) {
    const replied = JSON.parse(localStorage.getItem('replied')) ?? []
    const exist = replied.filter(course => course.courseId === courseId).length > 0
    if (exist) {
        replied.map(course => {
            if (course.courseId === courseId) {
                const exist = course.discussions.includes(discussionId)
                if (!exist) {
                    const newDiscussions = course.discussions
                    newDiscussions.push(discussionId)
                    return { courseId, discussions: newDiscussions }
                } else return course
            } else return course
        })
    } else {
        replied.push({ courseId, discussions: [discussionId] })
    }
    localStorage.setItem('replied', JSON.stringify(replied))
}

export function addFinishedDiscussion({ courseId, discussionId }) {
    const finished = JSON.parse(localStorage.getItem('finished')) ?? []
    const exist = finished.filter(course => course.courseId === courseId).length > 0
    if (exist) {
        finished.map(course => {
            if (course.courseId === courseId) {
                const exist = course.discussions.includes(discussionId)
                if (!exist) {
                    const newDiscussions = course.discussions
                    newDiscussions.push(discussionId)
                    return { courseId, discussions: newDiscussions }
                } else return course
            } else return course
        })
    } else {
        finished.push({ courseId, discussions: [discussionId] })
    }
    localStorage.setItem('finished', JSON.stringify(finished))
}

export function getAllRepliedDiscussion() {
    const discussions = JSON.parse(localStorage.getItem('replied')) ?? []
    return discussions
}

export function getAllFinishedDiscussion() {
    const discussions = JSON.parse(localStorage.getItem('finished')) ?? []
    return discussions
}
