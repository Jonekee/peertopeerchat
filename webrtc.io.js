var localstream;
window.peer=new RTCPeerConnection(window.iceServers);

socket.on("sendice",function(data){
	peer.addIceCandidate(new RTCIceCandidate(data));
})
peer.onicecandidate=function(event)
{
	if(!event || !event.candidate)return;
	socket.emit("emitice",event.candidate);
}

function call()
{
   peer.createOffer(function(offer){

   	peer.setLocalDescription(offer);
   	console.log("emitting offer");
   	socket.emit("emitoffer",offer);

   },function(err){
console.log(err);
   },mediaConstraints);
}

socket.on("reciveanswer",function(data){
	console.log("answer reciveanswer");
	peer.setRemoteDescription(new RTCSessionDescription(data));
});

socket.on("reciveoffer",function(data)
{
	console.log("offer recived")
	console.log(data)
	peer.setRemoteDescription(new RTCSessionDescription(data),function(){
		peer.createAnswer(function (answer) {
			console.log(answer);
        peer.setLocalDescription(answer);
		console.log("emmiting answer");
		console.log(answer);
		socket.emit("emitanswer",answer);
	},function(err){
		console.log(err);
	},mediaConstraints);
	});
	
});

getUserMedia(function(stream){
    localstream=stream;
    var video=document.createElement("video");
    video.src=URL.createObjectURL(stream);
    video.play();
    document.body.appendChild(video);
    peer.addStream(stream);
});

peer.onaddstream=function(event)
{
	 var video=document.createElement("video");
    video.src=URL.createObjectURL(event.stream);
    video.play();
    document.body.appendChild(video);
}