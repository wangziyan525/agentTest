var baseUrl = {
  queryKjzgByOrgUrl: "lsteData/queryKjzgByOrg.xa", //临时提额根据机构号或机构名称查询会计主管
  uploadUrl: "lsteData/uploadPhotoData.xa", //
  commitDataUrl: "lsteData/commitData.xa", //预约信息接口
  queryDetailUrl: "lsteData/queryDetail.xa", //列表查询
  downPhotoDataUrl: "lsteData/downPhotoData.xa",
};
var max_img_size = 15 * 1024 * 1024;
var vm;
function initFun() {
  vm = new Vue({
    el: "#app",
    data: {
      //渠道
      channel: "",
      //页面
      page: 1,
      // 弹窗显示状态
      showPopup: false,
      showCustomPicker: false,
      // 搜索关键字
      searchKey: "",
      PrimKeyId: "",
      customText: "",
      reasonInput: "",
      custom: "",
      detailData: {},
      role: "",
      showList: [],
      // 已选择的项
      selectedItem: {
        name: "",
        org: "",
      },
      // 默认显示的列表（当前运营经理）
      defaultList: [],
      org: "",
      //客户经理信息
      isExpand: false,
      managerInfo: {},
      operaterManagerList: [],
      operaterManagerInfo: {},
      //临时提额原因
      reason: "",
      reasonText: "",
      showReasonPicker: false,
      singleable: false,
      reasonList: ["购房需要", "购车需要", "就医需要", "其他需要"],
      customList: ["是", "否"],
      reasonListMap: {
        购房需要: 1,
        购车需要: 2,
        就医需要: 3,
        其他需要: 4,
      },
      //上传的图片列表
      imageList: [],
      //表单数据
      formData: {
        customerName: "",
        idCard: "",
        cardLast4: "",
        customerPhone: "",
        singleLimit: "", //单笔转出限额(原始值)
        singleLimitDisplay: "", //单笔转出限额(千分位显示)
        dailyCount: "", //日累计转出笔数
        dailyLimit: "", //日累计转出限额(原始值)
        dailyLimitDisplay: "", //日累计转出限额(千分位显示)
        monthlyCount: "", //月累计转出笔数
        monthlyLimit: "", //月累计转出限额(原始值)
        monthlyLimitDisplay: "", //月累计转出限额(千分位显示)
      },
      uploadImage: "",
      //结果数据
      resultData: {},
    },
    computed: {
      // fileNameStr(){
      //     return this.imageList.map(function(item){return  item.fileName;}).filter(function(name){return  name;}).join(",")
      // }
    },
    created() {
      // 从URL获取来源
      const urlParams = new URLSearchParams(window.location.search);
      this.PrimKeyId = urlParams.get("PrimKeyId");
    },
    mounted() {
      if (this.PrimKeyId) {
        this.queryDetail();
      }
      this.queryKjzgByOrg("0", "");
    },
    methods: {
      //处理金额失去焦点，格式化为千分位
      handleAmountBlur(event, field) {
        //兼容queryDetail中只传field的调用
        if (typeof event === "string") {
          field = event;
          event = null;
        }
        var value = this.formData[field];
        if (value) {
          var num = parseFloat(value);
          if (isNaN(num) || num <= 0) {
            this.formData[field] = "";
            this.formData[field + "Display"] = "";
            return;
          }
          //保留原始数值（去除前导零）
          this.formData[field] = num.toString();
          //千分位格式化显示
          var formatted = this.formatThousands(value);
          //先置空再nextTick设置，强制Vue更新DOM
          var self = this;
          this.formData[field + "Display"] = "";
          this.$nextTick(function () {
            self.formData[field + "Display"] = formatted;
          });
        }
      },
      async queryDetail() {
        //TODO: 调用接口获取数据
        await $http(
          baseUrl.queryDetailUrl,
          true,
          {
            PrimKeyId: this.PrimKeyId,
          },
          true
        ).then(async (res) => {
          if (res.retcode == "success") {
            this.detailData = res.data;
            this.formData.customerName = this.detailData.clientNm;
            this.formData.idCard = this.detailData.identNum;
            this.formData.cardLast4 = this.detailData.crdNum;
            this.formData.customerPhone = this.detailData.mblNo;
            this.formData.singleLimit = this.detailData.snglTfrLmt;
            this.formData.dailyCount = this.detailData.dlyAcmltnTfrQnty;
            this.formData.dailyLimit = this.detailData.dlyAcmltnTfrLmt;
            this.formData.monthlyCount = this.detailData.monAcmltnTfrQnty;
            this.formData.monthlyLimit = this.detailData.monAcmltnTfrLmt;
            this.reason = this.detailData.tempUpgdLmtCs;
            if (this.reason == 1) {
              this.reasonText = "购房需要";
            } else if (this.reason == 2) {
              this.reasonText = "购车需要";
            } else if (this.reason == 3) {
              this.reasonText = "就医需要";
            } else if (this.reason == 4) {
              this.reasonText = "其他需要";
            }
            await this.handleAmountBlur("singleLimit");
            await this.handleAmountBlur("dailyLimit");
            await this.handleAmountBlur("monthlyLimit");
            const arr = res.data.prvMtr.split(",").map((item) => item.trim());
            this.showList = await this.getFileBase64(arr);
          } else {
            $.alert("", res.retmsg, function () {
              wx.closeWindow();
            });
          }
        });
      },
      //遍历查询base64
      async getFileBase64(fileArray) {
        const result = [];
        for (const file of fileArray) {
          let params = {};
          params.filename = file;
          const res = await $http(baseUrl.downPhotoDataUrl, true, params, true);
          if (res.retcode == "success") {
            this.imageList.push({
              url: "data:image/jpeg;base64," + res.data,
              serverId: "",
              fileName: params.filename,
              uploading: true,
            });
            result.push({ ...file, base64: res.data });
          } else {
            $.alert("", res.retmsg, function () {
              if (res.retcode == "-1") {
                wx.closeWindow();
              }
            });
          }
        }
        return result;
      },
      handleCount(field) {
        var value = this.formData[field];
        if (value) {
          this.formData[field] = parseInt(value, 10).toString();
        }
      },
      //照片上传方法
      //添加图片
      handleAddImage() {
        var that = this;
        //计算还能上传几张
        var remainCount = 5 - this.imageList.length;
        if (remainCount <= 0) {
          vant.Toast("最多只能上传5张图片");
          return;
        }
        //调用微信选择图片
        wx.chooseImage({
          count: 1, //最多可选数量
          sizeType: ["original", "compressed"], //可选原图或压缩图
          sourceType: ["album", "camera"], //可选相册或相机
          success: function (res) {
            var localIds = res.localIds; //返回选定照片的本地ID列表
            //逐个上传图片
            that.uploadImages(localIds, 0);
          },
          fail: function (err) {
            console.log("选择图片失败", err);
          },
        });
      },
      //递归上传图片
      uploadImages(localIds, index) {
        var that = this;
        if (index >= localIds.length) {
          return;
        }
        var localId = localIds[index];
        //先校验图片大小，再上传
        wx.getLocalImgData({
          localId: localId,
          success: function (res) {
            var localData = res.localData;
            var base64Data = localData;
            if (base64Data.indexOf('base64,') !== -1) {
              base64Data = base64Data.split('base64,')[1];
            }
            //base64转换为近似字节大小
            var sizeInBytes = base64Data.length * 3 / 4;
            if (sizeInBytes > max_img_size) {
              vant.Toast('图片大小不能超过15MB');
              //跳过该图片，继续上传下一张
              that.uploadImages(localIds, index + 1);
              return;
            }
            //大小校验通过，执行上传
            that.doUploadImage(localId, localIds, index);
          },
          fail: function () {
            //获取图片数据失败，仍然尝试上传
            that.doUploadImage(localId, localIds, index);
          }
        });
      },
      //执行单张图片上传
      doUploadImage(localId, localIds, index) {
        var that = this;
        //先添加到列表展示，状态为上传中
        var imgIndex = this.imageList.length;
        this.imageList.push({
          url: localId,
          localId: localId,
          serverId: "",
          fileName: "",
          uploading: true,
        });
        //调用wx.uploadImage上传到微信服务器
        wx.uploadImage({
          localId: localId,
          isShowProgressTips: 1, //显示进度提示
          success: function (res) {
            var serverId = res.serverId; //返回图片的服务器端ID
            //更新serverId
            that.$set(that.imageList, imgIndex, {
              ...that.imageList[imgIndex],
              serverId: serverId,
            });
            //调用后台接口上传serverId获取图片名称
            that.uploadToServer(serverId, imgIndex);
          },
          fail: function (err) {
            console.log("上传图片到微信服务器失败", err);
            that.$set(that.imageList, imgIndex, {
              ...that.imageList[imgIndex],
              uploading: false,
              uploadError: true,
            });
          },
          complete: function () {
            //继续上传下一张
            that.uploadImages(localIds, index + 1);
          },
        });
      },
      //上传serverId到后台服务器
      async uploadToServer(serverId, imgIndex) {
        await $http(
          baseUrl.uploadUrl,
          true,
          {
            mediaId: serverId,
          },
          true
        ).then((res) => {
          if (res.retcode == "success") {
            this.$set(this.imageList, imgIndex, {
              ...this.imageList[imgIndex],
              fileName: res.data || "",
              uploading: false,
            });
          } else {
            $.alert("", res.retmsg, function () {
              wx.closeWindow();
            });
          }
        });
      },
      //删除图片
      handleDeleteImage(index) {
        this.imageList.splice(index, 1);
      },
      //点击图片预览
      handlePreviewImage(index) {
        var currentImg = this.imageList[index];
        wx.previewImage({
          current: currentImg.localId,
          urls: this.imageList.map(function (item) {
            return item.localId;
          }),
        });
      },
      //金额输入页面方法
      //返回上一页
      handleBack() {
        window.history.back();
      },
      showTips() {
        vant.Dialog.alert({
          title: "提示",
          message:
            "临时提额额度（单笔、日累计、月累计）不能超过客户账户余额，请核对后提交！",
        }).then(function () {
          const myinput = document.getElementById("myinput");
          myinput.focus();
        });
      },

      //处理金额输入(只允许数字和小数点)
      handleAmountInput(event, field) {
        var value = event.target.value;
        //移除非数字和小数点的字符
        value = value.replace(/[^\d.]/g, "");
        //只保留第一个小数点
        var parts = value.split(".");
        if (parts.length > 2) {
          value = parts[0] + "." + parts.slice(1).join("");
        }
        //整数部分最多9位（小于10亿）
        parts = value.split(".");
        if (parts[0].length > 9) {
          parts[0] = parts[0].substring(0, 9);
          value = parts.length === 2 ? parts[0] + "." + parts[1] : parts[0];
        }
        //限制小数点后最多两位
        if (parts.length === 2 && parts[1].length > 2) {
          value = parts[0] + "." + parts[1].substring(0, 2);
        }
        //更新原始值
        this.formData[field] = value;
        //更新显示值(输入时不格式化，失去焦点后格式化)
        this.formData[field + "Display"] = value;
        //强制更新输入框
        event.target.value = value;
      },

      handleComplete() {
        window.location.replace(`list.html?channel=1`);
      },
      //处理笔数输入(只允许整数)
      handleCountInput(event, field) {
        var value = event.target.value;
        //只保留数字
        value = value.replace(/[^\d]/g, "");
        //最多4位数字（小于1万）
        if (value.length > 4) {
          value = value.substring(0, 4);
        }
        //更新值
        this.formData[field] = value;
        //强制更新输入框
        event.target.value = value;
      },
      //格式化为千分位
      formatThousands(value) {
        if (!value) return "";
        var num = parseFloat(value);
        if (isNaN(num)) return "";
        //固定保留两位小数
        var formatted = num.toFixed(2);
        var parts = formatted.split(".");
        //整数部分添加千分位分隔符
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      },
      //转换为大写金额
      formatChineseAmount(value) {
        if (!value) return "";
        var num = parseFloat(value);
        if (isNaN(num) || num === 0) return "";

        var chineseDigits = [
          "零",
          "壹",
          "贰",
          "叁",
          "肆",
          "伍",
          "陆",
          "柒",
          "捌",
          "玖",
        ];
        var chineseUnits = ["", "拾", "佰", "仟"];
        var chineseBigUnits = ["", "万", "亿"];

        //处理整数部分
        var integerPart = Math.floor(num);
        var decimalPart = Math.round((num - integerPart) * 100);

        var result = "";

        //转换整数部分
        if (integerPart === 0) {
          result = "";
        } else {
          var intStr = integerPart.toString();
          var len = intStr.length;
          var zeroFlag = false;

          for (var i = 0; i < len; i++) {
            var digit = parseInt(intStr[i]);
            var position = len - i - 1;
            var unitIndex = position % 4;
            var bigUnitIndex = Math.floor(position / 4);

            if (digit === 0) {
              zeroFlag = true;
              if (unitIndex === 0 && bigUnitIndex > 0) {
                result += chineseBigUnits[bigUnitIndex];
              }
            } else {
              if (zeroFlag) {
                result += "零";
                zeroFlag = false;
              }
              result += chineseDigits[digit] + chineseUnits[unitIndex];
              if (unitIndex === 0 && bigUnitIndex > 0) {
                result += chineseBigUnits[bigUnitIndex];
              }
            }
          }
          result += "元";
        }

        //处理小数部分
        if (decimalPart === 0) {
          if (integerPart > 0) {
            result += "整";
          }
        } else {
          var jiao = Math.floor(decimalPart / 10);
          var fen = decimalPart % 10;
          if (jiao > 0) {
            result += chineseDigits[jiao] + "角";
          } else if (integerPart > 0) {
            result += "零";
          }
          if (fen > 0) {
            result += chineseDigits[fen] + "分";
          }
        }

        return result;
      },
      //确认提交
      handleSubmit() {
        if (!this.formData.singleLimit) {
          vant.Toast("请输入单笔转出限额");
          return;
        }
        if (!this.formData.dailyCount) {
          vant.Toast("请输入日累计转出笔数");
          return;
        }
        if (!this.formData.monthlyCount) {
          vant.Toast("请输入月累计转出笔数");
          return;
        }
        if (!this.formData.monthlyLimit) {
          vant.Toast("请输入月累计转出限额");
          return;
        }
        if (!this.formData.dailyLimit) {
          vant.Toast("请输入日累计转出限额");
          return;
        }
        if (
          Number(this.formData.singleLimit) > Number(this.formData.dailyLimit)
        ) {
          vant.Toast("单笔转出限额不得大于日累计转出限额");
          return;
        }
        if (
          Number(this.formData.dailyLimit) > Number(this.formData.monthlyLimit)
        ) {
          vant.Toast("日累计转出限额不得大于月累计转出限额");
          return;
        }
        if (
          Number(this.formData.dailyCount) > Number(this.formData.monthlyCount)
        ) {
          vant.Toast("日累计转出笔数不得大于月累计转出笔数");
          return;
        }

        this.submit();
      },
      //搜索运营经理方法
      // 返回上一页
      handleBack() {
        window.history.back();
      },
      // 打开弹窗
      openPopup() {
        this.showPopup = true;
      },
      // 关闭弹窗
      closePopup() {
        this.showPopup = false;
        this.searchKey = "";
      },
      // 搜索处理
      handleSearch() {
        (this.operaterManagerList = []),
          this.queryKjzgByOrg("1", this.searchKey);
        // 搜索逻辑通过 computed 属性 filteredList 实现
      },
      // 清空搜索
      clearSearch() {
        this.searchKey = "";
      },
      // 选择项
      selectItem(item) {
        this.operaterManagerInfo = item;
        this.selectedItem.name = item.name;
        this.showPopup = false;
      },

      // 临时提额根据机构号或机构名称查询会计主管
      async queryKjzgByOrg(type, org) {
        this.defaultList = [];
        await $http(
          baseUrl.queryKjzgByOrgUrl,
          true,
          {
            org: org,
          },
          true
        ).then((res) => {
          if (res.retcode == "success") {
            this.managerInfo = res.data.manager;
            if (res.data.managerData.length > 0) {
              this.operaterManagerInfo = res.data.managerData[0];
              this.operaterManagerList = res.data.managerData;
              this.selectedItem.name = res.data.managerData[0].name;
            }
          } else {
            $.alert("", res.retmsg, function () {
              wx.closeWindow();
            });
          }
        });
      },
      //提交
      submit() {
        var fileNameStr = this.imageList
          .map(function (item) {
            return item.fileName;
          })
          .filter(function (name) {
            return name;
          })
          .join(",");
        let params = {
          ClientNm: this.formData.customerName, //客户姓名
          IdentNum: this.formData.idCard, //证件号码
          CrdNum: this.formData.cardLast4, //卡号
          MblNo: this.formData.customerPhone, //手机号码
          TempUpgdLmtCs: this.reasonListMap[this.reason], //临时提额原因
          SnglTfrLmt: this.formData.singleLimit, //单笔转出限额
          DlyAcmltnTfrQnty: this.formData.dailyCount, //日累计转出笔数
          DlyAcmltnTfrLmt: this.formData.dailyLimit, //日累计转出限额
          MonAcmltnTfrQnty: this.formData.monthlyCount, //月累计转出笔数
          MonAcmltnTfrLmt: this.formData.monthlyLimit, //月累计转出限额
          PrvMtr: fileNameStr, //证明材料
          approveuser: this.operaterManagerInfo.name, //审批人姓名
          approvehumancode: this.operaterManagerInfo.humancode, //审批人员工号
          IsAudPass: this.custom, //审批人员工号
          lsteyychannel: "0", //预约渠道
          lsteyytype: "0", //预约类型 0-临时提额预约
        };
        if ((this.reason = "4")) {
          params.OthrCs = this.reasonInput;
        }
        $http(baseUrl.commitDataUrl, true, params, true).then((res) => {
          if (res.retcode == "success") {
            //结果数据
            this.resultData = res.data;
            this.page = 3;
          } else {
            $.alert("", res.retmsg, function () {
              wx.closeWindow();
            });
          }
        });
      },
      //返回上一页
      handleBack() {
        window.history.back();
      },
      //展开/收起客户经理信息
      handleToggle() {
        this.isExpand = !this.isExpand;
      },
      //选择临时提额原因
      handleSelectReason() {
        this.showReasonPicker = true;
      },
      //选择营销客户
      handleSelectCustom() {
        this.showCustomPicker = true;
      },
      //确认选择原因
      chooseNth(val) {
        this.nth = val;
        this.showNth = false;
      },
      handleReasonSelect(val) {
        this.showReasonPicker = false;
        this.reason = val;
        this.reasonText = val;
      },
      handleCustomSelect(val) {
        this.showCustomPicker = false;
        this.customText = val;
        if (val == "是") {
          this.custom = "1";
        } else {
          this.custom = "0";
        }
      },
      //关闭原因选择弹窗
      handleReasonClose() {
        this.showReasonPicker = false;
      },
      //关闭是否营销客户选择弹窗
      handleCustomClose() {
        this.showCustomPicker = false;
      },
      //身份证校验码验证
      checkIdCardCode(idCard) {
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var parity = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
        var sum = 0;
        for (var i = 0; i < 17; i++) {
          sum += parseInt(idCard.charAt(i)) * factor[i];
        }
        var checkCode = parity[sum % 11];
        return checkCode === idCard.charAt(17).toUpperCase();
      },
      //确认提交
      handleConfirm() {
        //表单验证
        if (!this.formData.customerName) {
          vant.Toast("请输入客户姓名");
          return;
        }
        if (!this.formData.idCard) {
          vant.Toast("请输入证件号码");
          return;
        }
        if (!this.formData.cardLast4) {
          vant.Toast("请输入卡号后4位");
          return;
        }
        if (this.formData.cardLast4.length != 4) {
          vant.Toast("请输入4位卡号");
          return;
        }
        if (!this.formData.customerPhone) {
          vant.Toast("请输入客户手机号码");
          return;
        }
        if (!this.custom) {
          vant.Toast("请选择是否营销客户");
          return;
        }
        if (!this.reason) {
          vant.Toast("请选择临时提额原因");
          return;
        }
        if (this.imageList.length == 0) {
          vant.Toast("请上传证明材料");
          return;
        }

        // 手机号码校验
        var reg = /^1[3-9]\d{9}$/;
        if (!reg.test(this.formData.customerPhone)) {
          vant.Toast("客户手机号码格式不正确");
          return;
        }
        var reg1 = /^\d{4}$/;
        if (!reg1.test(this.formData.cardLast4)) {
          vant.Toast("卡号后四位格式不正确");
          return;
        }
        if (!this.formData.idCard) {
          vant.Toast("请输入证件号码");
          return;
        }
        if (this.reasonText == "其他需要") {
          if (!this.reasonInput) {
            vant.Toast("其他需要输入不能为空");
            return;
          } else if (this.reasonInput.length < 5) {
            vant.Toast("其他需要输入不能少于5个字");
            return;
          }
        }
        //18位身份证正则
        var reg2 =
          /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
        if (!reg2.test(this.formData.idCard)) {
          vant.Toast("证件号码格式不正确");
          return;
        }
        //校验码验证
        if (!this.checkIdCardCode(this.formData.idCard)) {
          vant.Toast("证件号码不合法");
          return;
        }
        this.page = 2;
      },
    },
  });
}
