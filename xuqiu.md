订单页接口：
接口1：
/*
 
	获取订单列表
	接口地址：https://wxapp.dteoc.cn/api/dtygetsdolist
	 
	POST参数：
		
		如果没有登录，就不允许进入订单列表查询界面，所以下面两个参数必需要传递一个
		 telno:手机号，必需的，不登录或者不传递就搜不到数据
		 token:token;字符串；可以为空，没有登录就不传递


		 mandt:商家ID;字符串，可为空值； 
		 spras:语言;字符串； 
		 wxflg:单据来源，‘’-商家；‘X'-自助；‘A’-所有;字符串； 
		 datef:开始日期;字符串； 
		 datet:结束日期;字符串； 
		 keyword:关键字;字符串； 
		 lfstka:未交货 'X'-是；''-否;字符串； 
		 lfstkb:部分交货 'X'-是；''-否;字符串； 
		 lfstkc:完全交货 'X'-是；''-否;字符串； 
		 lfstkx:不需交货 'X'-是；''-否;字符串； 
		 page:当前页;从0开始的整数； 
		 pagesize:分页时每页的记录数量;整数； 
	返回的项目数据：
		 mandt:商家ID;字符串；删除订单时要取这个值
		 vbeln:订单号;字符串； 
		 lfstk:交货状态A-未交货;B-部分交货；C-全部交货;字符串； 
		 wxflg:单据来源，''-商家开单；X-自助开单;字符串； 
		 erdat:开单日期;字符串； 
		 ertim:开单时间;字符串； 
		 menge:数量;字符串； 
		 netwr:金额;字符串； 
		 mtext:商家;字符串； 

		 子项目：
			 modnm:货号；
			 url:图片网址；
 
*/
接口2：
/*

根据账套、单号取回销售订单
接口地址：https://wxapp.dteoc.cn/api/dtygetsdo
有两种参数传递方式：

一、POST参数：
mandt:商家ID、账套;字符串；
spras:语言;字符串；
vbeln:订单号;字符串；

二、口令参数：
客户端通过CreateWXAppParam将参数传递到服务器生成并返回一个口令，将口令拼接在接口后面即可，一般用来作为分享链接，比如：
https://wxapp.dteoc.cn/api/dtygetsdo/bH1dAZE3cZ


返回的项目数据：

*/


在线测试网址：
https://01022.hk/zh/post.html

//HTTP接口调用
https://wxapp.dteoc.cn/api/dtygetsdo

POST参数
{"mandt":"607340","vbeln":"10000063"}

 
//JSON数据树状展示
https://www.bejson.com/jsonviewernew/


使用POST参数
{"mandt":"607340","vbeln":"10000063"}
接口2返回的数据结构示例：
{
    "result": {
        "mandt": "607340",
        "mtext": "深圳市点特科技有限公司",
        "stras": "广东省深圳市南山区数字文化产业基地",
        "picurl1": "https://jxccloudimages.dteoc.com/607340/3956A071-8491-4693-BC41-FD8B1593CC36.jpg",
        "picurl2": "https://jxccloudimages.dteoc.com/607340/8C8334C1-0784-440c-92CC-87A1B66BE2DA.png",
        "picurl3": "https://jxccloudimages.dteoc.com/607340/9C4A7E4A-D97B-4e8a-9665-E3E6E002A2F9.png",
        "logourl": "https://jxccloudimages.dteoc.com/607340/9A87EDA4-11E8-4cea-8C1E-402D6AC9E520.png",
        "wechat": "dasdfasdfasdf",
        "telno": "18520877350",
        "header_count": "5",
        "header_list": [
            {
                "item_count": "1",
                "item_list": [
                    {
                        "type": "S",
                        "label_text": "销售单",
                        "value_text": "",
                        "tip_text": "",
                        "align": "center",
                        "width": "420"
                    }
                ]
            },
            {
                "item_count": "1",
                "item_list": [
                    {
                        "type": "A",
                        "label_text": "客户:",
                        "value_text": "崔炯",
                        "tip_text": "",
                        "align": "left",
                        "width": "1050"
                    }
                ]
            },
            {
                "item_count": "1",
                "item_list": [
                    {
                        "type": "A",
                        "label_text": "批号",
                        "value_text": "10000063",
                        "tip_text": "",
                        "align": "left",
                        "width": "600"
                    }
                ]
            },
            {
                "item_count": "2",
                "item_list": [
                    {
                        "type": "A",
                        "label_text": "日期:",
                        "value_text": "2026-03-25",
                        "tip_text": "",
                        "align": "left",
                        "width": "500"
                    },
                    {
                        "type": "A",
                        "label_text": "时间:",
                        "value_text": "字段systm在单据中无值！",
                        "tip_text": "",
                        "align": "left",
                        "width": "800"
                    }
                ]
            },
            {
                "item_count": "1",
                "item_list": [
                    {
                        "type": "A",
                        "label_text": "接单状态：",
                        "value_text": "",
                        "tip_text": "",
                        "align": "left",
                        "width": "600"
                    }
                ]
            }
        ],
        "goods_count": "2",
        "goods_list": [
            {
                "modnr": "500283",
                "modnm": "丫香",
                "stext": "0317芳香鞋垫",
                "pic_url": "https://jxccloudimages.dteoc.com/608396/40A33205-414F-48e1-905D-E01392E2582A.jpg",
                "mseht": "袋",
                "bhflg": "",
                "waerst": "RMB",
                "has_color": "true",
                "size_count": "6",
                "size_list": [
                    {
                        "sznmr": "00",
                        "sztxt": "34"
                    },
                    {
                        "sznmr": "01",
                        "sztxt": "35"
                    },
                    {
                        "sznmr": "02",
                        "sztxt": "36"
                    },
                    {
                        "sznmr": "03",
                        "sztxt": "37"
                    },
                    {
                        "sznmr": "04",
                        "sztxt": "38"
                    },
                    {
                        "sznmr": "05",
                        "sztxt": "39"
                    }
                ],
                "colors": {
                    "color_count": "3",
                    "color_list": [
                        {
                            "crtxt": "黑色",
                            "price": "1.25",
                            "sizes": {
                                "size_list": [
                                    {
                                        "menge": "100"
                                    },
                                    {
                                        "menge": "110"
                                    },
                                    {
                                        "menge": "120"
                                    },
                                    {
                                        "menge": "130"
                                    },
                                    {
                                        "menge": "150"
                                    },
                                    {
                                        "menge": "200"
                                    }
                                ]
                            }
                        },
                        {
                            "crtxt": "黄色",
                            "price": "1.25",
                            "sizes": {
                                "size_list": [
                                    {
                                        "menge": ""
                                    },
                                    {
                                        "menge": "210"
                                    },
                                    {
                                        "menge": "220"
                                    },
                                    {
                                        "menge": ""
                                    },
                                    {
                                        "menge": "250"
                                    },
                                    {
                                        "menge": "200"
                                    }
                                ]
                            }
                        },
                        {
                            "crtxt": "红色",
                            "price": "1.25",
                            "sizes": {
                                "size_list": [
                                    {
                                        "menge": "300"
                                    },
                                    {
                                        "menge": "310"
                                    },
                                    {
                                        "menge": ""
                                    },
                                    {
                                        "menge": "330"
                                    },
                                    {
                                        "menge": ""
                                    },
                                    {
                                        "menge": "300"
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                "modnr": "500265",
                "modnm": "南极",
                "stext": "5双装除臭混色鞋垫",
                "pic_url": "https://jxccloudimages.dteoc.com/608396/59B92030-0789-4117-93F3-438DEC83C552.jpg",
                "mseht": "袋",
                "bhflg": "",
                "waerst": "RMB",
                "has_color": "true",
                "size_count": "5",
                "size_list": [
                    {
                        "sznmr": "06",
                        "sztxt": "40"
                    },
                    {
                        "sznmr": "07",
                        "sztxt": "41"
                    },
                    {
                        "sznmr": "08",
                        "sztxt": "42"
                    },
                    {
                        "sznmr": "09",
                        "sztxt": "43"
                    },
                    {
                        "sznmr": "10",
                        "sztxt": "44"
                    }
                ],
                "colors": {
                    "color_count": "3",
                    "color_list": [
                        {
                            "crtxt": "黑色",
                            "price": "1.30",
                            "sizes": {
                                "size_list": [
                                    {
                                        "menge": "200"
                                    },
                                    {
                                        "menge": "220"
                                    },
                                    {
                                        "menge": "230"
                                    },
                                    {
                                        "menge": "240"
                                    },
                                    {
                                        "menge": "250"
                                    }
                                ]
                            }
                        },
                        {
                            "crtxt": "黄色",
                            "price": "1.30",
                            "sizes": {
                                "size_list": [
                                    {
                                        "menge": ""
                                    },
                                    {
                                        "menge": "330"
                                    },
                                    {
                                        "menge": ""
                                    },
                                    {
                                        "menge": "250"
                                    },
                                    {
                                        "menge": ""
                                    }
                                ]
                            }
                        },
                        {
                            "crtxt": "粉色",
                            "price": "1.30",
                            "sizes": {
                                "size_list": [
                                    {
                                        "menge": "500"
                                    },
                                    {
                                        "menge": ""
                                    },
                                    {
                                        "menge": "600"
                                    },
                                    {
                                        "menge": ""
                                    },
                                    {
                                        "menge": "800"
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ],
        "footer_count0": "4",
        "footer_list0": [
            {
                "item_count": "2",
                "item_list": [
                    {
                        "type": "A",
                        "label_text": "入库：",
                        "value_text": "字段menges在单据中无值！",
                        "tip_text": "",
                        "align": "left",
                        "width": "600"
                    },
                    {
                        "type": "A",
                        "label_text": "出库：",
                        "value_text": "字段mengeh在单据中无值！",
                        "tip_text": "",
                        "align": "left",
                        "width": "600"
                    }
                ]
            },
            {
                "item_count": "2",
                "item_list": [
                    {
                        "type": "A",
                        "label_text": "本单付：",
                        "value_text": "字段prtskje在单据中无值！",
                        "tip_text": "",
                        "align": "left",
                        "width": "1200"
                    },
                    {
                        "type": "A",
                        "label_text": "本单欠：",
                        "value_text": "0",
                        "tip_text": "",
                        "align": "left",
                        "width": "600"
                    }
                ]
            },
            {
                "item_count": "2",
                "item_list": [
                    {
                        "type": "A",
                        "label_text": "上欠",
                        "value_text": "0",
                        "tip_text": "",
                        "align": "left",
                        "width": "1200"
                    },
                    {
                        "type": "A",
                        "label_text": "总欠:",
                        "value_text": "字段prtzqk在单据中无值！",
                        "tip_text": "",
                        "align": "left",
                        "width": "600"
                    }
                ]
            },
            {
                "item_count": "1",
                "item_list": [
                    {
                        "type": "A",
                        "label_text": "备注：",
                        "value_text": "",
                        "tip_text": "",
                        "align": "left",
                        "width": "1100"
                    }
                ]
            }
        ],
        "footer_count1": "5",
        "footer_list1": [
            {
                "item_count": "1",
                "item_list": [
                    {
                        "type": "S",
                        "label_text": "电话:0755-83044322 小娟:13612678876(微信) 手机:13899870090",
                        "value_text": "",
                        "tip_text": "",
                        "align": "left",
                        "width": "1100"
                    }
                ]
            },
            {
                "item_count": "1",
                "item_list": [
                    {
                        "type": "S",
                        "label_text": "地址：深圳南油服装批发市场103栋2楼314",
                        "value_text": "",
                        "tip_text": "",
                        "align": "left",
                        "width": "700"
                    }
                ]
            },
            {
                "item_count": "1",
                "item_list": [
                    {
                        "type": "S",
                        "label_text": "交行：6222600310007768379 户名：刘",
                        "value_text": "",
                        "tip_text": "",
                        "align": "left",
                        "width": "700"
                    }
                ]
            },
            {
                "item_count": "1",
                "item_list": [
                    {
                        "type": "S",
                        "label_text": "农行：6228480088993221575 户名：刘",
                        "value_text": "",
                        "tip_text": "",
                        "align": "left",
                        "width": "700"
                    }
                ]
            },
            {
                "item_count": "1",
                "item_list": [
                    {
                        "type": "S",
                        "label_text": "工行：6212263301099879531 户名：刘",
                        "value_text": "",
                        "tip_text": "",
                        "align": "left",
                        "width": "700"
                    }
                ]
            }
        ],
        "footer_count2": "1",
        "footer_list2": [
            {
                "item_count": "2",
                "item_list": [
                    {
                        "type": "S",
                        "label_text": "https://itunes.apple.com/cn/app/dian-te-jin-xiao-cun-fu-zhuang/id1003023938?",
                        "value_text": "",
                        "tip_text": "支付宝1",
                        "align": "left",
                        "width": "250"
                    },
                    {
                        "type": "S",
                        "label_text": "https://itunes.apple.com/cn/app/dian-te-jin-xiao-cun-fu-zhuang/id1003023938?",
                        "value_text": "",
                        "tip_text": "微信1",
                        "align": "left",
                        "width": "250"
                    }
                ]
            }
        ],
        "latest_count": "3",
        "latest_list": [
            {
                "mandt": "607340",
                "modnr": "500829",
                "modnm": "899",
                "stext": "灰色花朵除臭鞋垫",
                "picurl": "https://jxccloudimages.dteoc.com/608396/2EFECB0F-E763-4198-8785-4DE148CB0534.jpg"
            },
            {
                "mandt": "607340",
                "modnr": "500071",
                "modnm": "十里",
                "stext": "神医十里香鞋",
                "picurl": "https://jxccloudimages.dteoc.com/608396/ED69E13D-8866-4684-94F3-C472C0223EB6.jpg"
            },
            {
                "mandt": "607340",
                "modnr": "500135",
                "modnm": "老牛",
                "stext": "竹炭鞋垫",
                "picurl": "https://jxccloudimages.dteoc.com/608396/0C2DF6B9-649F-45c8-83F5-4DBE543851D7.jpg"
            }
        ],
        "best_count": "1",
        "best_list": [
            {
                "mandt": "607340",
                "modnr": "500459",
                "modnm": "木乃",
                "stext": "灰色爆米花鞋",
                "picurl": "https://jxccloudimages.dteoc.com/608396/06ABCBB9-D126-44e4-BD88-4CF08FAAC778.jpg"
            }
        ]
    }
}
