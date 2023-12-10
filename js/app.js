let matrix = null;


const sleep = ms => new Promise(r => setTimeout(r, ms));

const render = () => {
    const container = document.getElementById('matrix-container')
    if (!matrix) {
        return
    }

    const n = matrix.length
    const m = n > 0 ? matrix[0].length : 0

    let rows = []
    for (let i = 0; i < n; ++i) {
        const cells = []
        for (let j = 0; j < m; ++j) {
            const cell = matrix[i][j]
            const {color, content} = cell
            cells.push(`<td id="cell-${i}-${j}" class="cell" style="background-color: ${color}">${content}</td>`)
        }
        let row = cells.join('\n')
        rows.push(`<tr>${row}</tr>`)
    }

    let table = rows.join('\n')
    container.innerHTML = `<table class="matrix">${table}</table>`
}

const applyEvent = (event) => {
    let setMatrix = event['SetMatrix'];
    if (setMatrix) {
        matrix = setMatrix
        render()
        return
    }

    let changeCell = event['ChangeColor'];
    if (changeCell) {
        const i = changeCell[0]
        const j = changeCell[1]
        const color = changeCell[2]
        const cell = document.getElementById(`cell-${i}-${j}`)
        cell.style.backgroundColor = color
        return
    }
}


(function () {
    new Promise(async () => {
        for (const event of events) {
            applyEvent(event)
            await sleep(1)
        }
    })
})();