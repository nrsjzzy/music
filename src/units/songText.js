export default function(str) {
	var ddd=str.trim();
	var b = ddd.split("[");
	var arr = [];
	b.forEach(item => {
		arr.push(item.split("]"))
	});
	
	var arr2 = [];
	var obj={}
	arr.forEach(item => {
		if(item[0]=="")return;
		obj[toSecond(item[0])]=func(item[1])
		
		
	});
	return obj
}
function toSecond(str){
	var a=str.split(":");
	var b=parseInt(a[0]*60)+parseFloat(a[1])
	return b.toFixed(1)
	
}
function func(str){
    return str.replace(/[\r\n]/g, '');
}