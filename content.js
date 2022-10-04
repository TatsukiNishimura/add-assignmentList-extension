const url = "https://www.cle.osaka-u.ac.jp/learn/api/v1/calendars/dueDateCalendarItems"
const contentLink_base = "https://www.cle.osaka-u.ac.jp/ultra/courses/"
// 課題リンク用　合ってるかわからない
const magic_url = "/cl/outline?legacyUrl=~2Fwebapps~2Fcalendar~2Flaunch~2Fattempt~2F_"
// API側での時刻はUTC つまり日本より9時間遅い
const hour_diffenrence = 9
const origin_date = new Date()
const today = new Date(origin_date.getFullYear(), origin_date.getMonth(), origin_date.getDate(), 23, 59, 00)
const tomorrow = new Date(origin_date.getFullYear(), origin_date.getMonth(), origin_date.getDate() + 1, 23, 59, 00)
const dayAfterTomorrow = new Date(origin_date.getFullYear(), origin_date.getMonth(), origin_date.getDate() + 2, 23, 59, 00)

// date_compateは"lessOrEqual"か"greaterOrEqual"
const params = { date: origin_date.toJSON(), date_compare: "greaterOrEqual", includeCount: true, limit: 20, offset: 0 }
const query = new URLSearchParams(params)
window.addEventListener("load", main, false);

function main(e) {
    const jsInitCheckTimer = setInterval(jsLoaded, 1000);
    async function jsLoaded() {
        if (document.getElementsByClassName("module-section") != null) {
            // CLEの先頭ページの新着情報、サポートセンターなどの欄
            const body = document.getElementsByClassName("module-section")
            const requestUrl = `${url}?` + query
            const res = await fetch(requestUrl, { method: "GET", mode: "cors" })
            const data = await res.json()
            const results = data["results"]
            // 一番上（新着情報）に要素を追加
            addTable(results, body[0])
            const title = document.createElement("h1")
            title.textContent = "課題一覧" + `（取得: ${formatDateForShow(origin_date)}）`
            body[0].prepend(title)
            clearInterval(jsInitCheckTimer);
        }
    }
}


function formatDateForShow(dt) {
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth() + 1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    const h = dt.getHours().toString().padStart(2, '0');
    const M = dt.getMinutes().toString().padStart(2, '0');
    return (y + '-' + m + '-' + d + " " + h + ':' + M);
}

function addTable(results, body) {
    const div = document.createElement("div")
    div.setAttribute("class", "module-section")
    let table = [];
    for (let i = 0; i < 4; i++) {
        table[i] = document.createElement("table")
        table[i].setAttribute("border", 2)
        table[i].setAttribute("style", "table-layout: fixed;width: 60%;")

    } const header = getHeader()
    table[0].appendChild(header)
    table[0].appendChild(getDateLabel("今日"))
    table[1].appendChild(getDateLabel("明日"))
    table[2].appendChild(getDateLabel("将来"))
    table[3].appendChild(getDateLabel("期限切れ"))

    results.forEach(element => {
        const endDate = new Date(element["endDate"])
        const courseId = element["calendarId"]
        const ItemSourceType = element["itemSourceType"]
        const ItemSourceId = element["itemSourceId"]

        const row = document.createElement("tr")
        const cell = document.createElement("td")
        const link = document.createElement("a")
        const assignmentUrl = contentLink_base + courseId + magic_url + ItemSourceType + "-" + ItemSourceId
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
            table[3].appendChild(row)
        }
        else if (endDate <= today) {
            table[0].appendChild(row)
        }
        else if (endDate <= tomorrow) {
            table[1].appendChild(row)
        }
        else if (endDate > tomorrow) {
            table[2].appendChild(row)
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