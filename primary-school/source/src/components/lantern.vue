<template>
	<div class="lantern">
		<el-carousel :interval="4000" type="card" height="400px">
    		<el-carousel-item v-for="item in pictures" >
		      	<div class="img-item" v-for="elem in item" >
		      		<img :src="'../../static/' + elem.src + '.jpeg'" alt="">	
		      		<p class="stuname" v-html="elem.name"></p>
		      	</div>
		    </el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default {
		name: 'lantern',
		props: {
			pictures: {
				type: Array
			}
		},
		components: {},
		data() {
			return {
				
			}
		}
	}
</script>


<style lang="less">
	.lantern {
		margin-top: 100px;
		position: relative;
		.el-carousel__item{ 
			display: flex;
			.img-item {
				flex: 1;
				border-radius: 20px;
				img {
					width: 100%;
					height: 100%;
					border-radius: 20px;
					margin: 0;
				}
				.stuname {
					margin-top: -50px;
					height: 50px;
					text-shadow: 0 0 5px #fff;
					font-size: 24px;
					font-weight: 500;
				}
			}
		}
		.el-carousel__mask {
			opacity: .6;
		}
		.el-carousel__item h3 {
		    color: #475669;
		    font-size: 14px;
		    opacity: 0.75;
		    line-height: 200px;
		    margin: 0;
	  	}
	  
	  	.el-carousel__item:nth-child(2n) {
	    	/*background-color: #99a9bf;*/
	    	opacity: 1;
	  	}
	  
	  	.el-carousel__item:nth-child(2n+1) {
	    	/*background-color: #d3dce6;*/
	    	opacity: 1;
		}
	}
	@media screen and (max-width: 480px) {
		.lantern {
			margin-top: 180px;
		}
    	.el-carousel__item {
    		width: 300px;
    		height: 260px;
    	}
    	.el-carousel__container {
    		margin-left: -50px;
    		height: 300px !important;
    	}
    	.el-carousel__indicators,
    	.el-carousel__arrow {
			display: none;
    	}
	}
</style>