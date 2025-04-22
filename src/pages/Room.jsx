import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Room = () => {
  const { roomId } = useParams();
  const meetingRef = useRef(null);
  const hasJoinedRef = useRef(false); // Prevents multiple calls
  

  useEffect(() => {
    const initMeeting = async () => {
      if (hasJoinedRef.current || !meetingRef.current) return;
      hasJoinedRef.current = true;

      const appId = 1011894780;
      const serverSecret = 'e89a3fa13d13c12265eca8ff3863b081';
      
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        Date.now().toString(),
        'Ronnie'
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: meetingRef.current,
        sharedLinks: [
            {
            name: 'Copy Link',
            url: `http://localhost:5173/room/${roomId}`,
        },
    ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        showScreenSharingButton: true,
      });
    };

    initMeeting();
  }, [roomId]);

  return (

     <div className="flex items-center justify-center w-full h-screen bg-900 overflow-hidden">
      <div ref={meetingRef} className="w-full h-full" />
    </div>
  );
};

export default Room;
