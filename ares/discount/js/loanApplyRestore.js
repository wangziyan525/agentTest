(function () {
    var app = document.getElementById("loanRestoreApp");
    var tabs = app.querySelectorAll(".loan-restore-tabs__item");
    var line = app.querySelector(".loan-restore-tabs__line");
    var panels = app.querySelectorAll(".loan-restore-panel");
    var footer = document.getElementById("loanRestoreFooter");
    var leftLabel = document.getElementById("loanRestoreLeftLabel");
    var rightLabel = document.getElementById("loanRestoreRightLabel");
    var leftTrigger = document.getElementById("loanRestoreLeftFilter");
    var rightTrigger = document.getElementById("loanRestoreRightFilter");
    var mask = document.getElementById("loanRestoreMask");
    var sheets = document.querySelectorAll(".loan-restore-sheet");
    var applyChecks = app.querySelectorAll(".loan-restore-apply-check");
    var checkAll = document.getElementById("loanRestoreCheckAll");
    var selectedCount = document.getElementById("loanRestoreSelectedCount");
    var totalCount = document.getElementById("loanRestoreTotalCount");
    var submit = document.getElementById("loanRestoreSubmit");
    var currentTab = "apply";
    var activeSheet = "";

    function syncFilterVisual() {
        leftTrigger.classList.remove("loan-restore-filter__item--accent");
        rightTrigger.classList.remove("loan-restore-filter__item--accent");

        if (activeSheet === "filter") {
            rightTrigger.classList.add("loan-restore-filter__item--accent");
        }
    }

    function updateCounts() {
        var count = 0;
        var index;

        for (index = 0; index < applyChecks.length; index += 1) {
            if (applyChecks[index].checked) {
                count += 1;
            }
        }

        selectedCount.textContent = String(count);
        totalCount.textContent = String(applyChecks.length);
        checkAll.checked = count === applyChecks.length;
        submit.disabled = count === 0;
    }

    function setTab(tab) {
        var index;

        currentTab = tab;
        for (index = 0; index < tabs.length; index += 1) {
            tabs[index].classList.toggle("loan-restore-tabs__item--active", tabs[index].getAttribute("data-tab") === tab);
        }
        for (index = 0; index < panels.length; index += 1) {
            panels[index].classList.toggle("loan-restore-panel--active", panels[index].getAttribute("data-panel") === tab);
        }

        line.style.transform = tab === "result" ? "translateX(188px)" : "translateX(0)";
        footer.hidden = tab !== "apply";
        app.classList.toggle("loan-restore-screen--apply", tab === "apply");
        app.classList.toggle("loan-restore-screen--result", tab === "result");
        leftLabel.textContent = tab === "apply" ? "银票" : "当日";
        rightLabel.textContent = "筛选";
        closeSheet();
    }

    function closeSheet() {
        var index;

        activeSheet = "";
        mask.hidden = true;
        for (index = 0; index < sheets.length; index += 1) {
            sheets[index].hidden = true;
        }
        syncFilterVisual();
    }

    function openSheet(name) {
        var index;

        activeSheet = name;
        mask.hidden = false;
        for (index = 0; index < sheets.length; index += 1) {
            sheets[index].hidden = sheets[index].getAttribute("data-sheet") !== name;
        }
        syncFilterVisual();
    }

    function bindTabs() {
        var index;

        for (index = 0; index < tabs.length; index += 1) {
            tabs[index].addEventListener("click", function (event) {
                setTab(event.currentTarget.getAttribute("data-tab"));
            });
        }
    }

    function bindFilters() {
        leftTrigger.addEventListener("click", function () {
            openSheet(currentTab === "apply" ? "bill-type" : "date");
        });

        rightTrigger.addEventListener("click", function () {
            openSheet("filter");
        });
    }

    function bindSheets() {
        var closeButtons = document.querySelectorAll(".loan-restore-sheet__close");
        var billOptions = document.querySelectorAll(".loan-restore-option");
        var quickButtons = document.querySelectorAll(".loan-restore-quick__item");
        var index;

        mask.addEventListener("click", closeSheet);

        for (index = 0; index < closeButtons.length; index += 1) {
            closeButtons[index].addEventListener("click", closeSheet);
        }

        for (index = 0; index < billOptions.length; index += 1) {
            billOptions[index].addEventListener("click", function (event) {
                var options = document.querySelectorAll(".loan-restore-option");
                var innerIndex;

                for (innerIndex = 0; innerIndex < options.length; innerIndex += 1) {
                    options[innerIndex].classList.remove("loan-restore-option--selected");
                }

                event.currentTarget.classList.add("loan-restore-option--selected");
                leftLabel.textContent = event.currentTarget.getAttribute("data-value");
            });
        }

        for (index = 0; index < quickButtons.length; index += 1) {
            quickButtons[index].addEventListener("click", function (event) {
                var nodes = document.querySelectorAll(".loan-restore-quick__item");
                var innerIndex;

                for (innerIndex = 0; innerIndex < nodes.length; innerIndex += 1) {
                    nodes[innerIndex].classList.remove("loan-restore-quick__item--active");
                }

                event.currentTarget.classList.add("loan-restore-quick__item--active");
                leftLabel.textContent = event.currentTarget.textContent;
            });
        }

        document.addEventListener("click", function (event) {
            var action = event.target.getAttribute("data-action");

            if (!action) {
                return;
            }

        if (action === "reset-bill") {
            leftLabel.textContent = "银票";
            document.querySelectorAll(".loan-restore-option")[0].classList.add("loan-restore-option--selected");
            document.querySelectorAll(".loan-restore-option")[1].classList.remove("loan-restore-option--selected");
        }

        if (action === "reset-date") {
            leftLabel.textContent = "当日";
            document.querySelectorAll(".loan-restore-quick__item")[0].classList.add("loan-restore-quick__item--active");
            document.querySelectorAll(".loan-restore-quick__item")[1].classList.remove("loan-restore-quick__item--active");
            document.querySelectorAll(".loan-restore-quick__item")[2].classList.remove("loan-restore-quick__item--active");
            document.querySelectorAll(".loan-restore-quick__item")[3].classList.remove("loan-restore-quick__item--active");
        }

            if (action === "reset-filter") {
                rightLabel.textContent = "筛选";
            }

            closeSheet();
        });
    }

    function bindChecks() {
        var index;

        for (index = 0; index < applyChecks.length; index += 1) {
            applyChecks[index].addEventListener("change", updateCounts);
        }

        checkAll.addEventListener("change", function (event) {
            var nextValue = event.target.checked;
            var innerIndex;

            for (innerIndex = 0; innerIndex < applyChecks.length; innerIndex += 1) {
                applyChecks[innerIndex].checked = nextValue;
            }

            updateCounts();
        });
    }

    function init() {
        bindTabs();
        bindFilters();
        bindSheets();
        bindChecks();
        updateCounts();
        app.classList.add("loan-restore-screen--apply");
        setTab("apply");
    }

    init();
}());
