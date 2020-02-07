const green = 'rgba(118,174, 170, 1)'
const black = 'rgba(23,35, 50, 1)'
const brown = 'rgba(205,164, 133, 1)'
const greenblue = 'rgba(62,171, 201, 1)'
const pink = 'rgba(254,156, 161, 1)'
const blue = 'rgba(98,189, 254, 1)'

const data = [
    {
        topic: 'Food',
        title: 'Wake Up and Smell the Coffee',
        price: '$0.90',
        color: green
    },
    {
        topic: 'Architecture',
        title: 'The Brand New NASA Office',
        price: '$0.19',
        color: black
    },
    {
        topic: 'Travel',
        title: 'Experience the Saharan Sands',
        price: '$2.29',
        color: brown
    },
    {
        topic: 'Interior',
        title: '9 Air-Cleaning Plants Your Home Needs',
        price: '$0.09',
        color: greenblue
    },
    {
        topic: 'Food',
        title: 'One Month Sugar Detox',
        price: '$0.99',
        color: pink
    },
    {
        topic: 'Photography',
        title: 'Shooting Minimal Instagram Photos',
        price: '$0.29',
        color: blue
    }
]

// Instructions
// Take the data above and display it as tiles on the page

function writeToPage(data) {
    const container = document.querySelector('#content')

    const card = document.createElement('div')
    card.className = 'card-container'
    card.style = `background:${data.color}`

    const subject = document.createElement('h3')
    subject.textContent = `${data.topic}`

    const content = document.createElement('p')
    content.textContent = `${data.title}`

    const buttonContent = document.createElement('a')
    buttonContent.textContent = `Read for ${data.price}`

    card.appendChild(subject)
    card.appendChild(content)
    card.appendChild(buttonContent)

    container.appendChild(card)
}


function readData(data) {
    for (article of data) {
        writeToPage(article)
    }
}

readData(data)