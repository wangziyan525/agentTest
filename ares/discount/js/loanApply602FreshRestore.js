(function () {
    var items = [
        {
            number: "4040112223348255",
            tag: "商票",
            amount: "¥1,233,234.00",
            interval: "000000000001,00006000000",
            issueDate: "2025-05-18",
            dueDate: "2025-10-30",
            issuer: "陕西莲湖华阳物流有限公司",
            receiver: "西安文旅科技有限公司",
            acceptor: "西安银行高新科技路支行",
            checked: true
        },
        {
            number: "4040112223348255",
            tag: "商票",
            amount: "¥1,233,234.00",
            interval: "000000000001,00006000000",
            issueDate: "2025-05-18",
            dueDate: "2025-10-30",
            issuer: "陕西莲湖华阳物流有限公司",
            receiver: "西安文旅科技有限公司",
            acceptor: "西安银行高新科技路支行",
            checked: true
        },
        {
            number: "4040112223348255",
            tag: "商票",
            amount: "¥1,233,234.00",
            interval: "000000000001,00006000000",
            issueDate: "2025-05-18",
            dueDate: "2025-10-30",
            issuer: "陕西莲湖华阳物流有限公司",
            receiver: "西安文旅科技有限公司",
            acceptor: "西安银行高新科技路支行",
            checked: true
        }
    ];

    var listNode = document.getElementById("loanApply602FreshList");
    var selectAllNode = document.getElementById("loanApply602FreshSelectAll");
    var selectedCountNode = document.getElementById("loanApply602FreshSelectedCount");
    var totalCountNode = document.getElementById("loanApply602FreshTotalCount");
    var submitNode = document.getElementById("loanApply602FreshSubmit");

    function renderList() {
        listNode.innerHTML = items.map(function (item, index) {
            return [
                '<section class="loan-apply-602-fresh-card">',
                '  <div class="loan-apply-602-fresh-card__summary">',
                '    <label class="loan-apply-602-fresh-check" for="loanApply602FreshItem' + index + '">',
                '      <input id="loanApply602FreshItem' + index + '" class="loan-apply-602-fresh-check__input loan-apply-602-fresh-item-check" type="checkbox" data-index="' + index + '"' + (item.checked ? " checked" : "") + '>',
                '      <span class="loan-apply-602-fresh-check__icon" aria-hidden="true"></span>',
                "    </label>",
                '    <div class="loan-apply-602-fresh-card__number">' + item.number + "</div>",
                '    <div class="loan-apply-602-fresh-card__tag">' + item.tag + "</div>",
                "  </div>",
                '  <div class="loan-apply-602-fresh-card__details">',
                '    <div class="loan-apply-602-fresh-card__row"><div class="loan-apply-602-fresh-card__label">票面金额</div><div class="loan-apply-602-fresh-card__value">' + item.amount + "</div></div>",
                '    <div class="loan-apply-602-fresh-card__row"><div class="loan-apply-602-fresh-card__label">子票区间</div><div class="loan-apply-602-fresh-card__value">' + item.interval + "</div></div>",
                '    <div class="loan-apply-602-fresh-card__row"><div class="loan-apply-602-fresh-card__label">出票日期</div><div class="loan-apply-602-fresh-card__value">' + item.issueDate + "</div></div>",
                '    <div class="loan-apply-602-fresh-card__row"><div class="loan-apply-602-fresh-card__label">到期日期</div><div class="loan-apply-602-fresh-card__value">' + item.dueDate + "</div></div>",
                '    <div class="loan-apply-602-fresh-card__row"><div class="loan-apply-602-fresh-card__label">出票人名称</div><div class="loan-apply-602-fresh-card__value">' + item.issuer + "</div></div>",
                '    <div class="loan-apply-602-fresh-card__row"><div class="loan-apply-602-fresh-card__label">收票人名称</div><div class="loan-apply-602-fresh-card__value">' + item.receiver + "</div></div>",
                '    <div class="loan-apply-602-fresh-card__row"><div class="loan-apply-602-fresh-card__label">承兑人名称</div><div class="loan-apply-602-fresh-card__value">' + item.acceptor + "</div></div>",
                "  </div>",
                "</section>"
            ].join("");
        }).join("");
    }

    function getSelectedCount() {
        return items.filter(function (item) {
            return item.checked;
        }).length;
    }

    function syncFooter() {
        var selectedCount = getSelectedCount();
        selectedCountNode.textContent = selectedCount;
        totalCountNode.textContent = items.length;
        selectAllNode.checked = selectedCount === items.length;
        submitNode.disabled = selectedCount === 0;
    }

    function bindEvents() {
        listNode.addEventListener("change", function (event) {
            var target = event.target;
            if (!target.classList.contains("loan-apply-602-fresh-item-check")) {
                return;
            }

            var index = Number(target.getAttribute("data-index"));
            items[index].checked = target.checked;
            syncFooter();
        });

        selectAllNode.addEventListener("change", function () {
            var checked = selectAllNode.checked;
            items.forEach(function (item) {
                item.checked = checked;
            });
            renderList();
            syncFooter();
        });
    }

    renderList();
    syncFooter();
    bindEvents();
})();
