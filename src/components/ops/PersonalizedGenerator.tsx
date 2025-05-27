import React, { useState } from 'react';
import { MessageSquare, Copy } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';
import { generateMessages } from '../../services/webhooks';
import { copyToClipboard } from '../../utils/clipboard';
import toast from 'react-hot-toast';

const PersonalizedGenerator: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [niche, setNiche] = useState('');
  const [painPoint, setPainPoint] = useState('');
  const [channel, setChannel] = useState('Email');
  const [style, setStyle] = useState('Bold');
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!businessName || !niche || !painPoint) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    try {
      const messages = await generateMessages({
        business_name: businessName,
        niche,
        pain_point: painPoint,
        channel,
        style,
      });

      setMessage(messages[channel.toLowerCase()]);
      toast.success('Message generated via Nik4i AI Agent 🎯');
    } catch (error) {
      console.error('Error generating message:', error);
      toast.error('AI message generation failed – try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare size={20} className="text-primary-500" />
        <h2 className="text-lg font-semibold">Personalized Message Generator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            Niche
          </label>
          <input
            type="text"
            className="input"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., Dental Clinic"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pain Point
          </label>
          <input
            type="text"
            className="input"
            value={painPoint}
            onChange={(e) => setPainPoint(e.target.value)}
            placeholder="e.g., low website conversions"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Channel
          </label>
          <select
            className="select"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          >
            <option value="Email">Email</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Instagram DM">Instagram DM</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message Style
          </label>
          <select
            className="select"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="Casual">Casual</option>
            <option value="Bold">Bold</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
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
            <MessageSquare size={18} />
            <span>Generate Message</span>
          </>
        )}
      </button>

      {message && (
        <div className="relative">
          <textarea
            className="message-container w-full resize-none font-mono text-sm min-h-[200px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-gray-50 rounded-md transition-colors"
            onClick={() => copyToClipboard(message, 'Message copied!')}
            title="Copy to clipboard"
          >
            <Copy size={16} className="text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalizedGenerator;