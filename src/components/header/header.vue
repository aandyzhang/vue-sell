<template>
  <div class="header">
    <div class="header-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar">
			</div>
		<div class="content">
			<div class="title">
				<span class="brand"></span>
				<span class="name">{{seller.name}}</span>
			</div>
			<div class="description">
				{{seller.description}}/{{seller.deliveryTime}}分钟送达
			</div>
			<div class="supports" v-if="seller.supports">
				<span class="icon" :class="classMap[seller.supports[0].type]"></span>
				<span class="text">{{seller.supports[0].description}}</span>
			</div>
		</div>
		<div class="count" v-if="seller.supports" @click="showdetail">
			<span class="num">{{seller.supports.length}}个</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
    </div>
    <div class="gonggao-wrapper" @click="showdetail">
			<span class="gonggao-left"></span><span class="gonggao-center">{{seller.bulletin}}</span>
			<span class="gonggao-right icon-keyboard_arrow_right"></span>
    </div>
    <transition name="fade">
			<div class="detailShow" v-show="detailShow">
				<div class="detail-wrapper clearfix">
						<div class="detail-main">
							<div class="detail-title">{{seller.name}}</div>
							<div class="star">
								<star :size="24" :score="3.5"></star>	
							</div>
							<div class="title">
								<div class="line"></div>
								<div class="info">优惠信息</div>
								<div class="line"></div>
							</div>
							<div class="youhui">
								<ul v-if="seller.supports" class="supports">
									<li v-for="(item,index) in seller.supports" class="supports-item">
										<span class="icon" :class="classMap[seller.supports[index].type]"></span>
										<span class="text">{{seller.supports[index].description}}</span>
									</li>
								</ul> 
							</div>
							<div class="title">
								<div class="line"></div>
								<div class="info">商家公告</div>
								<div class="line"></div>
							</div>
							<div class="bulletin">
								{{seller.bulletin}}
							</div>
						</div>
				</div>
				<div class="detail-close" @click="closedetail">
					<i class="icon-close"></i>
				</div>
    </div>
    </transition>
    <div class="background">
		<img height="100%" width="100%" :src="seller.avatar" alt="">
    </div>
  </div>
</template>

<script>
	import star from 'components/star/star';
  export default {
  	data(){
  		return {
  			detailShow:false
  		}
  	},
  	components:{
  		star
  	},
  	methods:{
  		showdetail(){
  			this.detailShow=true
  		},
  		closedetail(){
  			this.detailShow=false
  		}
  	},
  	created(){
  		this.classMap=['decrease','discount','special','invoice','guarantee'];
  	},
  	props:{
  		seller:{
  			type:Object,
  			default:{},
  		}
  	}
  }
</script>

<style>
	.header{
		position: relative;
		background: rgba(7,17,27,0.5);
		overflow: hidden;
	}
	.background{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index:-1;
		filter: blur(10px);
	}
	.header-wrapper{
		padding:24px 12px 18px 24px;
		font-size: 0;
		color: #fff;
		position: relative;
	}
	.header-wrapper .avatar{
		display: inline-block;
		vertical-align: top;
	}
	.header-wrapper .avatar img{
		border-radius: 2px;
	}
	.header-wrapper .content{
		display: inline-block;
		font-size: 16px;
		margin-left: 16px;
	}
	.header-wrapper .content .title{
		font-weight: bold;
		margin:2px 0px 8px 0px;
	}
	.header-wrapper .content .title .brand{
		display: inline-block;
		vertical-align: top;
		height: 18px;
		width: 30px;
		background: url('brand@2x.png') no-repeat;
		background-size:30px 18px;
	}
	.header-wrapper .content .title .name{
		line-height: 18px;
		margin-left: 6px;
	}
	.header-wrapper .content .description{
		font-size: 12px;
		font-weight: 200;
		line-height: 12px;
		margin-bottom: 10px;
	}
	.header-wrapper .content .supports{
		font-size: 10px;
		line-height: 12px;
		font-weight: 200;
	}
	.header-wrapper .content .supports .icon{
		margin-right:4px;
		display: inline-block;
		height: 12px;
		width: 12px;
		vertical-align: top;
	}
	.header-wrapper .content .supports .text{
		vertical-align: top;
		line-height: 12px;
		font-size:10px;
	}
	.header-wrapper .content .supports .decrease{
		vertical-align: top;
		background: url('decrease_1@2x.png') no-repeat;
		background-size:12px 12px;
	}
	.header-wrapper .content .supports .discount{
		background: url('discount_1@2x.png') no-repeat;
		background-size:12px 12px;
	}
	.header-wrapper .content .supports .special{
		background: url('special_1@2x.png') no-repeat;
		background-size:12px 12px;
	}
	.header-wrapper .content .supports .guarantee{
		background: url('guarantee_1@2x.png') no-repeat;
		background-size:12px 12px;
	}
	.header-wrapper .content .supports .invoice{
		background: url('invoice_1@2x.png') no-repeat;
		background-size:12px 12px;
	}
	.header .count{
		position: absolute;
		right: 12px;
		bottom: 14px;
		height: 24px;
		text-align: center;
		padding: 0px 8px; 
		line-height: 24px;
		border-radius: 14px;
		color: #fff;
		background: rgba(0,0,0,0.2);
	}
	.header .count .num{
		vertical-align: top;
		font-size: 10px;
	}
	.header .count .icon-keyboard_arrow_right{
		line-height: 24px;
		margin-left: 2px;
		font-size: 12px;
	}
	.header .gonggao-wrapper{
		 height: 28px;
		 padding:0px 22px 0px 12px;
		 position: relative;
		 font-size: 10px;
		 line-height: 28px;
		 color: #fff;
		 background: rgba(7,17,27,0.2);
		 overflow: hidden;
		 white-space: nowrap;
		 text-overflow: ellipsis;
	}
	.header .gonggao-wrapper .gonggao-left{
		vertical-align: top;
		height: 12px;
		width: 22px;
		margin-top: 8px;
		display: inline-block;
		background: url('bulletin@2x.png') no-repeat;
		background-size:22px 12px;
	}
	.header .gonggao-wrapper .gonggao-center{
		 vertical-align: top;
		 margin: 0px 4px;
		 height: 28px;
		 line-height: 28px;
		 font-weight: 200;
	}
	.header .gonggao-wrapper .gonggao-right{
		position: absolute;
		bottom: 6px;
		right: 12px;
		margin-left:4px;
	}
	.header .detailShow{
		position: fixed;
		z-index: 100;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		overflow: auto;
		color: #fff;
		opacity: 1;
		background: rgba(7,17,27,0.8);
		backdrop-filter:blur(10px);
	}
	.fade-enter-active,.fade-leave-active{
  	transition: all 0.5s;
	}
  .fade-enter,.fade-leave-active{
		opacity: 0;
		background: rgba(7,17,27,0);
	}
	.header .detailShow .detail-wrapper{
		min-height: 100%;
		width: 100%;
	}
	.header .detailShow .detail-wrapper .detail-main{
		margin-top: 64px;
		padding-bottom: 64px;
	}
	.header .detail-close{
		height: 32px;
		width: 32px;
		position: relative;
		margin:-64px auto 0px auto;
		clear: both;
		font-size: 32px;
	}
	.header .detail-close .icon-close{
		line-height: 32px;
		color: rgba(255,255,255,0.5);
		cursor: pointer;
	}
	.clearfix{
		display: inline-block;
	}
	.clearfix:after{
		content: '';
		height: 0;
		display: block;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}
	.detail-title{
		font-size: 16px;
		font-weight: 700;
		line-height: 16px;
		text-align: center;
	}
	.detail-main .star{
		text-align: center;
		margin-top: 16px;
	}
	.detail-main .title{
		display: flex;
		width: 80%;
		margin:28px auto 24px auto;
	}
	.detail-main .title .line{
		flex: 1;
		position: relative;
		top: -6px;
		margin:0px 5px;
		border-bottom: 1px solid rgba(255,255,255,0.2);
	}
	.detail-main .title .info{
		/*padding:0px 12px;*/
		font-weight: 700;
		font-size: 14px;
	}
	.youhui{
		width: 80%;
		margin:0px auto;
	}
	.supports-item{
		padding: 0px 12px;
		margin-bottom: 12px;
		font-size: 0px;
		font-weight: 200;
		line-height: 12px;
	}
	.supports-item .icon{
		height: 12px;
		width: 12px;
		padding-right:6px;
		display: inline-block;
		vertical-align: top;
	}
	.supports-item .text{
		font-size: 12px;
		/*vertical-align: top;*/
	}
	.supports-item .icon.decrease{
		vertical-align: top;
		background: url('decrease_1@2x.png') no-repeat;
		background-size:12px 12px;
	}
	.supports-item .icon.discount{
		background: url('discount_1@2x.png') no-repeat;
		background-size:12px 12px;
	}
		.supports-item .icon.special{
		background: url('special_1@2x.png') no-repeat;
		background-size:12px 12px;
	}
		.supports-item .icon.guarantee{
		background: url('guarantee_1@2x.png') no-repeat;
		background-size:12px 12px;
	}
	.supports-item .icon.invoice{
		background: url('invoice_1@2x.png') no-repeat;
		background-size:12px 12px;
	}
	.bulletin{
		padding:0px 12px;
		margin:0 auto;
		width: 80%;
		font-size: 12px;
		font-weight: 200;
		line-height: 24px;
	}
</style>
