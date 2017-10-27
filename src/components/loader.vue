<template>
	<div class="loaderbg">
		<div class="loader"></div>
	</div>

</template>

<script>
	export default {
         
	}
</script>

<style scoped>
	.loaderbg {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.loader{
		width:1.2rem;
		height:1.2rem;
		border-color: white white white transparent;
		border-width: 4px;
		border-style: solid;
		border-radius: 100%;
		position: absolute;
		top:50%;
		left:50%;
		margin-left: -0.6rem;
		margin-top: -0.6rem;
		animation: xuanz 0.7s  linear infinite;
	}
	@-webkit-keyframes xuanz{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	@keyframes xuanz{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	
	
</style>