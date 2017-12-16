//防止IE不吃console.log
function log(d,e){
    try {
        console.log(d,e);
    }catch(e){ }
};
//2個經緯度坐標,計算直線距離
//Calculate distance between two points with latitude and longitude coordinates
function distance(lat1,lon1,lat2,lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
	Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	if (d>1) return Math.round(d)+"km";
	else if (d<=1) return Math.round(d*1000)+"m";
	return d;
};
//Base64解密
function decodeBase64(s){
    var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
    var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for(i=0;i<64;i++){e[A.charAt(i)]=i;}
    for(x=0;x<L;x++){
        c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
        while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
    }
    return r;
};
//即時預覽圖片
function change_photo(){

	console.log($(this).val());

	FileReader = window.FileReader;
	var  ext = $(this).val().split('.').pop().toLowerCase();
	var  clip = $(this).parent().find("img");

	if ($.inArray(ext, ['png', 'jpg', 'jpeg']) == -1){
		$(this).val("");
		alert('只允許上傳PNG或JPG影像檔');
		return false;
	}
	if(FileReader){
		var reader = new FileReader(),
		file = this.files[0];
		reader.onload = function(e){
			var _v = e.target.result;
			clip.attr("src", e.target.result);
		};
		reader.readAsDataURL(file);
	}else{
		path = $(this).val();
		clip.attr("src", path);
	}
}
//過濾符號
function inputFilter(msg){
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	str = msg.replace(/[&<>"']/g, function(m) { return map[m]; });
	return str;
}