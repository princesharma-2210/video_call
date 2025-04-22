import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoHome = () => {
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    
    const handleJoinRoom = useCallback(() => {
        if (value.trim()) {
            navigate(`/room/${value}`);
        }
    }, [navigate, value]);

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleJoinRoom();
        }
    };

    // Animated background bubbles
    const [bubbles, setBubbles] = useState([]);
    
    useEffect(() => {
        // Create initial bubbles
        const initialBubbles = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            size: Math.random() * 60 + 20,
            x: Math.random() * 100,
            y: Math.random() * 100,
            speed: Math.random() * 0.8 + 0.2,
            opacity: Math.random() * 0.5 + 0.1
        }));
        
        setBubbles(initialBubbles);
        
        // Animate bubbles
        const interval = setInterval(() => {
            setBubbles(prev => prev.map(bubble => ({
                ...bubble,
                y: bubble.y - bubble.speed,
                x: bubble.x + (Math.random() * 0.4 - 0.2),
                // Reset bubble position when it goes off-screen
                ...(bubble.y < -10 ? {
                    y: 110,
                    x: Math.random() * 100,
                    size: Math.random() * 60 + 20,
                    speed: Math.random() * 0.8 + 0.2,
                    opacity: Math.random() * 0.5 + 0.1
                } : {})
            })));
        }, 50);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-900">
            {/* Animated background bubbles */}
            {bubbles.map(bubble => (
                <div
                    key={bubble.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: `${bubble.size}px`,
                        height: `${bubble.size}px`,
                        left: `${bubble.x}%`,
                        top: `${bubble.y}%`,
                        opacity: bubble.opacity,
                        transition: 'top 0.5s linear, left 0.5s linear'
                    }}
                />
            ))}
            
            {/* Floating connection lines */}
            <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0%" y1="20%" x2="100%" y2="80%" stroke="white" strokeWidth="1" />
                    <line x1="20%" y1="0%" x2="80%" y2="100%" stroke="white" strokeWidth="1" />
                    <line x1="40%" y1="0%" x2="60%" y2="100%" stroke="white" strokeWidth="1" />
                    <line x1="0%" y1="80%" x2="100%" y2="20%" stroke="white" strokeWidth="1" />
                    <circle cx="20%" cy="30%" r="5" fill="white" />
                    <circle cx="80%" cy="70%" r="5" fill="white" />
                    <circle cx="40%" cy="20%" r="3" fill="white" />
                    <circle cx="60%" cy="80%" r="3" fill="white" />
                </svg>
            </div>
            
            {/* Center card with input */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-white mb-2">Video Connection Room</h1>
                        <p className="text-blue-200">Enter a room code to join or create a video call</p>
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter room code..."
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        
                        <button
                            onClick={handleJoinRoom}
                            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Join Video Call</span>
                        </button>
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-xs text-blue-200">
                            No account needed. Just enter a room code and go!
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Connection status indicator */}
            <div className="absolute bottom-4 left-4 flex items-center text-white/70 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span>Ready to connect</span>
            </div>
        </div>
    );
};

export default VideoHome;