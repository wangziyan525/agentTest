(function () {
    var itemChecks = document.querySelectorAll(".loan-apply-602-item-check");
    var selectAllNode = document.getElementById("loanApply602SelectAll");
    var selectedCountNode = document.getElementById("loanApply602SelectedCount");
    var totalCountNode = document.getElementById("loanApply602TotalCount");
    var submitNode = document.getElementById("loanApply602Submit");

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

        selectedCountNode.textContent = String(count);
        totalCountNode.textContent = String(itemChecks.length);
        selectAllNode.checked = count === itemChecks.length && itemChecks.length > 0;
        submitNode.disabled = count === 0;
    }

    function bindItemChecks() {
        var index;

        for (index = 0; index < itemChecks.length; index += 1) {
            itemChecks[index].addEventListener("change", syncFooter);
        }
    }

    function bindSelectAll() {
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
        bindItemChecks();
        bindSelectAll();
        syncFooter();
    }

    init();
}());
