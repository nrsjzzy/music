<template>
	<div class="detail">
		<ul class="musicList">
			<li v-for="(item,index) in musicList" :key="index" :data-key="index" @click="play(index)">
				<p><img :src="item.imgUrl" /></p>
				<p>{{item.songName}}</p>

			</li>
		</ul>
		<p @click="getMusicList()" style="text-align: center;line-height: 1rem;">更多</p>
		
		<loader v-show="loader"></loader>
		<transition name="fade">
			<router-view/>
		</transition>
	</div>

</template>

<script>
	import axios from "axios";
	import loader from "./loader";
	import {mapState} from "vuex";
	export default {
		data() {
			return {
				loader: false,
				page: 1
			}
		},
		mounted() {
			this.getMusicList();
			
		},
		components: {
			loader
		},
		computed:mapState(["musicList"]),
		methods: {
			getMusicList() {
				this.loader = true;
				setTimeout(() => {
					axios.get('http://localhost:3000/audio?page=' + this.page)
						.then(res => {
							this.$store.commit("UPDATEMUSICLIST",res.data);
							this.loader=false;
							this.page++;
						})
						.catch(function(error) {
							console.log(error);
						});
				}, 1000)

			},
			play(index){
				this.$router.push("music/play");
				this.$store.commit("UPDATECURRENTINDEX",index)
			}
		}
	}
</script>

<style scoped>
	.detail {
		width: 100%;
		height: 100%;
		overflow: hidden;
		font-size: 0.36rem;
		line-height: 0.44rem;
		text-indent: 0.36rem;
	}
	
	.detail .content img {
		display: block;
		max-width: 100%;
		margin: 0 auto;
	}
	.musicList li {
		padding: 0.3rem 0.2rem;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;
	}
	
	.musicList li:after {
		content: '';
		display: block;
		clear: both;
	}
	
	.musicList li p {
		float: left;
	}
	
	.musicList li p:nth-child(1) {
		width: 1rem;
		height: 1rem;
		border-radius: 0.2rem;
		overflow: hidden;
	}
	
	.musicList li p:nth-child(1) img {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.musicList li p:nth-child(2) {
		width: 6.1rem;
		height: auto;
		overflow: hidden;
		padding-left: 0.2rem;
	}
	
	
</style>