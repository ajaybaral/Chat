import React, { useState, useEffect } from "react";
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, SwitchCamera, ChevronDown, ChevronUp, X } from "lucide-react";
import { useConnectWebRtc } from "../context/WebRtcContext";

export default function VideoChat({ show }) {
  const {
    localVideoRef,
    remoteVideoRef,
    handleHangup,
    callConnectionState,
    handleToggleCamera,
    handleToggleMicrophone,
    isCameraActive,
    isMicrophoneActive,
    flipCamera,
    inputVideoDevices,
    selectedInputVideoDevice,
    changeVideoInputDevice,
    inputAudioDevices,
    selectedInputAudioDevice,
    changeAudioInputDevice,
  } = useConnectWebRtc();

  const handleChangeVideoInput = (deviceId) => {
    changeVideoInputDevice(deviceId);
  };

  const handleChangeAudioInput = (deviceId) => {
    changeAudioInputDevice(deviceId);
  };

  const [showVideoOptionTray, setShowVideoOptionTray] = useState(false);
  const [showAudioOptionTray, setShowAudioOptionTray] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;

  // Call duration timer (when connected)
  useEffect(() => {
    let interval;
    if (callConnectionState === "connected") {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callConnectionState]);

  // Format duration as MM:SS
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto hangup after 60 seconds if not connected
  useEffect(() => {
    let timeout;
    if (callConnectionState && callConnectionState.includes("waiting") && callConnectionState !== "connected") {
      timeout = setTimeout(() => {
        console.log("Call timeout - no answer after 60 seconds");
        handleHangup();
      }, 60000); // 60 seconds
    }
    return () => clearTimeout(timeout);
  }, [callConnectionState, handleHangup]);

  if (!show) return null;

  const isWaiting = callConnectionState && callConnectionState.includes("waiting");
  const isConnected = callConnectionState === "connected";

  return (
    <div className="absolute z-50 bg-black w-full h-full p-4 md:p-0">
      <div className="relative bg-backgroundDark3 w-full h-full rounded-lg overflow-hidden">
        {/* Remote Video */}
        <video
          ref={remoteVideoRef}
          autoPlay
          className="absolute top-0 left-0 w-full h-full object-cover"
        ></video>

        {/* Local Video Preview */}
        <video
          ref={localVideoRef}
          autoPlay
          className="absolute bottom-24 right-4 w-48 h-36 md:w-32 md:h-24 object-cover border-2 border-primary rounded-lg shadow-lg"
        ></video>

        {/* Status Overlay - Show prominently when waiting */}
        {isWaiting && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="bg-backgroundDark2 px-8 py-6 rounded-2xl border-2 border-primary shadow-2xl text-center">
              <div className="animate-pulse mb-4">
                <div className="size-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <PhoneOff size={40} className="text-white animate-wiggle" />
                </div>
              </div>
              <p className="text-white text-lg font-semibold mb-2">Calling...</p>
              <p className="text-slate-400 text-sm mb-6">{callConnectionState}</p>
              
              {/* Prominent Cancel Button */}
              <button
                onClick={handleHangup}
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
              >
                <X size={20} />
                <span>Cancel Call</span>
              </button>
            </div>
          </div>
        )}

        {/* Connection Status - Top Center */}
        {!isWaiting && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-4 py-2 rounded-full backdrop-blur-sm">
            {isConnected ? (
              <div className="flex items-center gap-2 text-white text-sm">
                <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{formatDuration(callDuration)}</span>
              </div>
            ) : (
              <p className="text-white text-sm">{callConnectionState || "Connecting..."}</p>
            )}
          </div>
        )}

        {/* Control Panel - Bottom */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-backgroundDark1 px-6 py-4 rounded-full shadow-2xl border border-border_dark">
          {/* Microphone Controls */}
          <div className="relative flex items-center">
            {!isMobileDevice && (
              <div className={`${showAudioOptionTray ? "" : "hidden"} absolute bottom-16 left-0 bg-white rounded-lg shadow-xl p-2 min-w-[200px]`}>
                {inputAudioDevices?.length > 0 && (
                  <ul className="max-h-40 overflow-y-auto">
                    {inputAudioDevices.map((device, index) => (
                      <li
                        key={index}
                        onClick={() => handleChangeAudioInput(device.deviceId)}
                        className={`text-xs px-3 py-2 cursor-pointer hover:bg-backgroundLight3 rounded ${
                          device.deviceId === selectedInputAudioDevice ? "bg-primary text-white" : "text-text_dark_primary"
                        }`}
                      >
                        {device.label || `Microphone ${index + 1}`}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            
            <div className="flex items-center bg-backgroundDark2 rounded-full">
              {!isMobileDevice && (
                <button
                  onClick={() => setShowAudioOptionTray(!showAudioOptionTray)}
                  className="p-2 text-white hover:text-primary transition-colors"
                >
                  {showAudioOptionTray ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              )}
              <button
                onClick={handleToggleMicrophone}
                className={`p-3 rounded-full transition-all ${
                  isMicrophoneActive ? "bg-white bg-opacity-20 text-white hover:bg-opacity-30" : "bg-red-600 text-white"
                }`}
              >
                {isMicrophoneActive ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
            </div>
          </div>

          {/* Camera Controls */}
          <div className="relative flex items-center">
            {!isMobileDevice && (
              <div className={`${showVideoOptionTray ? "" : "hidden"} absolute bottom-16 left-0 bg-white rounded-lg shadow-xl p-2 min-w-[200px]`}>
                {inputVideoDevices?.length > 0 && (
                  <ul className="max-h-40 overflow-y-auto">
                    {inputVideoDevices.map((device, index) => (
                      <li
                        key={index}
                        onClick={() => handleChangeVideoInput(device.deviceId)}
                        className={`text-xs px-3 py-2 cursor-pointer hover:bg-backgroundLight3 rounded ${
                          device.deviceId === selectedInputVideoDevice ? "bg-primary text-white" : "text-text_dark_primary"
                        }`}
                      >
                        {device.label || `Camera ${index + 1}`}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            
            <div className="flex items-center bg-backgroundDark2 rounded-full">
              {!isMobileDevice && (
                <button
                  onClick={() => setShowVideoOptionTray(!showVideoOptionTray)}
                  className="p-2 text-white hover:text-primary transition-colors"
                >
                  {showVideoOptionTray ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              )}
              <button
                onClick={handleToggleCamera}
                className={`p-3 rounded-full transition-all ${
                  isCameraActive ? "bg-white bg-opacity-20 text-white hover:bg-opacity-30" : "bg-red-600 text-white"
                }`}
              >
                {isCameraActive ? <VideoIcon size={20} /> : <VideoOff size={20} />}
              </button>
            </div>
          </div>

          {/* Flip Camera */}
          <button
            onClick={flipCamera}
            className="p-3 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-30 transition-all"
          >
            <SwitchCamera size={20} />
          </button>

          {/* Hangup Button */}
          <button
            onClick={handleHangup}
            className="p-3 bg-red-600 hover:bg-red-700 rounded-full text-white transition-all transform hover:scale-110"
          >
            <PhoneOff size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
