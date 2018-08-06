<template>
	<div class="fall">
		<div v-for="(item, index) in picArr">
			<card :srcUrl="'../../static/' + item + '.jpeg'" :number="index"></card>
		</div>
	</div>
</template>

<script>
	import card from './card'
	import bus from '@/common/bus'
	export default {
		name: 'fall',
		props: {
			pictures: {
				type: Array
			}
		},
		computed: {
			picArr() {
				let arr = [];
				this.pictures.map((item, i) => {
					arr.push(item[0].src);
					arr.push(item[1].src);
				})
				return arr;
			}
		},
		components: { card },
		created() {
			let self = this;
			setTimeout(() => {
				bus.$emit('done', {});
			}, self.picArr.length * 500) 
		}
	}
</script>

<style lang="less">
	.fall {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden; 
	}



</style>