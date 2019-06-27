<template>
	<div id="list">
		<el-container>
			<el-main>
				<el-row>
					<div class="head-brand">
						
					</div>
				</el-row>
				<el-row :gutter="20" class="padding20">
					<el-col :span="6">
						<div class="user-list grid-content bg-purple">
							<el-row class="border-bottom" v-for="item in data1" @click.native="openDilog(item)">
								<el-col :span="5">
									<div class="img-box">
										<img :src="item.heard" alt="">
									</div>
								</el-col>
								<el-col :span="19">
									<div class="user-list-info">
										<div class="line">
											<span class="name">{{item.name}}</span>
											<span class="time">{{item.time}}</span>
										</div>
										<div class="line bz">
											<span class="clzz">{{item.className}}</span>
											<span class="number">{{item.studentNumber}}</span>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="user-list grid-content bg-purple  ">
							<el-row class="border-bottom" v-for="item in data2" @click.native="openDilog(item)">
								<el-col :span="5">
									<div class="img-box">
										<img :src="item.heard" alt="">
									</div>
								</el-col>
								<el-col :span="19">
									<div class="user-list-info">
										<div class="line">
											<span class="name">{{item.name}}</span>
											<span class="time">{{item.time}}</span>
										</div>
										<div class="line bz">
											<span class="clzz">{{item.className}}</span>
											<span class="number">{{item.studentNumber}}</span>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="user-list grid-content bg-purple   ">
							<el-row class="border-bottom" v-for="item in data3" @click.native="openDilog(item)">
								<el-col :span="5">
									<div class="img-box">
										<img :src="item.heard" alt="">
									</div>
								</el-col>
								<el-col :span="19">
									<div class="user-list-info">
										<div class="line">
											<span class="name">{{item.name}}</span>
											<span class="time">{{item.time}}</span>
										</div>
										<div class="line bz">
											<span class="clzz">{{item.className}}</span>
											<span class="number">{{item.studentNumber}}</span>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="user-list grid-content bg-purple ">
							<el-row class="border-bottom" v-for="item in data4" @click.native="openDilog(item)">
								<el-col :span="5">
									<div class="img-box">
										<img :src="item.heard" alt="">
									</div>
								</el-col>
								<el-col :span="19">
									<div class="user-list-info">
										<div class="line">
											<span class="name">{{item.name}}</span>
											<span class="time">{{item.time}}</span>
										</div>
										<div class="line bz">
											<span class="clzz">{{item.className}}</span>
											<span class="number">{{item.studentNumber}}</span>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</el-col>
				</el-row>
		
			</el-main>
			<el-dialog
  :title="title"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="closeDilog"
  >
 <video-player  class="video-player vjs-custom-skin"
     ref="videoPlayer"
     :playsinline="true"
     :options="playerOptions"
	 @pause="onPlayerPause($event)"
	
></video-player>
</el-dialog>

			</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				isClose:false,
				playerOptions : {
						playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
						autoplay: false, //如果true,浏览器准备好时开始回放。
						muted: false, // 默认情况下将会消除任何音频。
						loop: false, // 导致视频一结束就重新开始。
						preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
						language: 'zh-CN',
						aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
						fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
						sources: [{
						  src: '',  // 路径
						},],
						//poster: "/api/src/images/head200x200.jpg", //你的封面地址
						// width: document.documentElement.clientWidth,
						notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
						controlBar: {
						  timeDivider: true,
						  durationDisplay: true,
						  remainingTimeDisplay: false,
						  fullscreenToggle: true  //全屏按钮
						}
				},
				dialogVisible:false,
				data1:[],
				data2:[],
				data3:[],
				data4:[]
			}
		},
		methods:{
			closeDilog(){
				this.dialogVisible=false;
				this.playerOptions.sources=[{src:''}];
				this.playerOptions.poster='';
			},
			openDilog(item){
				this.dialogVisible=true;
				this.playerOptions.sources=[{src:item.video}];
				this.playerOptions.poster=item.poster;
				this.title=item.name;
			},
			initTable(){
				var $this = this;
				this.$http.get('/api/src/assets/data/listData.json').then((res)=>{
					$this.data1=res.data;
					$this.data2=res.data;
					$this.data3=res.data;
					$this.data4=res.data;
				}).catch((err)=>{
					console.log(err);
				})
			}
		},
		mounted(){
			this.initTable();
		}
	}
</script>

<style>
</style>
