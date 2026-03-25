(function () {
    var itemChecks = document.querySelectorAll(".loan-apply-item-check");
    var selectAllNode = document.getElementById("loanApplySelectAll");
    var selectedCountNode = document.getElementById("loanApplySelectedCount");
    var totalCountNode = document.getElementById("loanApplyTotalCount");
    var submitNode = document.getElementById("loanApplySubmit");

    function selectedCount() {
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
        var count = selectedCount();
        var allChecked = count === itemChecks.length && itemChecks.length > 0;

        selectedCountNode.textContent = count;
        totalCountNode.textContent = itemChecks.length;
        selectAllNode.checked = allChecked;
        submitNode.disabled = count === 0;
    }

    function bindItemEvents() {
        var index;

        for (index = 0; index < itemChecks.length; index += 1) {
            itemChecks[index].addEventListener("change", function () {
                syncFooter();
            });
        }
    }

    function bindFooterEvents() {
        selectAllNode.addEventListener("change", function (event) {
            var nextValue = event.target.checked;
            var index;

            for (index = 0; index < itemChecks.length; index += 1) {
                itemChecks[index].checked = nextValue;
            }

            syncFooter();
        });
    }

    function init() {
        bindItemEvents();
        bindFooterEvents();
        syncFooter();
    }

    init();
}());
