//index.js
//获取应用实例
const app = getApp()

let morseCodes = require('../../data/staticData.js')
var str0 = ""
var touchStartTime = 0
var touchEndTime = 0
var codes = ""
var transToEn = ""
var counter = 0

Page({
	data: {
		pos:{},
		setting:{},
		userInfo:"",
		hasPossed:false,
		hasUserInfo:true,
		// oneCharacterCode:str1,//存储读到的单个0/1
		// transToEnCharacter:str2,//存储单个字母
		transVacabulary:str0,//存储单词，并传输到模板
  	},
  	//悬浮菜单处理函数
  	menuMain:function(){
		if (!this.data.hasPopped) {
			this.popp()
			this.setData({
				hasPopped: true,
			})
		} else {
			this.takeback()
			this.setData({
				hasPopped: false,
			})
		}
	},
	menuOne: function () {//提供回删一个字符功能
		str0 = str0.substring(0,str0.length-1)
		this.setData({transVacabulary:str0})
	},
  	menuTwo:function(){//提供空格功能
	  	str0 += ' '
		this.setData({transVacabulary:str0})
  	},
  	menuThree:function(){
		this.menuMain()
		wx.navigateTo({
			url: '/pages/dict/dict',
		})
  	},
  	menuFour:function(){//删除各种字符
		codes = ""
		transToEn = ""
		str0 = ""
		this.setData({transVacabulary:str0})
  	},
	//按钮收缩功能
	popp() {
		let animationMain = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		let animationOne = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		let animationTwo = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		let animationThree = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		let animationFour = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		animationMain.rotateZ(180).step()
		animationOne.translate(-20, -50).rotateZ(360).opacity(1).step()
		animationTwo.translate(-70, -30).rotateZ(360).opacity(1).step()
		animationThree.translate(-70, 30).rotateZ(360).opacity(1).step()
		animationFour.translate(-20,50).rotateZ(360).opacity(1).step()
		this.setData({
			animationMain: animationMain.export(),
			animationOne: animationOne.export(),
			animationTwo: animationTwo.export(),
			animationThree: animationThree.export(),
			animationFour: animationFour.export(),
		})
	},
	takeback() {
		let animationMain = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		let animationOne = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		let animationTwo = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		let animationThree = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		let animationFour = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		animationMain.rotateZ(0).step();
		animationOne.translate(0, 0).rotateZ(0).opacity(0).step()
		animationTwo.translate(0, 0).rotateZ(0).opacity(0).step()
		animationThree.translate(0, 0).rotateZ(0).opacity(0).step()
		animationFour.translate(0,0).rotateZ(0).opacity(0).step()
		this.setData({
			animationMain: animationMain.export(),
			animationOne: animationOne.export(),
			animationTwo: animationTwo.export(),
			animationThree: animationThree.export(),
			animationFour: animationFour.export(),
		})
	},


	//点击事件函数
	touchStart:function(e){
		this.touchStartTime = e.timeStamp
	},
	touchEnd:function(e){
		this.touchEndTime = e.timeStamp
	},
	
	morseJudge:function(e){
		console.log("test start")
		if(this.touchEndTime - this.touchStartTime < 350){
			console.log("点")
			codes += '0'
			console.log(codes)
		} else if (this.touchEndTime - this.touchStartTime < 1000){
			console.log("长按")
			codes += '1'
			console.log(codes)
		} else{
			for(var i = 0; i<morseCodes.morse.length;){
				if(codes == morseCodes.morse[i].code){
					transToEn = morseCodes.morse[i].chara
					str0 += transToEn
					console.log(transToEn)
					this.setData({ transVacabulary: str0 })
					codes = ""
					transToEn = ""
					console.log("转译")
					break
				}
				i++
				counter = i

			}
			if(counter == morseCodes.morse.length){
				console.log("无")
				wx.showToast({
					title: "fail",
					icon: 'loading',
					duration: 1000,
					mask: true
				})
				codes = ""
				transToEn = ""
			}
		}
	},

})
