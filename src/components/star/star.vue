<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in detailStar" class="star-item" :class="itemClass"></span>
	</div>
</template>

<script>
  const LEIGHT=5;
  const CLS_ON='on';
  const CLS_OFF='off';
  const CLS_HALF="half";
  export default {
    props:{
    	size:{
    		type:Number,
    	},
    	score:{
    		type:Number
    	}
    },
    computed:{
    	starType(){
    		return 'star-'+this.size
    	},
    	detailStar(){
    		let result=[];
    		let score=Math.floor(this.score * 2 )/2;
    		let decimal=score % 1 !==0;
    		let intval=Math.floor(score);
    		for(let i=0;i<intval;i++){
    			result.push(CLS_ON);
    		}
    		if(decimal){
    			result.push(CLS_HALF);
    		}
    		while(result.length < LEIGHT){
    			result.push(CLS_OFF);
    		}
    		return result;
    	}
    }
  }
</script>

<style>
	.star{
		font-size: 0;
	}
	.star .star-item{
		display: inline-block;
		margin:0px 8px;
	}
	.star-24 .half{
		height: 20px;
		width: 20px;
		background: url('star24_half@2x.png') no-repeat;
		background-size: 20px 20px;
	}
	.star-24 .off{
		height: 20px;
		width: 20px;
		background: url('star24_off@2x.png') no-repeat;
		background-size: 20px 20px;
	}
	.star-24 .on{
		height: 20px;
		width: 20px;
		background: url('star24_on@2x.png') no-repeat;
		background-size: 20px 20px;
	}
</style>
