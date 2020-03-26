let timeout

function updateContent() {
    const keyClass = 'database-key'
    const valueClass = 'database-leaf-value'
    const wrapperElement = 'div.database-key-value'
    const firestoreKeys = `${wrapperElement} span.${keyClass}`
    const firestoreValues = `${wrapperElement} span.${valueClass}`
    const elements = document.querySelectorAll(`${firestoreKeys}, ${firestoreValues}`)
    const elementArray = [].slice.call(elements)

    let i = 0
    let groupedElements = []
    for (; i < elementArray.length - 1; i++) {
        // Sometimes values can be hidden / minimized
        // We need to check not only if this element is a key,
        // but also that the next element is not a minimized key
        // It needs to be a key followed by a value
        if (elementArray[i].classList.contains(keyClass) &&
            elementArray[i + 1].classList.contains(valueClass)) {
            groupedElements.push([elementArray[i], elementArray[i + 1]])
            i++
        }
    }

    const filteredElements = groupedElements.filter(pair => pair[0].textContent.endsWith('Millis'))
    filteredElements
        .map(pair => pair[1])
        .map(element => {
            console.log(`Updating the following content: ${element.textContent}`)
            if (element.textContent.match(/^[0-9]+$/)) {
                const date = new Date(Number.parseInt(element.textContent))
                element.textContent = date.toISOString()
            }
        })
}

updateContent()

document.addEventListener('DOMNodeInserted', function () {
    if (timeout) {
        clearTimeout(timeout)
    }
    clearTimeout(timeout)
    timeout = setTimeout(updateContent, 1000)
}, false)