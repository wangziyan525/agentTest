(function () {
    var tickets = [
        {
            number: "4040112223348255",
            tag: "商票",
            fields: [
                { label: "票面金额", value: "¥1,233,234.00" },
                { label: "子票区间", value: "000000000001,00006000000", wide: true },
                { label: "出票日期", value: "2025-05-18" },
                { label: "到期日期", value: "2025-10-30" },
                { label: "出票人名称", value: "陕西莲湖华阳物流有限公司" },
                { label: "收票人名称", value: "西安文旅科技有限公司" },
                { label: "承兑人名称", value: "西安银行高新科技路支行", deep: true }
            ]
        },
        {
            number: "4040112223348255",
            tag: "商票",
            fields: [
                { label: "票面金额", value: "¥1,233,234.00" },
                { label: "子票区间", value: "000000000001,00006000000", wide: true },
                { label: "出票日期", value: "2025-05-18" },
                { label: "到期日期", value: "2025-10-30" },
                { label: "出票人名称", value: "陕西莲湖华阳物流有限公司" },
                { label: "收票人名称", value: "西安文旅科技有限公司" },
                { label: "承兑人名称", value: "西安银行高新科技路支行", deep: true }
            ]
        },
        {
            number: "4040112223348255",
            tag: "商票",
            fields: [
                { label: "票面金额", value: "¥1,233,234.00" },
                { label: "子票区间", value: "000000000001,00006000000", wide: true },
                { label: "出票日期", value: "2025-05-18" },
                { label: "到期日期", value: "2025-10-30" },
                { label: "出票人名称", value: "陕西莲湖华阳物流有限公司" },
                { label: "收票人名称", value: "西安文旅科技有限公司" },
                { label: "承兑人名称", value: "西安银行高新科技路支行", deep: true }
            ]
        }
    ];
    var listNode = document.getElementById("loanApply602ArtboardList");
    var selectAllNode = document.getElementById("loanApply602ArtboardSelectAll");
    var selectedCountNode = document.getElementById("loanApply602ArtboardSelectedCount");
    var totalCountNode = document.getElementById("loanApply602ArtboardTotalCount");
    var submitNode = document.getElementById("loanApply602ArtboardSubmit");

    function escapeHtml(value) {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function fieldMarkup(field) {
        var className = "loan-apply-602-artboard-row__value";

        if (field.wide) {
            className += " loan-apply-602-artboard-row__value--wide";
        }

        if (field.deep) {
            className += " loan-apply-602-artboard-row__value--deep";
        }

        return "" +
            "<div class=\"loan-apply-602-artboard-row\">" +
            "<div class=\"loan-apply-602-artboard-row__label\">" + escapeHtml(field.label) + "</div>" +
            "<div class=\"" + className + "\">" + escapeHtml(field.value) + "</div>" +
            "</div>";
    }

    function cardMarkup(ticket, index) {
        var fieldsHtml = "";
        var fieldIndex;

        for (fieldIndex = 0; fieldIndex < ticket.fields.length; fieldIndex += 1) {
            fieldsHtml += fieldMarkup(ticket.fields[fieldIndex]);
        }

        return "" +
            "<section class=\"loan-apply-602-artboard-card\">" +
            "<div class=\"loan-apply-602-artboard-card__head\">" +
            "<label class=\"loan-apply-602-artboard-check\">" +
            "<input class=\"loan-apply-602-artboard-check__input loan-apply-602-artboard-item-check\" data-index=\"" + index + "\" type=\"checkbox\" checked>" +
            "<span class=\"loan-apply-602-artboard-check__icon\" aria-hidden=\"true\"></span>" +
            "</label>" +
            "<div class=\"loan-apply-602-artboard-card__number\">" + escapeHtml(ticket.number) + "</div>" +
            "<div class=\"loan-apply-602-artboard-card__tag\">" + escapeHtml(ticket.tag) + "</div>" +
            "</div>" +
            "<div class=\"loan-apply-602-artboard-card__body\">" + fieldsHtml + "</div>" +
            "</section>";
    }

    function getItemChecks() {
        return listNode.querySelectorAll(".loan-apply-602-artboard-item-check");
    }

    function renderCards() {
        var html = "";
        var index;

        for (index = 0; index < tickets.length; index += 1) {
            html += cardMarkup(tickets[index], index);
        }

        listNode.innerHTML = html;
    }

    function selectedCount() {
        var itemChecks = getItemChecks();
        var count = 0;
        var index;

        for (index = 0; index < itemChecks.length; index += 1) {
            if (itemChecks[index].checked) {
                count += 1;
            }
        }

        return count;
    }

    function syncFooter() {
        var itemChecks = getItemChecks();
        var count = selectedCount();

        selectedCountNode.textContent = String(count);
        totalCountNode.textContent = String(itemChecks.length);
        selectAllNode.checked = count > 0 && count === itemChecks.length;
        submitNode.disabled = count === 0;
    }

    function bindList() {
        listNode.addEventListener("change", function (event) {
            if (event.target.classList.contains("loan-apply-602-artboard-item-check")) {
                syncFooter();
            }
        });
    }

    function bindSelectAll() {
        selectAllNode.addEventListener("change", function (event) {
            var itemChecks = getItemChecks();
            var checked = event.target.checked;
            var index;

            for (index = 0; index < itemChecks.length; index += 1) {
                itemChecks[index].checked = checked;
            }

            syncFooter();
        });
    }

    function init() {
        renderCards();
        bindList();
        bindSelectAll();
        syncFooter();
    }

    init();
}());
