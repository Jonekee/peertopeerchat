 var mediaConstraints = {
					optional: [],
					mandatory: {
						OfferToReceiveAudio: true,
						OfferToReceiveVideo: true
					}
				};
                var socket=io.connect("http://localhost:8080");
                window.RTCPeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                window.RTCSessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
                window.RTCIceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;

                navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
                window.URL = window.webkitURL || window.URL;

                window.iceServers = {
                    iceServers: [{
                            url: 'stun:23.21.150.121'
                        }
                    ]
                };
                 var video_constraints = {
                    mandatory: {},
                    optional: []
                };

                function getUserMedia(callback) {
                    var n = navigator;
                    n.getMedia = n.webkitGetUserMedia || n.mozGetUserMedia;
                    n.getMedia({
                        audio: true,
                        video: video_constraints
                    }, callback, onerror);

                    function onerror(e) {
						alert(JSON.stringify(e, null, '\t'));
                    }
                }