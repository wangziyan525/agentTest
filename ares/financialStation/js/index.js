(function () {
    var pageData = {
        tabs: ["存款类", "理财类", "基金类", "保险类"],
        activeTab: 0,
        sortKey: "maxDrawdown",
        sortDirection: "asc",
        productsByTab: [
            [
                {
                    tag: "引流产品",
                    name: "西银安心周周盈",
                    yieldRate: 1.219,
                    duration: "7天",
                    minPurchase: "1万元起",
                    recommendation: "推荐：不求暴富求稳增，震荡市也能从容点！",
                    maxDrawdown: 0.18,
                    volatility: 0.46,
                    calmar: 1.41
                },
                {
                    tag: "引流产品",
                    name: "西银安心周周盈",
                    yieldRate: 1.219,
                    duration: "7天",
                    minPurchase: "1万元起",
                    recommendation: "推荐：不求暴富求稳增，震荡市也能从容点！",
                    maxDrawdown: 0.24,
                    volatility: 0.52,
                    calmar: 1.18
                }
            ],
            [
                {
                    tag: "引流产品",
                    name: "西银稳盈悦享1号",
                    yieldRate: 2.136,
                    duration: "30天",
                    minPurchase: "1万元起",
                    recommendation: "推荐：短期理财更省心，适合稳健配置。",
                    maxDrawdown: 0.36,
                    volatility: 0.73,
                    calmar: 1.02
                },
                {
                    tag: "引流产品",
                    name: "西银稳盈悦享7号",
                    yieldRate: 2.082,
                    duration: "60天",
                    minPurchase: "1万元起",
                    recommendation: "推荐：收益节奏更平滑，波动更易把握。",
                    maxDrawdown: 0.31,
                    volatility: 0.68,
                    calmar: 1.15
                }
            ],
            [
                {
                    tag: "引流产品",
                    name: "西银优选成长A",
                    yieldRate: 3.082,
                    duration: "90天",
                    minPurchase: "1000元起",
                    recommendation: "推荐：把握市场机会，兼顾成长与稳健。",
                    maxDrawdown: 0.58,
                    volatility: 1.12,
                    calmar: 0.93
                },
                {
                    tag: "引流产品",
                    name: "西银景气精选C",
                    yieldRate: 2.864,
                    duration: "180天",
                    minPurchase: "1000元起",
                    recommendation: "推荐：聚焦优质赛道，适合中长期持有。",
                    maxDrawdown: 0.63,
                    volatility: 1.08,
                    calmar: 0.88
                }
            ],
            [
                {
                    tag: "引流产品",
                    name: "西银安心守护",
                    yieldRate: 2.868,
                    duration: "365天",
                    minPurchase: "500元起",
                    recommendation: "推荐：保障与储蓄兼顾，配置思路更完整。",
                    maxDrawdown: 0.22,
                    volatility: 0.44,
                    calmar: 1.26
                },
                {
                    tag: "引流产品",
                    name: "西银长盈安享",
                    yieldRate: 2.735,
                    duration: "365天",
                    minPurchase: "500元起",
                    recommendation: "推荐：长期保障更安心，适合家庭配置。",
                    maxDrawdown: 0.19,
                    volatility: 0.39,
                    calmar: 1.33
                }
            ]
        ],
        sortOptions: [
            { key: "yieldRate", label: "收益率" },
            { key: "maxDrawdown", label: "最大回撤" },
            { key: "volatility", label: "波动率" },
            { key: "calmar", label: "卡玛比率" }
        ]
    };

    var tabList = document.getElementById("tabList");
    var featuredCard = document.getElementById("featuredCard");
    var sortBar = document.getElementById("sortBar");
    var productList = document.getElementById("productList");

    function getCurrentProducts() {
        var products = pageData.productsByTab[pageData.activeTab].slice();
        var factor = pageData.sortDirection === "asc" ? 1 : -1;
        return products.sort(function (left, right) {
            return (left[pageData.sortKey] - right[pageData.sortKey]) * factor;
        });
    }

    function formatRate(value) {
        return value.toFixed(3) + "%";
    }

    function renderTabs() {
        tabList.innerHTML = pageData.tabs.map(function (item, index) {
            var activeClass = index === pageData.activeTab ? " active" : "";
            return '<button class="tab-button' + activeClass + '" type="button" data-tab-index="' + index + '">' + item + "</button>";
        }).join("");
    }

    function renderFeaturedCard(products) {
        var featured = products[0];
        featuredCard.innerHTML = [
            '<div class="featured-header">',
            '<span class="hot-pill">热销产品</span>',
            '<span class="featured-title">' + featured.name + "</span>",
            "</div>",
            '<div class="featured-metrics">',
            '<div class="metric-block metric-block-primary">',
            '<span class="metric-value metric-value-highlight">' + formatRate(featured.yieldRate) + "</span>",
            '<span class="metric-label">收益率</span>',
            "</div>",
            '<div class="metric-block metric-block-secondary">',
            '<span class="metric-value">' + featured.duration + "</span>",
            '<span class="metric-label">投资期限</span>',
            "</div>",
            '<div class="metric-block metric-block-tertiary">',
            '<span class="metric-value">' + featured.minPurchase + "</span>",
            '<span class="metric-label">起购金额</span>',
            "</div>",
            "</div>",
            '<div class="featured-recommendation">' + featured.recommendation + "</div>"
        ].join("");
    }

    function renderSortBar() {
        var html = pageData.sortOptions.map(function (item) {
            var isActive = item.key === pageData.sortKey;
            var upSrc = isActive && pageData.sortDirection === "asc" ? "images/sort-up-active.png" : "images/sort-down-default.png";
            var upStyle = isActive && pageData.sortDirection === "asc" ? "" : ' style="transform: rotate(180deg);"';
            var downSrc = isActive && pageData.sortDirection === "desc" ? "images/sort-up-active.png" : "images/sort-down-default.png";
            var downStyle = isActive && pageData.sortDirection === "desc" ? ' style="transform: rotate(180deg);"' : "";
            return [
                '<button class="sort-item' + (isActive ? ' active' : '') + '" type="button" data-sort-key="' + item.key + '">',
                '<span>' + item.label + "</span>",
                '<span class="sort-arrows">',
                '<img class="arrow-up" src="' + upSrc + '"' + upStyle + ' alt="">',
                '<img class="arrow-down" src="' + downSrc + '"' + downStyle + ' alt="">',
                "</span>",
                "</button>"
            ].join("");
        }).join("");

        sortBar.innerHTML = html + '<button class="filter-button" type="button" aria-label="筛选"><img src="images/filter.png" alt=""></button>';
    }

    function renderProductList(products) {
        productList.innerHTML = products.map(function (item) {
            return [
                '<article class="product-item">',
                '<div class="product-header">',
                '<span class="traffic-pill">' + item.tag + "</span>",
                '<span class="product-title">' + item.name + "</span>",
                "</div>",
                '<div class="product-metrics">',
                '<div class="metric-block metric-block-primary">',
                '<span class="product-rate">' + formatRate(item.yieldRate) + "</span>",
                '<span class="product-label">收益率</span>',
                "</div>",
                '<div class="metric-block metric-block-secondary">',
                '<span class="product-value">' + item.duration + "</span>",
                '<span class="product-label">投资期限</span>',
                "</div>",
                '<div class="metric-block metric-block-tertiary">',
                '<span class="product-value">' + item.minPurchase + "</span>",
                '<span class="product-label">起购金额</span>',
                "</div>",
                "</div>",
                '<div class="product-recommendation">' + item.recommendation + "</div>",
                "</article>"
            ].join("");
        }).join("");
    }

    function renderPage() {
        var currentProducts = getCurrentProducts();
        renderTabs();
        renderFeaturedCard(currentProducts);
        renderSortBar();
        renderProductList(currentProducts);
    }

    tabList.addEventListener("click", function (event) {
        var target = event.target.closest("[data-tab-index]");
        if (!target) {
            return;
        }
        pageData.activeTab = Number(target.getAttribute("data-tab-index"));
        renderPage();
    });

    sortBar.addEventListener("click", function (event) {
        var target = event.target.closest("[data-sort-key]");
        if (!target) {
            return;
        }
        var sortKey = target.getAttribute("data-sort-key");
        if (pageData.sortKey === sortKey) {
            pageData.sortDirection = pageData.sortDirection === "asc" ? "desc" : "asc";
        } else {
            pageData.sortKey = sortKey;
            pageData.sortDirection = "asc";
        }
        renderPage();
    });

    document.querySelector(".back-button").addEventListener("click", function () {
        if (window.history.length > 1) {
            window.history.back();
        }
    });

    renderPage();
}());
