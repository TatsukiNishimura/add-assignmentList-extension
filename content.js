import {
    assignmentDeadline, calendarDataLimit, classListApiUrl,
    dateCompareText, formatDateForShow, getAssignmentUrl,
    getClassUrl, jsInitCheckMilliSecond, semester, url,
    yearOfClassId
} from "./constants.js";



const origin_date = new Date()
const today = new Date(origin_date.getFullYear(), origin_date.getMonth(), origin_date.getDate(), 23, 59)
const tomorrow = new Date(origin_date.getFullYear(), origin_date.getMonth(), origin_date.getDate() + 1, 23, 59)



window.addEventListener("load", main, false);

function main(e) {
    const jsInitCheckTimer = setInterval(jsLoaded, jsInitCheckMilliSecond);
    async function jsLoaded() {
        if (document.getElementsByClassName("module-container") != null) {
            // CLEの先頭ページの新着情報、サポートセンターなどの欄
            const body = document.getElementsByClassName("module-section")
            makeAssignmentList(body[0])
            makeClassList(body[0])
            clearInterval(jsInitCheckTimer);
        }
    }
}

async function makeClassList(target) {
    const res = await fetch(classListApiUrl, { method: "GET", mode: "cors" })
    const data = await res.json()
    const results = data["results"]
    let classList = []
    results.forEach(data => {
        const name = data["name"]
        // 2022-xxxxxxxxxx-Aか2022-xxxxxxxxx-Bなど、講義名の先頭の文字列を読み取る
        const classId = name.substr(0, name.indexOf(':'))
        const className = name.substr(name.indexOf(':') + 1)
        // classidの先頭の年号を読み取る
        const headerOfClassId = classId.substr(0, classId.indexOf('-'))
        if (headerOfClassId) {
            // 先頭の年号が2022かどうか
            if (headerOfClassId == yearOfClassId) {
                // classIdの末尾がAかBか
                if (classId.slice(-1) == semester.LATE) {
                    classList.push({ "name": className, "id": data["id"] })
                }
            }
        }
    })
    console.log(classList)
    getClassListTable(classList, target)
    const title = document.createElement("h3")
    title.textContent = "授業一覧"
    target.prepend(title)
}

function getClassListTable(data, target) {
    const div = document.createElement("div")
    const table = document.createElement("table")
    table.setAttribute("border", 2)
    table.setAttribute("style", "table-layout: fixed;width: 80%;")
    const header = document.createElement("tr")
    const header_cell = document.createElement("th")
    header_cell.appendChild(document.createTextNode("課題一覧"))
    header.appendChild(header_cell)
    table.appendChild(header)
    data.forEach(elem => {
        const row = document.createElement("tr")
        const cell = document.createElement("td")
        const link = document.createElement("a")
        const classUrl = getClassUrl(elem["id"])
        link.setAttribute("href", classUrl)
        link.setAttribute("target", "_blank")
        const cellText = document.createTextNode(elem["name"])
        link.appendChild(cellText)
        cell.appendChild(link)
        row.appendChild(cell)
        table.appendChild(row)
    })
    div.appendChild(table)
    target.prepend(div)
}


async function makeAssignmentList(target) {
    // date_compateは"lessOrEqual"か"greaterOrEqual"
    const params = {
        date: origin_date.toJSON(), date_compare: dateCompareText.GREATER_OR_EQUAL,
        includeCount: true, limit: calendarDataLimit, offset: 0
    }
    const query = new URLSearchParams(params)
    const requestUrl = `${url}?` + query
    const res = await fetch(requestUrl, { method: "GET", mode: "cors" })
    const data = await res.json()
    const results = data["results"]

    // 一番上（新着情報）に要素を追加
    addTable(results, target)
    const title = document.createElement("h3")
    title.textContent = "課題一覧" + `（取得: ${formatDateForShow(origin_date)}）`
    target.prepend(title)
}



function addTable(results, body) {
    const div = document.createElement("div")
    div.setAttribute("class", "module-section")
    let table = [];
    const labels = ["今日", "明日", "将来", "期限切れ"]
    for (let i = 0; i < 4; i++) {
        table[i] = document.createElement("table")
        table[i].setAttribute("border", 2)
        table[i].setAttribute("style", "table-layout: fixed;width: 60%;")
        table[i].appendChild(getDateLabel(labels[i]))

    } const header = getHeader()
    table[assignmentDeadline.TODAY].appendChild(header)


    results.forEach(element => {
        const endDate = new Date(element["endDate"])
        const courseId = element["calendarId"]
        const ItemSourceType = element["itemSourceType"]
        const ItemSourceId = element["itemSourceId"]

        const row = document.createElement("tr")
        const cell = document.createElement("td")
        const link = document.createElement("a")
        const assignmentUrl = getAssignmentUrl(courseId, ItemSourceType, ItemSourceId)
        link.setAttribute("href", assignmentUrl)
        link.setAttribute("target", "_blank")
        const cellText = document.createTextNode(element["title"])
        const cell_deadline = document.createElement("td")
        link.appendChild(cellText)
        cell.appendChild(link)
        cell_deadline.appendChild(document.createTextNode(formatDateForShow(endDate)))
        row.appendChild(cell)
        row.appendChild(cell_deadline)
        if (endDate <= origin_date) {
            cell.setAttribute("style", "color:red;");
            table[assignmentDeadline.EXPIRED].appendChild(row)
        }
        else if (endDate <= today) {
            table[assignmentDeadline.TODAY].appendChild(row)
        }
        else if (endDate <= tomorrow) {
            table[assignmentDeadline.TOMORROW].appendChild(row)
        }
        else if (endDate > tomorrow) {
            table[assignmentDeadline.FUTURE].appendChild(row)
        }

    });
    table.forEach(t => div.appendChild(t))
    body.prepend(div)
}

function getHeader() {
    const header = document.createElement("tr")
    const header_cell1 = document.createElement("th")
    header_cell1.appendChild(document.createTextNode("課題"))
    const header_cell2 = document.createElement("th")
    header_cell2.appendChild(document.createTextNode("締切"))
    header.appendChild(header_cell1)
    header.appendChild(header_cell2)
    return header
}

function getDateLabel(title) {
    const row = document.createElement("tr")
    const cell = document.createElement("td")
    cell.setAttribute("style", "font-weight:bold;")
    cell.setAttribute("colspan", 2)
    const cellText = document.createTextNode(title)
    cell.appendChild(cellText)
    row.appendChild(cell)
    return row
}