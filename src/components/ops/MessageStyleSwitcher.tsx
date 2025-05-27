import React from 'react';
import { MessageSquare } from 'lucide-react';

const MessageStyleSwitcher: React.FC = () => {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2">
        <MessageSquare size={20} className="text-primary-500" />
        <h2 className="text-lg font-semibold">Message Style Switcher</h2>
      </div>
    </div>
  );
};

export default MessageStyleSwitcher;