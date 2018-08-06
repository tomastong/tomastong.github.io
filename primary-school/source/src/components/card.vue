<template>
		<div class="card" 
		:class="{'bounce-enter-active':isActive}"
		:style="cardStyle">
			<div class="preview">
				<img :src="srcUrl" alt="">
			</div>
		</div>
</template>

<script>
	export default {
		name: 'card',
		props: {
			srcUrl: String,
			number: Number
		},
		components: {},
		data() {
			return {
				isActive: false,
				cardStyle: {
					left: Math.floor(Math.random()*1000)+ 'px',
					top: Math.floor(Math.random()*700)+ 'px',
					transform: 'rotate('+Math.floor(Math.random()*90-45) + 'deg)',
				}
			}
		},
		methods: {

		},
		created() {
			setTimeout(()=> {
				this.isActive = true;
			}, this.number * 500)
		},
		destroyed() {
		}
	}
</script>

<style lang="less">
	.card { 
		position: absolute;
		width: 116px;
		height: 156px;
		opacity: 0;
		.preview {
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
				border-radius: 20px;
				margin: 0;
			}

		}
	}
	.bounce-enter-active {
	 	animation: dhy-card 1.5s;
	 	animation-fill-mode: forwards
	}
	@keyframes dhy-card {
	  	0% {
	    	opacity: 0;
	  	}
	  	100% {
	    	opacity: 1;
	  	}
	}
	
</style>