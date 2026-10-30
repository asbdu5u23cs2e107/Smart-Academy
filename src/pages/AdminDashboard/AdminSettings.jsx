import React from 'react';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-extrabold tracking-tight">Settings</h2>
        <p className="text-sm text-slate-500 mt-1">Manage system settings and preferences.</p>
      </div>
      
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-3">General Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Site Name</div>
                  <div className="text-xs text-slate-400">SwordNex Edtech Platform</div>
                </div>
                <button className="text-sm text-purple-600 font-semibold">Edit</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Default Language</div>
                  <div className="text-xs text-slate-400">English</div>
                </div>
                <button className="text-sm text-purple-600 font-semibold">Edit</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Timezone</div>
                  <div className="text-xs text-slate-400">UTC +5:30</div>
                </div>
                <button className="text-sm text-purple-600 font-semibold">Edit</button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold mb-3">Security Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Two-Factor Authentication</div>
                  <div className="text-xs text-slate-400">Require 2FA for admin accounts</div>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                  <label className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Session Timeout</div>
                  <div className="text-xs text-slate-400">Automatically logout after 30 minutes</div>
                </div>
                <button className="text-sm text-purple-600 font-semibold">Edit</button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold mb-3">Video Providers & YouTube Data API</h3>
            <p className="text-xs text-slate-500 mb-4">
              Configure your YouTube Data API v3 key to enable automatic dynamic retrieval of relevant educational videos for any newly created or custom course topic.
            </p>
            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  YouTube Data API Key
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    defaultValue={localStorage.getItem('smartacademy_youtube_api_key') || ''}
                    placeholder="AIzaSy..."
                    id="youtube-api-key-input"
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-mono outline-none focus:border-purple-400 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('youtube-api-key-input');
                      const val = input ? input.value.trim() : '';
                      if (val) {
                        localStorage.setItem('smartacademy_youtube_api_key', val);
                        alert('YouTube API key saved successfully!');
                      } else {
                        localStorage.removeItem('smartacademy_youtube_api_key');
                        alert('YouTube API key cleared.');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md hover:bg-purple-700 transition"
                  >
                    Save Key
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-slate-650 space-y-1.5">
                <p className="font-bold text-purple-900">How to get an official YouTube API key:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>Visit the <a href="https://console.cloud.google.com/apis/library/youtube.googleapis.com" target="_blank" rel="noreferrer" className="text-purple-600 underline font-semibold">Google Cloud Console</a>.</li>
                  <li>Enable the <strong>YouTube Data API v3</strong> for your project.</li>
                  <li>Navigate to <strong>Credentials</strong> and click <strong>Create Credentials → API Key</strong>.</li>
                  <li>Paste the key above or specify <code>VITE_YOUTUBE_API_KEY</code> in your environment file.</li>
                </ol>
                <p className="text-[11px] text-slate-500 pt-1">
                  * Note: Built-in verified courses (Java, Python, Web Dev, Machine Learning, Data Science, etc.) automatically load curated educational videos even without an API key.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;