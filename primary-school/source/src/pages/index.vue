<template>
	<div class="wrap">
		<transition name="fade">
			<lantern :pictures="pictures" v-show="showLantern"></lantern>
		</transition>
		<transition name="fall">
			<fall :pictures="pictures" v-show="!showLantern"></fall>
		</transition>
		<audio :src="'../../static/mp3/'+music+'.mp3'"
			autoplay="autoplay"
			loop="loop"></audio>
	</div>
</template>

<script>
	
	import lantern from '@/components/lantern';
	import fall from '@/components/fall';
	import bus from '@/common/bus'
	export default {
		name: 'index',
		components: { lantern, fall},
		data() {
			return {
				showLantern: false,
				music: 'qingchunjiniance',
				pictures: [

					[{src:'qinhuiyun', name: '秦慧云'}, {src:'qinjiafeng', name : '秦加封'}],
					[{src:'qinlinlin', name: '秦林林'}, {src:'qinnannan', name : '秦楠楠'}],
					[{src:'qinyabin', name: '秦亚斌'}, {src:'qinyaoxia', name : '秦瑶霞'}],
					[{src:'donghongyan', name: '董红岩'}, {src:'wangwen', name: '王雯'}],
					[{src:'qinyongkai', name: '秦永凯'}, {src:'wangfangfang', name : '王芳芳'}],
					[{src:'wangwei', name: '王薇'}, {src:'qinchangqi', name : '秦长旗'}],
					[{src:'wangzhanying', name: '王占营'}, {src:'yuanbingfang', name : '原冰芳'}],
					[{src:'qinjinling', name: '秦金玲'}, {src:'qinkangjun', name : '秦康君'}],
					[{src:'yuanchongchong', name: '原冲冲'}, {src:'qinxiaojie', name : '秦小杰'}],
					[{src:'yuanjie', name: '原洁'}, {src:'yuanxinxin', name : '原鑫鑫'}],
					[{src:'yuanyan', name: '原燕'}, {src:'yuanhuaqing', name : '原华庆'}],
				]
			}
		},
		created() {
			let self = this;
			bus.$on('done', function() {
				setTimeout(() => {
					self.showLantern = true;
				}, 1000) 
			})
		}
	}
</script>

<style>
	.wrap {
			.fade-enter-active,
			.fade-leave-active {
				transition: opacity .5s;
			}
			.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
			  	opacity: 0;
			},
			.fall-enter-active,
			.fall-leave-active {
				transition: opacity .5s;
			}
			.fall-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
			  	opacity: 0;
			}
	}
</style>