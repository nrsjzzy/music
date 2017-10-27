import Vue from 'vue'
import Router from 'vue-router'
import music from "../components/music"

import play from "../components/play"
Vue.use(Router)
export default new Router({
	routes: [{
		path: '/music',
		name: 'music',
		component: music,
		children:[{
			path:'play',
			name:"play",
			component:play
		}]
	},
	{
		path: '/',
		redirect:"/music"
	}]
})