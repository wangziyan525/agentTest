# ARES 前端系统规范

> 本文件是代码生成的**唯一约束基准**。生成任何页面或脚本前必须先读本文件，所有输出必须与本规范保持一致，不得自行引入新框架或改变技术栈。

---

## 1. 项目定位

- 目录 `ares/` 是**多个独立 H5 业务页面**的集合，按模块组织，不是单体 SPA 工程。
- 每个模块独立维护 `html + css + js + image(s)`，模块之间不共享组件。
- 运行环境：**企业微信内嵌 H5**，依赖微信 JSSDK 鉴权和登录态。

---

## 2. 技术栈（固定，不可升级）

| 层级 | 技术 | 版本 |
|------|------|------|
| 模板引擎 | Vue2 | `vue.min.js`（CDN via 相对路径） |
| UI 组件 | Vant 2.12 | `vant-2.12.min.js` / `vant-2.12.css` |
| jQuery | jQuery 2.1.3 | `jquery-2.1.3.min.js` |
| jQuery UI | jquery-weui | `jquery-weui.min.js` / `jquery-weui.min.css` |
| 基础 CSS | WeUI | `weui.min.css` |
| HTTP 封装 | `$http` | `server.js` 中导出 |
| JSSDK | 企业微信 | `jssdk.js` |
| 水印 | `__canvasWM` | `watermark.js` |
| 登录态 | Cookie `user` | `getUserInfo.js` |

> **禁止**：不得引入 Vue3、Vant4、axios、React、vite、webpack 工程化构建。  
> `ares/common/js/` 中存在多版本库（vant@4、vue@3），**仅供特殊模块使用，普通业务页不得引用**。

---

## 3. 目录结构规范

```
ares/
├── common/                  # 公共依赖（只读，不修改）
│   ├── css/
│   │   ├── weui.min.css
│   │   ├── jquery-weui.min.css
│   │   └── vant-2.12.css
│   └── js/
│       ├── base.js          # 全局配置（appid、domain、context）
│       ├── server.js        # $http / $Upload 封装
│       ├── jssdk.js         # initJSSDK()
│       ├── getUserInfo.js   # 登录态入口，调用 getUserFinish()
│       ├── watermark.js     # __canvasWM()
│       ├── vue.min.js
│       ├── vant-2.12.min.js
│       ├── jquery-2.1.3.min.js
│       ├── jquery-weui.min.js
│       ├── jquery.cookie_jq.js
│       └── vConsole.min.js
│
└── <moduleName>/            # 业务模块（一级目录）
    ├── css/
    │   └── <page>.css
    ├── js/
    │   └── <page>.js
    ├── image(s)/
    └── <page>.html
- 一级模块使用 `../common` 引用公共资源。
- 图片目录名：`image/` 或 `images/`，沿用模块现状，新模块统一用 `images/`。

---

## 4. 标准 HTML 页面骨架

> 适用于绝大多数普通业务页（列表页、详情页、申请页）。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
          name="viewport" />
    <title>页面标题</title>
    <!-- 公共 CSS（顺序固定） -->
    <link rel="stylesheet" href="../common/css/weui.min.css" />
    <link rel="stylesheet" href="../common/css/jquery-weui.min.css" />
    <link rel="stylesheet" href="../common/css/vant-2.12.css" />
    <!-- 模块私有 CSS -->
    <link rel="stylesheet" href="css/<page>.css">
</head>
<body>
    <div id="app" v-cloak>
        <!-- 页面内容 -->
    </div>
</body>

<!-- 公共 JS（顺序固定，不可乱序） -->
<script type="text/javascript" src="../common/js/vue.min.js"></script>
<script type="text/javascript" src="../common/js/vant-2.12.min.js"></script>
<script type="text/javascript" src="../common/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../common/js/jquery-weui.min.js"></script>
<script type="text/javascript" src="../common/js/jquery.cookie_jq.js"></script>
<script type="text/javascript" src="../common/js/base.js"></script>
<script type="text/javascript" src="../common/js/jssdk.js"></script>
<script type="text/javascript" src="../common/js/watermark.js"></script>
<script type="text/javascript" src="../common/js/server.js"></script>
<!-- 模块私有 JS -->
<script type="text/javascript" src="js/<page>.js?v=1.0.0"></script>
<!-- 调试用，上线注释掉 -->
<!-- <script type="text/javascript" src="../common/js/vConsole.min.js"></script> -->
<script>
    // var vConsole = new VConsole();

    // JSSDK 初始化
    $(function() {
        initJSSDK(['hideAllNonBaseMenuItem', 'invoke', 'chooseImage', 'uploadImage']);
        wx.ready(function() {
            wx.hideAllNonBaseMenuItem();
        });
    });

    // 登录态回调（getUserInfo.js 执行完后调用此函数）
    function getUserFinish() {
        var username = $.parseJSON($.cookie("user")).name;
        __canvasWM({ content: username });  // 水印
        initFun();                           // 启动 Vue 实例
    }
</script>
<!-- 登录态入口，必须放在最后 -->
<script type="text/javascript" src="../common/js/getUserInfo.js"></script>
</html>
```

### 骨架说明

| 要素 | 说明 |
|------|------|
| `v-cloak` | 防止 Vue 渲染前显示原始模板花括号 |
| `display:none` 初始 | 部分老页面用 `style="display:none"` + `$('#app').show()` 防闪，新页面用 `v-cloak` 替代 |
| `getUserFinish()` | **不可省略**，这是登录态完成后的唯一入口 |
| `initFun()` | **Vue 实例初始化函数**，定义在模块 JS 文件中 |
| `getUserInfo.js` | **必须放在最后**，它会触发整个登录链路 |
| JSSDK 权限列表 | 按页面实际需求增减，常用：`hideAllNonBaseMenuItem`、`invoke`、`chooseImage`、`uploadImage`、`startRecord`、`stopRecord`、`closeWindow` |

---

## 5. 标准 JS 文件骨架

> 文件名对应页面名，如 `list.js`、`detail.js`、`apply.js`。

```javascript
// 接口地址集中管理（可选，也可以直接放在 data 里）
var baseUrl = {
    getList: 'module/getList.xa',
    saveData: 'module/save.xa',
};

var vm; // 暴露实例，方便外部调试

function initFun() {
    vm = new Vue({
        el: '#app',
        data: {
            // ---- 接口地址（若不用 baseUrl 对象，在这里定义）----
            // getListUrl: 'module/getList.xa',

            // ---- 分页 ----
            pageNum: 1,
            pageSize: 10,
            list: [],
            loading: false,
            finished: false,

            // ---- Tab ----
            activeTab: 0,

            // ---- 弹窗/选择器 ----
            showPicker: false,
            pickerColumns: [],

            // ---- 表单 ----
            formData: {},

            // ---- 状态 ----
            noData: false,
            dataOver: false,
        },

        created: function() {
            // 读取 sessionStorage 恢复状态（如有）
        },

        mounted: function() {
            this.getList();
        },

        computed: {
            // 派生状态
        },

        methods: {
            // ---- 工具方法 ----
            getQueryParam: function(name) {
                var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                var r = window.location.search.substr(1).match(reg);
                return r ? decodeURIComponent(r[2]) : null;
            },

            toPage: function(url) {
                window.location.href = url;
            },

            // ---- 数据请求 ----
            getList: function() {
                var that = this;
                var params = {
                    page: that.pageNum,
                    limit: that.pageSize,
                };
                $http(baseUrl.getList, true, params, false)
                    .then(function(res) {
                        // res.data 是数组时追加，否则赋值
                        that.list = that.list.concat(res.data || []);
                        if ((res.data || []).length < that.pageSize) {
                            that.finished = true;
                            that.dataOver = true;
                        } else {
                            that.pageNum++;
                        }
                        that.noData = that.list.length === 0;
                    });
            },

            // ---- 提交 ----
            submit: function() {
                var that = this;
                var params = Object.assign({}, that.formData);
                $.confirm('', '确认提交？', function() {
                    $http(baseUrl.saveData, true, params, false)
                        .then(function(res) {
                            $.toast('提交成功', 'text');
                            setTimeout(function() {
                                window.history.back();
                            }, 1500);
                        });
                });
            },

            // ---- 跳转详情 ----
            toDetail: function(item) {
                var url = 'detail.html?id=' + item.id;
                window.location.href = url;
            },

            // ---- Picker 确认 ----
            onPickerConfirm: function(value) {
                this.formData.xxx = value.val;
                this.showPicker = false;
            },
        },

        watch: {
            // 需要联动时使用
        }
    });
}
```

### JS 骨架说明

| 要素 | 说明 |
|------|------|
| `function initFun()` | **入口函数名固定**，由 HTML 中 `getUserFinish()` 调用 |
| `var vm` | 暴露到全局，便于调试和跨方法引用 |
| `$http(url, loading, params, rawReturn)` | 第4个参数为 `true` 时原样返回 res，`false` 时自动处理 retcode |
| `$.confirm / $.alert / $.toast` | 来自 jquery-weui，不使用原生 `alert/confirm` |
| `sessionStorage` | 用于跨页面状态传递（如 tab 状态回传），不得用于持久存储 |
| `$.parseJSON($.cookie("user")).name` | 获取当前登录用户名（在水印/权限判断时使用） |

---

## 6. $http 接口调用规范

```javascript
// 签名：$http(url, showLoading, params, rawReturn)
// url: 相对路径，base.context 会自动拼接 /aresqywx/
// showLoading: true 显示加载动画，false 不显示
// params: 对象，自动序列化为 JSON
// rawReturn: false = 仅在 retcode==='success' 时 resolve；true = 始终 resolve

// 示例1：标准调用（retcode 自动处理）
$http('module/list.xa', true, { page: 1 }, false)
    .then(function(res) {
        // res.data 是正常数据
    });

// 示例2：需要手动处理 retcode
$http('module/save.xa', true, params, true)
    .then(function(res) {
        if (res.retcode === 'success') { /* 成功 */ }
        else { $.alert('', res.retmsg); }
    });
```

---

## 7. 常见 UI 组件用法

### 7.1 Tab 切换

```html
<!-- HTML -->
<van-tabs v-model="activeTab" @change="onTabChange">
    <van-tab title="标签1"></van-tab>
    <van-tab title="标签2"></van-tab>
</van-tabs>
```

### 7.2 下拉选择器

```html
<!-- HTML -->
<van-popup v-model="showPicker" position="bottom">
    <van-picker
        show-toolbar
        title="请选择"
        item-height="50px"
        :columns="pickerColumns"
        @confirm="onPickerConfirm"
        @cancel="showPicker = false">
    </van-picker>
</van-popup>
```

### 7.3 上拉加载更多

```html
<van-list v-model="loading" :finished="finished" finished-text="已到最底部了" @load="onLoad">
    <div v-for="(item, index) in list" :key="index">
        <!-- 列表项 -->
    </div>
</van-list>
```

### 7.4 时间选择器

```html
<van-popup v-model="showDatePicker" position="bottom">
    <van-datetime-picker
        type="date"
        title="选择日期"
        v-model="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onDateConfirm"
        @cancel="showDatePicker = false">
    </van-datetime-picker>
</van-popup>
```

### 7.5 ActionSheet（底部面板）

```html
<van-action-sheet v-model="showSheet" title="请选择">
    <div class="sheetContent">
        <!-- 内容 -->
        <div class="btnGroup">
            <span @click="onReset">重置</span>
            <span @click="onConfirm">确认</span>
        </div>
    </div>
</van-action-sheet>
```

---

## 8. 登录链路说明

```
页面加载
  └─► getUserInfo.js 执行
        └─► getuserCode() 检查 Session
              ├─► Session 有效 → getUserFinish() ← 业务入口
              │       └─► __canvasWM({ content: username })  // 水印
              │       └─► initFun()                          // 启动 Vue
              └─► Session 无效 → 微信 OAuth2 授权
                    └─► getUserInfo(code) 换取用户信息
                          └─► getUserFinish()
```

**关键约束：**
- `getUserFinish()` 必须在 HTML 内联 `<script>` 中定义，不得移入模块 JS。
- `initFun()` 必须在模块 JS 中定义，不得改名。
- 部分老模块用 `action()` 替代 `initFun()`，新页面统一用 `initFun()`。

---



---

## 10. 新增模块 Checklist

- [ ] 目录放在 `ares/<moduleName>/`，与已有模块同级
- [ ] CSS 放 `css/`，JS 放 `js/`，图片放 `images/`
- [ ] HTML 使用第 4 节骨架，公共 JS 引用路径为 `../common/js/`
- [ ] `getUserFinish()` 内调用水印 + `initFun()`
- [ ] `getUserInfo.js` 放在 `</html>` 前最后一行
- [ ] 接口路径使用相对路径（不含 `/aresqywx/`，由 `base.context` 拼接）
- [ ] 不引入 Vue3 / Vant4 / axios / 工程化构建
- [ ] 版本号写在私有 JS 的 `?v=x.x.x` 参数上，便于缓存刷新
- [ ] vConsole 调试代码上线前注释掉

---

## 10.5 UI 1:1 还原强制策略

- 当任务是根据 `ui/preview`、`ui/index.html`、`ui/assets` 还原页面时，默认必须**从设计稿重新生成目标页面**
- “重新生成”指：先重新提取目标 artboard 规格，再重新产出目标 `html/css/js`，而不是以仓库里已有同名页面为实现起点
- 即使仓库中已经存在同名页面、历史还原稿、`Restore` 页面或旧模块实现，也**只能作为对照参考**，不得直接在其基础上默认续改
- 只有当用户明确表达“接着旧页面改”“复用现有实现继续收口”“不要重写”时，才允许以已有页面为起点
- 如果用户明确指定了目标输出文件，也仍然要把该文件内容按设计稿重新生成，而不是因为该文件已存在就转为增量修补
- 执行 `ui-1to1-restore-flow` 时，必须优先服从本节规则；如与 skill 默认习惯冲突，以本节为准

---

## 11. Skills 安装安全规范

### 11.1 目录职责

- `~/.codex/skills/.system/`：系统内置 skills，只读对待，不作为日常维护目录
- `~/.codex/skills/`：本地自装和自维护 skills 的目录
- 项目根目录下如存在 `.codex/` 软链接，应优先通过该入口查看真实生效目录

### 11.2 安装前必须先做 vet

- 任何来自 GitHub、skills.sh、第三方分享或未知来源的 skill，在安装前**必须先使用 `skill-vetter` 做完整安全审查**
- 没有 vet report，不得直接安装
- 不得只做口头判断、来源猜测或简化检查后直接安装

### 11.3 `skill-vetter` 最低执行要求

- 先确认来源、作者、仓库信誉、最近更新时间
- 安装前阅读该 skill 的全部文件，而不只看 `SKILL.md`
- 检查是否存在联网、凭证读取、敏感目录访问、提权、远程脚本下载、混淆代码等风险
- 评估该 skill 实际需要的文件权限、命令权限和网络权限是否与用途匹配
- 最终必须输出明确的 vet 结论：`SAFE TO INSTALL`、`INSTALL WITH CAUTION` 或 `DO NOT INSTALL`

### 11.4 高风险情形

出现以下任一情况时，不得跳过人工确认：

- 需要读取 `~/.ssh`、`~/.aws`、`~/.config`、cookie、session、token 等敏感信息
- 包含 `curl`、`wget`、远程脚本执行、`eval`、`exec`、base64 解码、混淆代码
- 需要修改工作区外文件、系统配置或申请高权限
- 来源不明、仓库信誉过低、文件内容与宣称用途明显不符

### 11.5 安装执行顺序

安装第三方 skill 时，必须按以下顺序执行：

1. 使用 `find-skills` 或其他方式定位候选 skill
2. 使用 `skill-vetter` 完成完整审查并输出 vet report
3. 仅在 vet 结论允许时，才使用 `skill-installer` 或等效方式安装
4. 安装后再次核对落地目录、`SKILL.md` 和附带脚本

### 11.6 禁止事项

- 不得因为“先装起来再看”而跳过 vet
- 不得因为来源看起来像官方，就省略文件级审查
- 不得在无法完成 vet 的情况下默认继续安装
- 如遇网络或拉取失败，优先说明 vet 未完成，不得把“未审完”表述成“已安全”
