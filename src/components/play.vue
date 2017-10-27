<template>
	<div>
		<div class="music-play">
			<div class="music-kaiguan " :class="{onplay:playMusic}">
				<img src="../assets/needle-plus.png" />
			</div>
			<div class="music-yuanpan">
				<div class="music-img" :class="{onplay:playMusic}">
					<img :src="onplayImg" alt="" />
				</div>
			</div>
			<div class="songText">
				<ul>
					<li style="font-size: 0.32rem;">{{text3}}</li>
					<li style="color: white;">{{text1}}</li>
					<li style="font-size: 0.32rem;">{{text2}}</li>
				</ul>

			</div>
			<div class="processbg">
				<div class="process" style="width:20%" ref="process">

				</div>
			</div>
			<div class="controls">
				<img src="../assets/play_prev.png" @click="prevMusic()" />
				<img src="../assets/play_pause.png" @click.stop="startorclose()" v-if="playMusic" />
				<img src="../assets/play_play.png" @click.stop="startorclose()" v-if="!playMusic" />
				<img src="../assets/play_next.png" @click="nextMusic()" />
			</div>
		</div>
		<pop :popObj="popObj"></pop>
		<audio :src="url" controls="controls" autoplay v-on:timeupdate="showTime()" ref="audio" style="display: none;"></audio>
	</div>

</template>

<script>
	import change from "../units/songText";
	import pop from "./pop";
	import { mapState } from "vuex";
	export default {
		data() {
			return {

				url: "",
				playMusic: false,
				onplayImg: "",
				text1: "",
				text2: "",
				text3: "",
				timeLength: 0,
				popObj: {
					popText: "",
					isPop: false
				}

			}
		},

		components: {
			pop
		},

		computed: mapState(["musicList", "currentIndex"]),

		methods: {

			play() {
				this.url = "http://localhost:3000/audio/" + this.musicList[this.currentIndex].songId + ".m4a";
				this.playMusic = true;
				this.songTextList = change(this.musicList[this.currentIndex].songText)
				this.onplayImg = this.musicList[this.currentIndex].imgUrl;
				this.timeLength = this.musicList[this.currentIndex].timeLength;
				this.timeArr=[];
				let timeArr = [];
				this.currentTimeIndex = 0;
				for(let i in this.songTextList) {
					timeArr.push(i)
				}
				this.timeArr = timeArr;
				console.log(this.songTextList);
				console.log(this.timeArr)

			},

			showTime() {
				if(!this.$refs.audio) return;
				let time = this.$refs.audio.currentTime;
				let bfb = (time / this.timeLength) * 100;
				this.panduan(time.toFixed(1));
				this.$refs.process.style.width = bfb + "%";

			},

			startorclose() {
				this.playMusic = !this.playMusic;
				this.playMusic ? this.$refs.audio.play() : this.$refs.audio.pause();
			},

			panduanold(time) {
				return;
				var len = this.songTextList.length;
				for(var i = 0; i < len; i++) {
					var ddd = i + 1;
					if(i == len - 1) {
						ddd = i;
					}
					if(time >= this.songTextList[i].time && time <= this.songTextList[ddd].time) {
						this.text1 = this.songTextList[i].text;
						this.text2 = this.songTextList[ddd].text;
					}
				}
			},

			panduan(time) {
				
				if(parseFloat(time) >= parseFloat(this.timeArr[this.currentTimeIndex])) {
					this.text3 = this.songTextList[this.timeArr[this.currentTimeIndex - 1]] ? this.songTextList[this.timeArr[this.currentTimeIndex - 1]] : "";
					this.text1 = this.songTextList[this.timeArr[this.currentTimeIndex]];
					this.text2 = this.songTextList[this.timeArr[this.currentTimeIndex + 1]];
					this.currentTimeIndex++;
					
				}
			},

			prevMusic() {
				if(this.currentIndex == 0) {
					this.pop("已经是第一首歌了");
					return;
				}
				let id = this.currentIndex - 1;
				this.$store.commit("UPDATECURRENTINDEX", id);
				this.play()
			},

			nextMusic() {
				if(this.currentIndex == this.musicList.length - 1) {
					this.pop("已经是最后一首歌了");;
					return
				};
				let id = this.currentIndex + 1;
				this.$store.commit("UPDATECURRENTINDEX", id);
				this.play();
			},

			pop(str) {
				this.popObj.popText = str;
				this.popObj.isPop = true;
				setTimeout(() => {
					this.popObj.isPop = false;
				}, 3000)
			}
		},

		mounted() {
			this.play()
		}
	}
</script>

<style scoped>
	.music-play {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom right, rgb(12, 34, 47), rgb(95, 99, 111));
		/*background-image: url(../assets/m-muisc-bg.jpg);*/
		background-size: 100% 100%;
		background-repeat: no-repeat;
		padding-top: 5.5rem;
	}
	
	.music-kaiguan {
		position: absolute;
		width: 1.2rem;
		height: 1.65rem;
		top: 0;
		left: 45%;
		z-index: 2;
		transform: rotate(-20deg);
		transition: transform 0.5s linear;
		transform-origin: top left;
	}
	
	.music-kaiguan img {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.music-kaiguan.onplay {
		transform: rotate(0deg);
	}
	
	.music-yuanpan {
		width: 4.2rem;
		height: 4.2rem;
		position: absolute;
		z-index: 1;
		background-image: url(../assets/disc_default.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		border-radius: 100%;
		top: 1rem;
		left: 50%;
		margin-left: -2.1rem;
		padding: 0.75rem;
	}
	
	.music-yuanpan .music-img {
		width: 2.7rem;
		height: 2.7rem;
		border-radius: 100%;
		overflow: hidden;
		background-color: white;
	}
	
	.music-yuanpan .music-img img {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.music-yuanpan .music-img.onplay {
		animation: circling 20s 0.5s infinite linear;
	}
	
	.music-button {
		display: inline-block;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 100%;
		overflow: hidden;
	}
	
	.music-button img {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	@keyframes circling {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	.songText {
		width: 6rem;
		margin: 0 auto;
		height: 3rem;
		overflow: hidden;
		font-size: 0.38rem;
	}
	
	.songText li {
		padding: 0.2rem 0;
		text-align: center;
	}
	
	.controls {
		padding: 0.1rem;
		overflow: hidden;
		margin: 0 auto;
		text-align: center;
	}
	
	.controls img {
		display: inline-block;
		width: 0.9rem;
		height: 0.9rem;
	}
	
	.controls img:nth-child(2) {
		width: 1.2rem;
		height: 1.2rem;
		margin: 0 0.8rem;
	}
	
	.processbg {
		color: white;
		position: relative;
		width: 5.4rem;
		height: 0.1rem;
		background: #6c6b70;
		margin: 0.8rem auto;
	}
	
	.process {
		position: absolute;
		width: 10px;
		height: 100%;
		background: #3195fd;
		top: 0;
		left: 0;
	}
</style>