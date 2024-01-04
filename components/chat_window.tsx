"use client"

const Chat_window = () => {
  
    return (
        <div className="max-w-md mx-auto p-4 pt-12 pb-20">

            <div className="bg-white rounded-lg shadow-md p-4">

                <div className="flex items-center mb-4">
                <div className="ml-3">
                    <p className="text-xl font-medium">Your AI Assistant</p>
                </div>
                </div>


                <div className="space-y-4">

                <div className="flex items-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        width="100"
                        height="100"
                        fill="#009688"
                        className="w-8 h-8 rounded-full"
                        >

                        <circle cx="50" cy="50" r="20" fill="#009688" />
                        <circle cx="50" cy="40" r="2" fill="#fff" />
                        <rect x="47" y="45" width="6" height="10" fill="#fff" />
                        <circle cx="50" cy="65" r="3" fill="#009688" />

                        <circle cx="45" cy="45" r="3" fill="#fff" />
                        <circle cx="55" cy="45" r="3" fill="#fff" />
                        <circle cx="45" cy="45" r="1" fill="#000" />
                        <circle cx="55" cy="45" r="1" fill="#000" />

                        <line x1="50" y1="30" x2="40" y2="20" stroke="#009688" stroke-width="2" />
                        <line x1="50" y1="30" x2="60" y2="20" stroke="#009688" stroke-width="2" />
                        </svg>
                    <div className="ml-3 bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm text-gray-800">Hello! How can I help you today?</p>
                    </div>
                </div>

                <div className="flex items-end justify-end">
                    <div className="bg-blue-500 p-3 rounded-lg">
                    <p className="text-sm text-white">Sure, I have a question.</p>
                    </div>
                    <img src="https://pbs.twimg.com/profile_images/1707101905111990272/Z66vixO-_normal.jpg" alt="Other User Avatar" className="w-8 h-8 rounded-full ml-3" />
                </div>
                </div>

                <div className="mt-4 flex items-center">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600">Send</button>
                </div>
            </div>
        </div>
    )
}
 
export default Chat_window;

