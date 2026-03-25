
function checkPhone(phoneNum) {
    // 手机号码校验
    var reg = /^1[0-9]{10}$/;
    if (phoneNum && !reg.test(phoneNum)) {
        return vant.Toast('手机号格式不正确');
    }
}
 //校验身份证号
 function validateIdCard(idCard) {
    if (!idCard) {
      return vant.Toast('请输入身份证号');  
    }
    //18位身份证正则
    var reg = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
    if (!reg.test(idCard)) {
         return vant.Toast('身份证号格式不正确');  
    }
    //校验码验证
    if (!this.checkIdCardCode(idCard)) {
        return vant.Toast('身份证号不合法');  
    }
    return { valid: true, msg: "" };
  }
  //身份证校验码验证
  function checkIdCardCode(idCard) {
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    var sum = 0;
    for (var i = 0; i < 17; i++) {
      sum += parseInt(idCard.charAt(i)) * factor[i];
    }
    var checkCode = parity[sum % 11];
    return checkCode === idCard.charAt(17).toUpperCase();
  }