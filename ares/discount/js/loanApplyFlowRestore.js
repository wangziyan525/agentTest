(function () {
    var app = document.getElementById("loanFlowRestoreApp");
    var tabs = app.querySelectorAll(".loan-flow-tabs__item");
    var line = app.querySelector(".loan-flow-tabs__line");
    var panels = app.querySelectorAll(".loan-flow-panel");
    var footer = document.getElementById("loanFlowFooter");
    var leftLabel = document.getElementById("loanFlowLeftLabel");
    var rightLabel = document.getElementById("loanFlowRightLabel");
    var leftTrigger = document.getElementById("loanFlowLeftFilter");
    var rightTrigger = document.getElementById("loanFlowRightFilter");
    var mask = document.getElementById("loanFlowMask");
    var sheets = document.querySelectorAll(".loan-flow-sheet");
    var applyChecks = app.querySelectorAll(".loan-flow-apply-check");
    var checkAll = document.getElementById("loanFlowCheckAll");
    var selectedCount = document.getElementById("loanFlowSelectedCount");
    var totalCount = document.getElementById("loanFlowTotalCount");
    var submit = document.getElementById("loanFlowSubmit");
    var billOptions = document.querySelectorAll(".loan-flow-option");
    var quickButtons = document.querySelectorAll(".loan-flow-quick__item");
    var resultFilterForm = document.querySelector(".loan-flow-form--result");
    var applyFilterForm = document.querySelector(".loan-flow-form--apply");
    var currentTab = "apply";
    var activeSheet = "";

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

    function syncFilterVisual() {
        leftTrigger.classList.toggle("loan-flow-filter__item--accent", activeSheet === "bill-type" || activeSheet === "date");
        rightTrigger.classList.toggle("loan-flow-filter__item--accent", activeSheet === "filter");
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

    function setTab(tab) {
        var index;
        var isApply = tab === "apply";

        currentTab = tab;

        for (index = 0; index < tabs.length; index += 1) {
            tabs[index].classList.toggle("loan-flow-tabs__item--active", tabs[index].getAttribute("data-tab") === tab);
        }

        for (index = 0; index < panels.length; index += 1) {
            panels[index].classList.toggle("loan-flow-panel--active", panels[index].getAttribute("data-panel") === tab);
        }

        line.style.transform = isApply ? "translateX(0)" : "translateX(188px)";
        footer.hidden = !isApply;
        leftLabel.textContent = isApply ? "银票" : "当日";
        rightLabel.textContent = "筛选";
        applyFilterForm.hidden = !isApply;
        resultFilterForm.hidden = isApply;
        closeSheet();
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

    function bindBillOptions() {
        var index;

        for (index = 0; index < billOptions.length; index += 1) {
            billOptions[index].addEventListener("click", function (event) {
                var innerIndex;

                for (innerIndex = 0; innerIndex < billOptions.length; innerIndex += 1) {
                    billOptions[innerIndex].classList.remove("loan-flow-option--selected");
                }

                event.currentTarget.classList.add("loan-flow-option--selected");
                leftLabel.textContent = event.currentTarget.getAttribute("data-value");
                closeSheet();
            });
        }
    }

    function bindQuickButtons() {
        var index;

        for (index = 0; index < quickButtons.length; index += 1) {
            quickButtons[index].addEventListener("click", function (event) {
                var innerIndex;

                for (innerIndex = 0; innerIndex < quickButtons.length; innerIndex += 1) {
                    quickButtons[innerIndex].classList.remove("loan-flow-quick__item--active");
                }

                event.currentTarget.classList.add("loan-flow-quick__item--active");
            });
        }
    }

    function bindActions() {
        document.addEventListener("click", function (event) {
            var action = event.target.getAttribute("data-action");
            var selectedOption;

            if (!action) {
                return;
            }

            if (action === "reset-date") {
                quickButtons[0].classList.add("loan-flow-quick__item--active");
                quickButtons[1].classList.remove("loan-flow-quick__item--active");
                quickButtons[2].classList.remove("loan-flow-quick__item--active");
                quickButtons[3].classList.remove("loan-flow-quick__item--active");
                leftLabel.textContent = "当日";
            }

            if (action === "confirm-date") {
                selectedOption = document.querySelector(".loan-flow-quick__item--active");
                leftLabel.textContent = selectedOption ? selectedOption.textContent : "当日";
            }

            if (action === "reset-filter") {
                rightLabel.textContent = "筛选";
            }

            if (action === "confirm-filter") {
                rightLabel.textContent = "筛选";
            }

            closeSheet();
        });
    }

    function bindMaskAndClose() {
        var closeButtons = document.querySelectorAll(".loan-flow-sheet__close");
        var index;

        mask.addEventListener("click", closeSheet);

        for (index = 0; index < closeButtons.length; index += 1) {
            closeButtons[index].addEventListener("click", closeSheet);
        }
    }

    function bindChecks() {
        var index;

        for (index = 0; index < applyChecks.length; index += 1) {
            applyChecks[index].addEventListener("change", updateCounts);
        }

        checkAll.addEventListener("change", function (event) {
            var innerIndex;
            var nextValue = event.target.checked;

            for (innerIndex = 0; innerIndex < applyChecks.length; innerIndex += 1) {
                applyChecks[innerIndex].checked = nextValue;
            }

            updateCounts();
        });
    }

    function init() {
        bindTabs();
        bindFilters();
        bindBillOptions();
        bindQuickButtons();
        bindActions();
        bindMaskAndClose();
        bindChecks();
        updateCounts();
        setTab("apply");
    }

    init();
}());
