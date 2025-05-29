import React, { useState } from 'react';
import { Repeat, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyToClipboard } from '../../utils/clipboard';
import { Channel } from '../../types';

const FollowUpLauncher: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [channel, setChannel] = useState<Channel>('Email');
  const [context, setContext] = useState('');
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!businessName) {
      toast.error('Please enter a business name');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('https://hook.eu2.make.com/placeholder-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business_name: businessName,
          channel,
          context: context || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate follow-up message');
      }

      const data = await response.text();
      if (!data) {
        throw new Error('Empty response from webhook');
      }

      setMessage(data);
      toast.success('Follow-up message generated 🎯');
    } catch (error) {
      console.error('Error generating follow-up:', error);
      toast.error('Failed to generate follow-up message. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Repeat size={20} className="text-primary-500" />
        <h2 className="text-lg font-semibold">Follow-Up Launcher</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name
          </label>
          <input
            type="text"
            className="input"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Enter business name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Channel
          </label>
          <select
            className="select"
            value={channel}
            onChange={(e) => setChannel(e.target.value as Channel)}
          >
            <option value="Email">Email</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Instagram DM">Instagram DM</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Optional Context
          </label>
          <textarea
            className="input min-h-[100px] resize-none"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Add any relevant context about previous interactions..."
          />
        </div>

        <button
          className="btn-primary w-full flex items-center justify-center gap-2 group relative overflow-hidden"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Repeat size={18} />
              <span>Generate Follow-Up</span>
            </>
          )}
        </button>

        {message && (
          <div className="relative mt-4">
            <textarea
              className="message-container w-full resize-none font-mono text-sm min-h-[200px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => copyToClipboard(message, 'Follow-up message copied!')}
              title="Copy to clipboard"
            >
              <Copy size={16} className="text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUpLauncher;