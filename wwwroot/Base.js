/*本地端*/
const BASE_URL = 'http://localhost:44374';
const BASE_WEB = 'http://localhost:7135';

/*正式區*/
//const BASE_URL = 'http://192.168.1.22/KF_WebAPI';
//const BASE_WEB = 'http://192.168.1.240/KF_ERP';

/*測試區*/
//const BASE_URL = 'http://192.168.1.243/KF_WebAPI';
//const BASE_WEB = 'http://192.168.1.240:8081/KF_ERP';

function encryptParameter(value) {
    let base64 = btoa(value);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decryptParameter(value) {
    let base64 = value.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    return atob(base64);
}

function getQueryParams() {
    const Params = new URLSearchParams(window.location.search);
    
    //本地端使用
    const WebUser = Params.get('User');
    const WebBC = Params.get('U_BC');

    //測試跟正式
    //const WebUser = decryptParameter(Params.get('User'));
    //const WebBC = decryptParameter(Params.get('U_BC'));

    return { WebUser, WebBC };
}

function loadBCDropdown() {
    const url = `${BASE_URL}/AE/GetBCList`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.resultCode === "000") {
                const selectElement = document.getElementById('U_BC');

                const options = JSON.parse(data.objResult);

                selectElement.innerHTML = '<option value="" selected>不限</option>';

                options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.item_D_code; 
                    optionElement.textContent = option.item_D_name; 
                    selectElement.appendChild(optionElement);
                });
            } else {
                alert('錯誤: ' + (data.resultMsg || '未知錯誤'));
            }
        })
        .catch(error => {
            console.error('載入選項時出錯:', error);
            alert('無法載入資料，請稍後再試。');
        });
}

function loadRolmDropdown() {
    const url = `${BASE_URL}/AE/GetRoleProfessionalList`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.resultCode === "000") {
                const selectElement = document.getElementById('role');

                // 解析 objResult 字串為 JSON
                const options = JSON.parse(data.objResult);

                // 清空原有選項，避免重複加載
                selectElement.innerHTML = '<option value="" selected>請選擇</option>';

                // 動態填充選項
                options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.R_num; // 設置 value 為 item_D_code
                    optionElement.textContent = option.R_name; // 設置顯示文字為 item_D_name
                    selectElement.appendChild(optionElement);
                });
            } else {
                alert('錯誤: ' + (data.resultMsg || '未知錯誤'));
            }
        })
        .catch(error => {
            console.error('載入選項時出錯:', error);
            alert('無法載入資料，請稍後再試。');
        });
}

function loadSchoolDropdown() {
    const url = `${BASE_URL}/AE/GetSchoolLevelList`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.resultCode === "000") {
                const selectElement = document.getElementById('School_Level');

                // 解析 objResult 字串為 JSON
                const options = JSON.parse(data.objResult);

                // 清空原有選項，避免重複加載
                selectElement.innerHTML = '<option value="" selected>請選擇</option>';

                // 動態填充選項
                options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.item_D_code; // 設置 value 為 item_D_code
                    optionElement.textContent = option.item_D_name; // 設置顯示文字為 item_D_name
                    selectElement.appendChild(optionElement);
                });
            } else {
                alert('錯誤: ' + (data.resultMsg || '未知錯誤'));
            }
        })
        .catch(error => {
            console.error('載入選項時出錯:', error);
            alert('無法載入資料，請稍後再試。');
        });
}

function loadPtfDropdown() {
    const url = `${BASE_URL}/AE/GetTitleList`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.resultCode === "000") {
                const selectElement = document.getElementById('U_PFT');

                // 解析 objResult 字串為 JSON
                const options = JSON.parse(data.objResult);

                // 清空原有選項，避免重複加載
                selectElement.innerHTML = '<option value="" selected>請選擇</option>';

                // 動態填充選項
                options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.item_D_code; // 設置 value 為 item_D_code
                    optionElement.textContent = option.item_D_name; // 設置顯示文字為 item_D_name
                    selectElement.appendChild(optionElement);
                });
            } else {
                alert('錯誤: ' + (data.resultMsg || '未知錯誤'));
            }
        })
        .catch(error => {
            console.error('載入選項時出錯:', error);
            alert('無法載入資料，請稍後再試。');
        });
}
// 創建分頁按鈕
function createPagination() {
    const totalPages = Math.ceil(data.length / itemsPerPage); // 計算總頁數
    const paginationContainer = document.querySelector('#pagination');
    paginationContainer.innerHTML = '';  // 清空現有分頁按鈕

    // 計算當前分頁範圍的起始頁和結束頁
    const rangeStart = Math.floor((currentPage - 1) / 10) * 10 + 1; // 起始頁
    const rangeEnd = Math.min(rangeStart + 9, totalPages); // 結束頁 (最多顯示10頁)

    // "前10" 按鈕
    const prev10Button = document.createElement('button');
    prev10Button.textContent = '前10頁';
    prev10Button.disabled = rangeStart === 1; // 如果當前範圍從第1頁開始則禁用
    prev10Button.addEventListener('click', () => changePage(rangeStart - 10));
    prev10Button.style.margin = '0 10px'; // 設置間距
    paginationContainer.appendChild(prev10Button);

    // "上一頁" 按鈕
    const prevButton = document.createElement('button');
    prevButton.textContent = '上一頁';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => changePage(currentPage - 1));
    prevButton.style.margin = '0 10px';  // 設置間距
    paginationContainer.appendChild(prevButton);

    // 分頁數字按鈕 (只顯示當前範圍的頁數)
    for (let i = rangeStart; i <= rangeEnd; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.disabled = i === currentPage;
        pageButton.addEventListener('click', () => changePage(i));
        pageButton.style.margin = '0 10px';  // 設置間距
        paginationContainer.appendChild(pageButton);
    }

    // "下一頁" 按鈕
    const nextButton = document.createElement('button');
    nextButton.textContent = '下一頁';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => changePage(currentPage + 1));
    nextButton.style.margin = '0 10px';  // 設置間距
    paginationContainer.appendChild(nextButton);

    // "後10" 按鈕
    const next10Button = document.createElement('button');
    next10Button.textContent = '後10頁';
    next10Button.disabled = rangeEnd === totalPages; // 如果當前範圍已經是最後10頁則禁用
    next10Button.addEventListener('click', () => changePage(rangeEnd + 1));
    next10Button.style.margin = '0 10px'; // 設置間距
    paginationContainer.appendChild(next10Button);
}

// 切換頁面函數
function changePage(pageNumber) {
    if (pageNumber < 1) return;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (pageNumber > totalPages) return;
    currentPage = pageNumber;
    showPage(currentPage); // 重新顯示頁面內容
    createPagination(); // 重新創建分頁
}

// 創建按鈕的單元格
function createButtonCell(imgSrc, imgAlt, onClickAction) {
    const cell = document.createElement('td');
    const img = document.createElement('img');
    img.src = imgSrc;
    img.width = 16;
    img.height = 18;
    img.alt = imgAlt;
    img.style.cursor = "pointer";
    img.addEventListener('click', onClickAction); 
    cell.appendChild(img);
    return cell;
}

function openUserOne(type) {
    var url = `${BASE_WEB}/HR/User_one.html?type=` + type;
    window.open(url,'User_one','scrollbars=yes,resizable=yes,width=700,height=500,left=250,top=100');
}
function openFile(cknum, WebUser) {
    var url = 'FileList.html?cknum=' + cknum + '&WebUser=' + WebUser;
    window.open(url,'FileList','scrollbars=yes,resizable=yes,width=800,height=500,left=500,top=100');
}

function DownloadFile(upload_id) {
    const url = `${BASE_URL}/AE/ASP_File_Download?upload_id=${upload_id}`;

    fetch(url, {
        method: 'GET',
        credentials: 'include' 
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('檔案下載失敗');
            }

            const disposition = response.headers.get('Content-Disposition');
            let fileName = 'downloaded_file';  

            if (disposition) {
                const filenameStarMatch = /filename\*=UTF-8''([^']*)/.exec(disposition);
                if (filenameStarMatch && filenameStarMatch[1]) {
                    fileName = decodeURIComponent(filenameStarMatch[1]);
                } else {
                    const filenameMatch = /filename="([^"]*)"/.exec(disposition);
                    if (filenameMatch && filenameMatch[1]) {
                        fileName = filenameMatch[1];
                    }
                }
            }

            return response.blob().then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob); 
                link.download = fileName; 
                link.click();
            });
        })
        .catch(error => {
            console.error('下載錯誤:', error);
            alert('下載失敗，請稍後再試。');
        });
}

function convertToROCDate(berDate) {
    let aftday = new Date(berDate);
    let yearROC = aftday.getFullYear() - 1911;
    let month = aftday.getMonth() + 1;
    let day = aftday.getDate();
    return `${yearROC}-${month}-${day}`;
}

function DeleteFile(upload_id, WebUser) {
    
    const url = `${BASE_URL}/AE/ASP_File_Del?upload_id=${upload_id}&WebUser=${WebUser}`;

    fetch(url, {
        method: 'POST', 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) 
    })
        .then(response => response.json())
        .then(data => {
            if (data.resultCode === "000") {
                alert('刪除成功');
                location.reload();
            } else {
                alert('錯誤: ' + (data.resultMsg || '未知錯誤'));
            }
        })
        .catch(error => {
            console.error('出錯:', error);
            alert('錯誤失敗，請稍後再試。');
        });
}

function fetchWebUser(WebUser) {
    const url = `${BASE_URL}/AE_HR/User_M_SQuery?U_num=${encodeURIComponent(WebUser)}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        credentials: 'include'
    })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.resultCode == "000") {
                data = JSON.parse(responseData.objResult);
                const user = data[0];
                document.querySelector('b[name="WebUser"]').textContent = "登入使用者：" + user.U_name;
            } else {
                console.error('API 回傳資料格式錯誤');
            }
        })
        .catch(error => {
            console.error('API 請求失敗:', error);
        });
}

function fetchWebFun(WebUser) {
    const url = `${BASE_URL}/AE/GetMenuList?U_num=${encodeURIComponent(WebUser)}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        credentials: 'include'
    })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.resultCode == "000") {
                const data = JSON.parse(responseData.objResult);

                const table = document.getElementById('TbMenu');

                const customRowsHTML = `
                    <tr bgcolor="#CCCCFF" onmouseover="this.style.background='#FFFF00';" data-sub-id="0" onmouseout="this.style.background='#CCCCFF';" style="cursor: pointer; background: rgb(204, 204, 255);" onclick="toggleSubRows(this);">
                        <td align="left">
                            <a onclick="location.href='../default.asp';"><b>◆ 系統首頁</b></a>
                        </td>
                    </tr>
                    <tr bgcolor="#CCCCFF" onmouseover="this.style.background='#FFFF00';" data-sub-id="0" onmouseout="this.style.background='#CCCCFF';" style="cursor: pointer; background: rgb(204, 204, 255);" onclick="toggleSubRows(this);">
                        <td align="left">
                            <a style="cursor: pointer;" onclick="javascript:void window.open('../User_M/User_edit_psw.asp?U_num=AA999&amp;U_cknum=201801142021320080599999','_User_edit_psw201801142021320080599999','scrollbars=yes,resizable=yes,top=100,width=500,height=300');"><b>◆ 個人密碼變更</b></a>
                        </td>
                    </tr>
                    <tr bgcolor="#CCCCFF" onmouseover="this.style.background='#FFFF00';" data-sub-id="0" onmouseout="this.style.background='#CCCCFF';" style="cursor: pointer; background: rgb(204, 204, 255);" onclick="toggleSubRows(this);">
                        <td align="left">
                            <a style="cursor: pointer;" onclick="location.href='../bulletin/Bulletin_list.asp'"><b>◆ 系統佈告欄</b></a>
                        </td>
                    </tr>
                `;
                table.insertAdjacentHTML('afterbegin', customRowsHTML);

                let lastGroupRow = null;  // 用來記錄上一個主功能的行
                data.forEach(menuItem => {
                    let row = null;
                    const subId = String(menuItem.sub_id);

                    if (subId === "0") {
                        row = document.createElement('tr');
                        row.setAttribute('bgcolor', '#CCCCFF');
                        row.setAttribute('style', 'cursor:pointer;');
                        row.setAttribute('data-sub-id', subId); // 設置 `data-sub-id` 属性
                        // 這裡改為添加事件監聽器，並設置事件來切換顯示/隱藏子功能
                        row.addEventListener('click', function () {
                            toggleSubRows(row);
                        });
                        const menuNameCell = document.createElement('td');
                        menuNameCell.setAttribute('align', 'left');
                        menuNameCell.style.width = '240px';
                        menuNameCell.innerHTML = `<b>◆ ${menuItem.menu_name}</b>`; // 顯示菜單名稱，並加粗
                        row.appendChild(menuNameCell);
                        // 記錄這一行作為上一個主功能
                        lastGroupRow = row;
                    } else {
                        // 這是子功能的行
                        row = document.createElement('tr');
                        row.setAttribute('bgcolor', '#FFFFFF'); // 設置背景顏色
                        row.setAttribute('style', 'cursor:pointer;');
                        row.setAttribute('onmouseover', 'this.style.background=\'#FFFF00\';');
                        row.setAttribute('onmouseout', 'this.style.background=\'#FFFFFF\';');
                        row.setAttribute('data-sub-id', subId); // 設置 `data-sub-id` 属性
                        // 檢查 menu_url 是否存在
                        if (menuItem.menu_url) {
                            row.setAttribute('onclick', `location.href='${menuItem.menu_url}';`);
                        } else {
                            return;
                        }
                        const menuNameCell = document.createElement('td');
                        menuNameCell.setAttribute('align', 'left');
                        menuNameCell.innerHTML = `◇ ${menuItem.menu_name}`; // 顯示菜單名稱，並加上 ◇ 標誌
                        row.appendChild(menuNameCell);

                    }

                    table.appendChild(row);
                });

                // 登出行
                const logoutRow = document.createElement('tr');
                logoutRow.setAttribute('bgcolor', '#CCCCFF');
                logoutRow.setAttribute('style', 'cursor: pointer;');
                logoutRow.setAttribute('onmouseover', 'this.style.background=\'#FFFF00\';');
                logoutRow.setAttribute('onmouseout', 'this.style.background=\'#CCCCFF\';');
                logoutRow.setAttribute('data-sub-id', '0');
                logoutRow.addEventListener('click', function () {
                    location.href = '../logout_save.asp';
                });
                const logoutCell = document.createElement('td');
                logoutCell.setAttribute('align', 'left');
                logoutCell.innerHTML = `<b>◆ 登　　出</b>`;
                logoutRow.appendChild(logoutCell);
                table.appendChild(logoutRow);

            } else {
                console.error('API 回傳資料格式錯誤');
            }
        })
        .catch(error => {
            console.error('API 請求失敗:', error);
        });
}

// 用來切換顯示/隱藏對應的子功能
function toggleSubRows(clickedRow) {
    // 从当前行的下一行开始，查找并操作子功能行，直到找到下一个主功能行
    let nextRow = clickedRow.nextElementSibling;
    let rowCount = 0;

    // 循环直到找到下一个主功能行
    while (nextRow) {
        const subId = nextRow.getAttribute('data-sub-id');
        if (subId === "0") {
            break;  
        }

        // 这是子功能行，处理显示/隐藏
        if (nextRow.style.display !== 'none') {
            nextRow.style.display = 'none'; // 隐藏这一行
        } else {
            nextRow.style.display = ''; // 显示这一行
        }

        rowCount++;
        nextRow = nextRow.nextElementSibling;  // 移动到下一行
    }
}


function dateTW() {
    (function () {

        var yearTextSelector = '.ui-datepicker-year';

        var dateNative = new Date(),
            dateTW = new Date(
                dateNative.getFullYear() - 1911,
                dateNative.getMonth(),
                dateNative.getDate()
            );

        var currentYear = dateNative.getFullYear(); // 當前年份
        var startYear = currentYear - 60;           // 當前年份 - 10
        var endYear = currentYear + 10;             // 當前年份 + 10


        function leftPad(val, length) {
            var str = '' + val;
            while (str.length < length) {
                str = '0' + str;
            }
            return str;
        }

        var funcColle = {
            onSelect: {
                basic: function (dateText, inst) {
                    dateNative = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);

                    var yearTW = inst.selectedYear > 1911
                        ? leftPad(inst.selectedYear - 1911, 4)
                        : inst.selectedYear;
                    var monthTW = leftPad(inst.selectedMonth + 1, 2);
                    var dayTW = leftPad(inst.selectedDay, 2);
                    dateTW = new Date(
                        yearTW + '-' +
                        monthTW + '-' +
                        dayTW + 'T00:00:00.000Z'
                    );
                    return $.datepicker.formatDate(twSettings.dateFormat, dateTW);
                }
            }
        };

        var twSettings = {
            closeText: '關閉',
            prevText: '上個月',
            nextText: '下個月',
            currentText: '今天',
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
            weekHeader: '周',
            dateFormat: 'yy/mm/dd',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: true,
            yearSuffix: '年',

            onSelect: function (dateText, inst) {
                $(this).val(funcColle.onSelect.basic(dateText, inst));
                if (typeof funcColle.onSelect.newFunc === 'function') {
                    funcColle.onSelect.newFunc(dateText, inst);
                }
            }
        };

        var replaceYearText = function () {
            var $yearText = $('.ui-datepicker-year');

            if (twSettings.changeYear !== true) {
                $yearText.text('民國' + dateTW.getFullYear());
            } else {
                if ($yearText.prev('span.datepickerTW-yearPrefix').length === 0) {
                    $yearText.before("<span class='datepickerTW-yearPrefix'>民國</span>");
                }
                $yearText.children().each(function () {
                    if (parseInt($(this).text()) > 1911) {
                        $(this).text(parseInt($(this).text()) - 1911);
                    }
                });
            }
        };

        $.fn.datepickerTW = function (options) {

            if (typeof options === 'object') {
                if (typeof options.onSelect === 'function') {
                    funcColle.onSelect.newFunc = options.onSelect;
                    options.onSelect = twSettings.onSelect;
                }
                if (options.yearRange) {
                    var temp = options.yearRange.split(':');
                    for (var i = 0; i < temp.length; i += 1) {
                        if (parseInt(temp[i]) < 1) {
                            temp[i] = parseInt(temp[i]) + 1911;
                        } else {
                            temp[i] = parseInt(temp[i]) < 1911
                                ? parseInt(temp[i]) + 1911
                                : temp[i];
                        }
                    }
                    options.yearRange = temp[0] + ':' + temp[1];
                }
                if ($(this).val() !== '') {
                    options.defaultDate = $(this).val();
                }
            }

            if (arguments.length > 1) {
                if (arguments[0] === 'option') {
                    options = {};
                    options[arguments[1]] = arguments[2];
                }
            }

            $.extend(twSettings, options);

            twSettings.yearRange = startYear + ':' + endYear;

            $(this).datepicker(twSettings);

            $(this).click(function () {
                var isFirstTime = ($(this).val() === '');
                if ((twSettings.defaultDate || twSettings.yearRange) && isFirstTime) {

                    if (twSettings.defaultDate) {
                        $(this).datepicker('setDate', twSettings.defaultDate);
                    }

                    if (twSettings.yearRange) {
                        var $yearSelect = $('.ui-datepicker-year'),
                            nowYear = twSettings.defaultDate
                                ? $(this).datepicker('getDate').getFullYear()
                                : dateNative.getFullYear();

                        $yearSelect.children(':selected').removeAttr('selected');
                        if ($yearSelect.children('[value=' + nowYear + ']').length > 0) {
                            $yearSelect.children('[value=' + nowYear + ']').attr('selected', 'selected');
                        } else {
                            $yearSelect.children().last().attr('selected', 'selected');
                        }
                    }
                } else {
                    $(this).datepicker('setDate', dateNative);
                }

                $(this).val($.datepicker.formatDate(twSettings.dateFormat, dateTW));

                replaceYearText();

                if (isFirstTime) {
                    $(this).val('');
                }
            });
            i
            $(this).focus(function () {
                replaceYearText();
            });

            return this;
        };

    })();


    $('.datepickerTW').datepickerTW({
        changeYear: true,
        changeMonth: true,
        dateFormat: 'yy-mm-dd',

    });
    $('.datepicker').datepicker({
        changeYear: true,
        changeMonth: true,
        dateFormat: 'yy-mm-dd'
    });
}
