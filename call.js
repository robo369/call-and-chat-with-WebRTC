var localVideo = document.getElementById('local-video');
var remoteVideo = document.getElementById('remote-video');
var callButton = document.getElementById('call-button');
var hangupButton = document.getElementById('hangup-button');
var localStream, remoteStream, peerConnection;

// Set up getUserMedia
navigator.mediaDevices.getUserMedia({audio: true, video: true})
  .then(function(stream) {
    localVideo.srcObject = stream;
    localStream = stream;
  });

// Set up RTCPeerConnection
callButton.onclick = function() {
  peerConnection = new RTCPeerConnection();
  peerConnection.onicecandidate = function(event) {
    if (event.candidate) {
      socket.emit('ice candidate', event.candidate);
    }
  };
  peerConnection.ontrack = function(event) {
    remoteVideo.srcObject = event.streams[0];
  };
  peerConnection.addStream(localStream);
  peerConnection.createOffer()
    .then(function(offer) {
      return peerConnection.setLocalDescription(offer);
    })
    .then(function() {
      socket.emit('offer', peerConnection.localDescription);
    });
  hangupButton.disabled = false;
};

// Handle signaling events
socket.on('offer', function(offer) {
  peerConnection = new RTCPeerConnection();
  peerConnection.onicecandidate = function(event) {
    if (event.candidate) {
      socket.emit('
