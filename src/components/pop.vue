<template>
	<div class="popbg" :class="{on:popObj.isPop}">
		<div class="pop">
			{{popObj.popText}}
		</div>
	</div>

</template>

<script>
	export default {
		 name:"pop",
         props:["popObj"]
        
	}
</script>

<style scoped>
	.popbg {
		position: fixed;
		padding: 0.2rem;
		overflow: hidden;
		top:50%;
		left:50%;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		transform:translate(-50%,-50%);
		transition: opacity .6s linear;
		z-index: 100;
		opacity: 0;
		visibility: hidden;
		border-radius: 0.1rem;
		
	}
	.popbg.on{
		visibility: visible;
		opacity: 1;
	}
	.popbg .pop{
		text-align: center;
		font-size: 0.32rem;
	}
	
	
</style>