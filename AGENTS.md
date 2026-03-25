# ARES Project Guide

## 项目定位

- 本仓库的核心前端项目是 `ares/`，它不是基于 `npm + 打包工具` 的单体前端工程，而是一个面向企业微信 / 微信生态的移动端静态页面仓库。
- 代码组织方式以业务模块目录为单位，每个模块通常直接维护 `html + css + js + image(s)` 文件。
- 当前仓库同时包含需求和设计输入：
  - `需求.docx`：需求说明
  - `接口.doc`：接口文档
  - `ui/`：设计稿导出物，含 `links/`、`preview/`、`assets/`

## 启动时必须先建立的认知

- 优先把 `ares/` 看成“很多独立 H5 页面集合”，不要按 React / Vue CLI / Vite 项目思路处理。
- 新需求默认先找 `ares/` 中同业务、同页面类型、同交互模式的现有实现参考，再决定修改或仿写。
- 默认保持模块原有技术栈，不主动做 Vue2 到 Vue3、jQuery 到工程化框架、旧 JSSDK 到新架构的迁移。
- 默认不新增 `package.json`、不引入构建链、不重组目录，除非用户明确要求。

## 目录结构约定

### 1. `ares/`

- `ares/` 下每个一级目录通常是一个独立业务模块，例如：
  - `directTransfer/`
  - `complianceCheck/`
  - `netSafetyInspection/`
  - `fmEhr/`
- 常见模块结构：
  - 页面文件：`*.html`
  - 逻辑文件：`js/*.js`
  - 样式文件：`css/*.css`
  - 图片资源：`image/` 或 `images/`
- 有些模块还有二级业务分组目录，例如：
  - `ares/complianceCheck/rectify/`
  - `ares/complianceCheck/randomCheck/`
  - `ares/scoreInterview/firstExamine/`

### 2. `ares/common/`

- 这里是公共依赖与基础能力目录，优先复用，不要在业务模块里重复造轮子。
- 常见公共文件：
  - `ares/common/js/base.js`：域名、上下文、基础工具
  - `ares/common/js/server.js`：统一 AJAX / 上传封装
  - `ares/common/js/jssdk.js`：微信 JSSDK 初始化
  - `ares/common/js/jwxwork.js`、`ares/common/js/jwxworkpro.js`、`ares/common/js/newJwxwork.js`：企业微信能力封装
  - `ares/common/js/getUserInfo.js`：用户会话与登录态获取
  - `ares/common/js/vue.min.js`：Vue2
  - `ares/common/js/vue@3.2.36.js`：Vue3
  - `ares/common/js/vant-2.12.min.js`、`ares/common/js/vant@4.6.3.min.js`：不同版本 Vant

### 3. `ui/`

- `ui/links/`：设计稿切页 HTML
- `ui/preview/`：页面预览图
- `ui/assets/`：设计资源导出
- 当用户要求“按 UI 还原页面”时，先用 `ui/` 做页面映射，再落到 `ares/` 对应模块。

## 技术栈判断规则

### 1. 主流现状

- 仓库内大量页面使用 Vue2。
- 很多旧模块采用 `jQuery + weui/jquery-weui + Vue2 + Vant2` 组合。
- 少量公共文件中已经存在 Vue3 / Vant4，但不能默认整仓已切换。
- 没有发现统一的工程化构建配置，因此页面通常直接通过 `<script>` / `<link>` 相对路径引用资源。

### 2. 开发时的栈选择原则

- 修改旧页面时，严格沿用该页面现有栈和写法。
- 新增页面时，优先沿用所在模块当前主流写法，不要只因为公共目录里有新版本库就切换技术栈。
- 如果模块内已经形成自己的共享文件，例如：
  - `ares/directTransfer/js/shared.js`
  - `ares/directTransfer/js/store.js`
  则优先复用该模块内部公共层，而不是跨模块复制代码。

## 典型页面模式

### 1. 老模块常见模式

- HTML 底部按顺序引入：
  - `../common/js/base.js`
  - `../common/js/jquery-2.1.3.min.js`
  - `../common/js/jquery-weui.min.js`
  - `../common/js/jssdk.js`
  - `../common/js/server.js`
  - 页面自己的 `js/*.js`
  - `../common/js/getUserInfo.js`
- 页面中常定义 `getUserFinish()`，在用户信息获取成功后再初始化页面。
- 常见调用链：
  - `getUserInfo.js` 负责获取登录态
  - `getUserFinish()` 中调用 `initJSSDK(...)`
  - `wx.ready(...)` 内配置企业微信行为
  - 最后执行页面自己的 `initFun()`

### 2. 新一点的独立静态页模式

- 代表模块：`ares/directTransfer/`
- 特征：
  - 直接通过静态 `html + css + js` 搭页面
  - 使用 Vue2 + Vant2
  - 模块内部维护共享逻辑和状态
  - 会补充模块级说明文档，例如 `ares/directTransfer/README.md`

## 开发与修改规则

### 1. 先参考，再实现

- 先找相似模块、相似页面、相似交互。
- 优先复用已有页面骨架、命名风格、资源组织方式、弹层写法、列表写法、详情页写法。
- 若用户给了 `ui/` 导出包，先完成 UI 页面与 `ares` 实际文件的映射。
- 当用户要求“还原页面”“按 UI 出页面”这类任务时，默认新建页面承接还原结果，不直接修改旧页面，除非用户明确要求在原页面上改。

### 2. 目录和命名保持贴近现状

- 页面文件一般直接放在模块目录或模块子目录下。
- JS、CSS、图片资源优先放回各自模块的 `js/`、`css/`、`image/` 或 `images/`。
- 不要随意把老模块改造成全局共享组件目录。

### 3. 相对路径必须谨慎

- 本仓库大量页面位于二级目录甚至三级目录。
- 修改或新增页面时，必须检查 `common/`、`css/`、`js/`、`image/` 的相对路径层级是否正确。
- 例如：
  - 一级模块页面通常使用 `../common/...`
  - 二级子目录页面通常使用 `../../common/...`

### 4. 接口接入遵循现有封装

- 旧模块默认优先使用 `ares/common/js/server.js` 中的 `$http` / `$Upload`。
- 接口地址通常基于 `base.context` 进行拼接。
- 请求头中可能依赖 `X-Token`，不要绕开现有会话逻辑随意重写请求层。

### 5. 企业微信能力不要随意删改

- 如果页面已经使用 `initJSSDK`、`wx.ready`、`initAgentConf`、录音/拍照/上传等能力，修改时要保留原调用链。
- 用户登录态、水印、菜单隐藏、关闭窗口、图片上传、录音识别等逻辑通常属于业务必需，不应因为“看起来旧”就移除。

## 文档与输入源使用优先级

### 1. 代码优先级

- 第一参考：`ares/` 中现有同类页面
- 第二参考：`ui/` 中设计稿导出
- 第三参考：`需求.docx`
- 第四参考：`接口.doc`

### 2. 当信息冲突时

- 页面结构、技术实现细节优先以 `ares/` 现有实现为准。
- 新需求范围、页面增删改优先以 `需求.docx` 为准。
- 字段、接口名、状态码优先以 `接口.doc` 和现有接口调用代码共同确认。
- 不能确定时，明确标注“待确认”，不要把推测写成定论。

## 建议的工作流

1. 先定位目标业务模块，确认是否已有相似页面。
2. 读取对应 `html/css/js` 和公共依赖，判断该模块使用的具体技术栈。
3. 如果有 `ui/`，先做设计稿到页面文件映射。
4. 如果有接口需求，再读取 `接口.doc` 和现有 API 调用。
5. 落地改动时优先小步修改，保持原目录结构和引用方式。
6. 完成后检查页面初始化链、相对路径、资源引用、接口参数、微信能力调用是否完整。

## 验收清单

- 页面引用的 CSS / JS / 图片相对路径正确。
- `initFun()`、`getUserFinish()`、`wx.ready()` 等入口函数链路没有断。
- 若页面依赖登录态或水印，相关公共脚本仍然保留。
- 若页面依赖 URL 参数、`sessionStorage`、模块级共享文件，跨页状态链路保持可用。
- 新增页面时，命名、目录层级、资源组织方式与所在模块一致。
- 没有无必要地引入新框架、新构建工具或大规模重构。

## 明确禁止事项

- 不要默认把项目改成 Vite / Webpack 工程。
- 不要默认把老页面整体重写成 Vue3 或其他框架。
- 不要跨模块复制大量公共代码，除非确认该模块本来就这样组织。
- 不要忽略企业微信登录态、JSSDK、水印、上传、录音等现有业务依赖。

## 已知代表性参考

- `ares/directTransfer/README.md`：模块页面映射和共享文件说明的好例子。
- `ares/common/js/base.js`：全局域名和上下文配置入口。
- `ares/common/js/server.js`：旧模块接口调用封装入口。
- `ares/common/js/getUserInfo.js`：旧模块登录态获取入口。

## 对后续 agent 的执行要求

- 每次进入本仓库，先读本文件，再开始分析任务。
- 回答和实现时默认以 `ares` 现有模式为基准，不按通用现代前端脚手架习惯做主观重构。
- 做页面开发、样式调整、接口接入、文档整理时，都要优先引用当前仓库已有实现作为依据。
- 当任务类型已有匹配的子 agent 时，默认优先实际调用对应子 agent 执行，而不是仅在主线程里“按该 agent 的流程”处理。
- 子 agent 选择遵循现有配置：
  - `ui-agent`：UI 还原、页面搭建、样式收口、前端交互落地
  - `api-agent`：接口文档阅读、字段映射、接口对接准备
  - `doc-agent`：需求整理、页面映射、流程拆解、开发文档补充
  - `review-agent`：代码 review、风险扫描、回归点检查
  - `test-agent`：测试验证、验收、自测和问题复现
  - `orchestrator-agent`：需要多子 agent 协同时的任务统筹与分派
- 只有在以下情况才可以不优先调用对应子 agent：
  - 用户明确要求主线程直接处理
  - 任务只是极小的只读确认，调用子 agent 反而增加额外开销
  - 仓库中不存在与该任务匹配的子 agent 配置
