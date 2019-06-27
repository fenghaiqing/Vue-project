<template>
	<div id="monitor">
		<el-container>
			<el-main>
				<el-row>
					<div class="head-brand">

					</div>
				</el-row>
				<el-row :gutter="40" style="margin-left: 0px;margin-right: 0px;">
					<el-col :span="9">
						<div class="grid-content bg-purple   main-row">
							<el-row class="border" style="margin-bottom: 20px;">
								<div id="kq" :style="{width: '750px', height: '400px'}"></div>
							</el-row>
							<el-row class="border">
								<el-col :span="8">
									<div id="cd" :style="{width: '260px', height: '380px'}"></div>
								</el-col>
								<el-col :span="8">
									<div id="wd" :style="{width: '260px', height: '380px'}"></div>
								</el-col>
								<el-col :span="8">
									<div id="wc" :style="{width: '260px', height: '380px'}"></div>
								</el-col>

							</el-row>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="user grid-content bg-purple   border">
							<el-row class="border-bottom" v-for="item in tableData">
								<el-col :span="5">
									<div class="img-box">
										<img :src="item.heard" alt="">
									</div>
								</el-col>
								<el-col :span="19">
									<div class="user-info">
										<div class="line">
											<span>{{item.name}}</span>
											<span>{{item.className}}</span>
										</div>
										<div class="line">
											<span>{{item.className}}</span>
											<span>{{item.time}}</span>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</el-col>
					<el-col :span="9">
						<div class="grid-content bg-purple  ">
							<el-row class="border" style="margin-bottom: 20px;">
								<div id="yj" :style="{width: '750px', height: '400px'}"></div>
							</el-row>
							<el-row class="border">
								<el-col :span="8">
									<div id="fq" :style="{width: '260px', height: '380px'}"></div>
								</el-col>
								<el-col :span="8">
									<div id="dq" :style="{width: '260px', height: '380px'}"></div>
								</el-col>
								<el-col :span="8">
									<div id="wm" :style="{width: '260px', height: '380px'}"></div>
								</el-col>

							</el-row>
						</div>
					</el-col>

				</el-row>

			</el-main>
		</el-container>





	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: []
			}
		},
		mounted() {
			this.initCqtj();
			this.initYjtj();
			this.initpie();
		},
		methods: {
			initCqtj() {
				var $this = this;
				var myChart = this.$echarts.init(document.getElementById('kq'));
				var barOption = {
					title: {
						text: '考勤 (单位：人)',
						textStyle: {
							color: '#2997BA'
						},
						top: 10,
						left: 10

					},
					tooltip: {
						textStyle: {
							fontSize: 25
						}
					},
					grid: {
						left: 80
					},
					xAxis: {
						data: [],
						axisLine: {
							lineStyle: {
								color: '#154465',
								width: 2
							}
						},
						axisLabel: {
							fontSize: 20,
							color: '#29AAE3'
						}
					},
					yAxis: {
						axisLine: {
							lineStyle: {
								color: '#154465',
								width: 2
							}
						},
						axisLabel: {
							fontSize: 20,
							color: '#29AAE3'
						},
						splitLine: {
							show: false
						}
					},
					series: [{
						name: '考勤',
						type: 'bar',
						barMaxWidth: 50, //最大宽度
						itemStyle: {
							normal: {
								// 随机显示
								//color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}

								// 定制显示（按顺序）
								color: function(params) {
									var colorList = ['#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ',
										'#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB'
									];
									return colorList[params.dataIndex]
								}
							}
						},
						data: []
					}]
				}
				this.$http.get('/api/src/assets/data/kqtj.json').then((res) => {
					console.log(res);
					barOption.xAxis.data = res.data.xAxisData;
					barOption.series[0].data = res.data.data;
					myChart.setOption(barOption);
					$this.selectUserKqInfo(res.data.xAxisData[0]);
				}).catch((err) => {
					console.log(err)
				});

				myChart.on('click', function(params) {
					$this.selectUserKqInfo(params.name);
				});
			},
			initYjtj() {
				var $this = this;
				var myChart = this.$echarts.init(document.getElementById('yj'));
				var barOption = {
					title: {
						text: '预警 (单位：人)',
						textStyle: {
							color: '#2997BA'
						},
						top: 10,
						left: 10

					},
					tooltip: {
						textStyle: {
							fontSize: 25
						}
					},
					grid: {
						left: 80
					},
					xAxis: {
						data: [],
						axisLine: {
							lineStyle: {
								color: '#154465',
								width: 2
							}
						},
						axisLabel: {
							fontSize: 20,
							color: '#29AAE3'
						},

					},
					yAxis: {
						axisLine: {
							lineStyle: {
								color: '#154465',
								width: 2
							},
						},
						axisLabel: {
							fontSize: 20,
							color: '#29AAE3'
						},
						splitLine: {
							show: false
						}

					},
					series: [{
						name: '预警',
						type: 'bar',
						barMaxWidth: 50, //最大宽度
						itemStyle: {
							normal: {
								// 随机显示
								//color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}

								// 定制显示（按顺序）
								color: function(params) {
									var colorList = ['#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ',
										'#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB'
									];
									return colorList[params.dataIndex]
								}
							}
						},
						data: []
					}]
				}
				this.$http.get('/api/src/assets/data/yjtj.json').then((res) => {
					console.log(res);
					barOption.xAxis.data = res.data.xAxisData;
					barOption.series[0].data = res.data.data;
					myChart.setOption(barOption);
				}).catch((err) => {
					console.log(err)
				});

				myChart.on('click', function(params) {
					$this.selectUserYjInfo(params.name);
				});
			},
			selectUserKqInfo(type) {
				var $this = this;
				this.$http.get('/api/src/assets/data/kqData.json').then((res) => {
					$this.tableData = res.data[type];
				}).catch((err) => {
					console.log(err)
				});
			},
			selectUserYjInfo(type) {
				var $this = this;
				this.$http.get('/api/src/assets/data/yjData.json').then((res) => {
					$this.tableData = res.data[type];
				}).catch((err) => {
					console.log(err)
				});
			},
			initpie() {
				var myChart1 = this.$echarts.init(document.getElementById('cd'));
				var myChart2 = this.$echarts.init(document.getElementById('wd'));
				var myChart3 = this.$echarts.init(document.getElementById('wc'));
				var myChart4 = this.$echarts.init(document.getElementById('fq'));
				var myChart5 = this.$echarts.init(document.getElementById('dq'));
				var myChart6 = this.$echarts.init(document.getElementById('wm'));
				this.$http.get('/api/src/assets/data/pieData.json').then((res) => {
					myChart1.setOption(this.getPieOption('各班级迟到占比', res.data['cdData']));
					myChart2.setOption(this.getPieOption('各班级未到占比', res.data['wdData']));
					myChart3.setOption(this.getPieOption('各班级外出占比', res.data['wcData']));
					myChart4.setOption(this.getPieOption('各班翻墙到占比', res.data['fqData']));
					myChart5.setOption(this.getPieOption('各班级打球占比', res.data['dqData']));
					myChart6.setOption(this.getPieOption('各班级迟到占比', res.data['wmData']));
				}).catch((err) => {
					console.log(err);
				})
			},

			getPieOption(title, data) {
				return {
					title: {
						text: title,
						x: 'center',
						textStyle: {
							color: '#2997BA'
						},
						bottom: 20
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)",
						textStyle: {
							fontSize: 25
						}
					},
					grid: {
						bootom: '40%'
					},
					series: [{
						name: title,
						type: 'pie',
						radius: '55%',
						/* 	center: ['50%', '60%'], */
						data: data,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							},
							normal: {
								fontSize: 20,
								// 随机显示
								//color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
								color: function(params) {
									var colorList = ['#DE5834', '#3498DB'];
									return colorList[params.dataIndex]
								}
							}
						},
						label: {
							normal: {
								fontSize: 18,
								formatter: '{b}\n{d}%',
								position: 'inside'
							}
						}
					}]
				};
			}

		}
	}
</script>

<style>
</style>
