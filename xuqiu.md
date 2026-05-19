1.接口的baseUrl = https://wxapp.dteoc.cn
3.登录页已有接口：

/*<br/> <br/>	点特云小程序商家的客户登录小程序<br/>	接口地址：https://wxapp.dteoc.cn/api/dtylogin<br/>	 <br/>	POST参数：<br/>		 spras:语言;字符串，硬编码 '1'； <br/>		 ltype:登录类型，''-买家登录;'M'-商家登录;字符串； <br/>		 //下面两个参数为买家登录时使用<br/>		 mobile:手机;字符串； <br/>		 smscode:短信验证码;字符串； <br/>		 //下面三个为商家登录时使用<br/>		 mandt:商家ID;字符串； <br/>		 bname:登录账号;字符串； <br/>		 password:登录密码;字符串； <br/>	返回值：<br/>		result:result:ok-成功；error:失败<br/>		result:message：字符串信息，比如错误时的提示信息<br/>		token:返回的token;字符串； <br/>		mandt:商家ID;字符串； <br/>		mtext:商家名称;字符串； <br/> <br/>*/
接口成功信息示例：
{
    "result": {
        "result": "ok",
        "message": "操作成功！"
    }
}
{
    "result": {
        "result": "error",
        "message": "手机号13800138001未存在系统客户列表中，请通知您的上游商家将您的手机登记到客户资料中！"
    }
}
（mobile为空）：
{
    "result": {
        "result": "error",
        "message": "InsertTableZsms:不能将值 NULL 插入列 'mobile'，表 'sapdb.dbo.zsms'；列不允许有 Null 值。INSERT 失败。\n语句已终止。\n"
    }
}


/*<br/> <br/>	点特云小程序商家的客户登录小程序发送验证码<br/>	接口地址：https://wxapp.dteoc.cn/api/dtysendsms<br/>	 <br/>	POST参数：<br/>		 guiver;//版本，XYT3等等，该参数需要在小程序的全局变量里设置，它关系到短信平台要调用哪个模板，<br/>			参见CZthysmsApi::GetSignature和CZthysmsApi::GetTemplateIDValidCode<br/>			如果不传值，则使用通用模板【深圳市点特科技有限公司】<br/>		 mobile:手机号;字符串； <br/>	项目数据：<br/> <br/>	 返回值：<br/>	 result:result:ok-成功；error:失败<br/>	 result:message：字符串信息，比如错误时的提示信息<br/><br/>*/
接口返回信息示例：
{
    "result": {
        "result": "error",
        "message": "验证码不正确！608358:1"
    }
}
{
    "result": {
        "result": "error",
        "message": "手机13800138010尚未发送验证码！"
    }
}