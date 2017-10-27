import vue from "vue";
import vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
vue.use(vuex);
const state = {
	musicList:[],
	currentIndex:0
}
export default new vuex.Store({
	state,
	actions,
	mutations,
	getters
});