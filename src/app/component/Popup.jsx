import React from 'react';

function Popup(props) {
    return (props.trigger) ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
            <div className="w-3/4 h-auto mx-auto bg-white p-6 rounded-lg shadow-md">
                <label className="block text-2xl font-semibold mb-2">Title</label>
                <input 
                    type="text" 
                    placeholder="Write your title here..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-xl"
                />

                <label className="block text-2xl font-semibold mt-4 mb-2">Description (optional)</label>
                <textarea 
                    placeholder="Add a brief description here..."
                    className="w-full px-4 py-3 border-2 bordder-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-lg h-32 resize-none"
                ></textarea>
                <div className="flex justify-between mt-4">
                    <button 
                        onClick={() => props.setTrigger(false)}
                        className="bg-gray-300 text-black rounded-lg px-4 py-2 text-2xl hover:bg-red-500">
                        Cancel
                    </button>
                    <button className="bg-gray-800 text-white rounded-lg px-4 py-2 text-2xl hover:bg-green-600">
                        Publish Post
                    </button>
                </div>
                { props.children }
            </div>
        </div>
    ) : "";   
}

export default Popup;