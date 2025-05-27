import React from 'react';
import { Repeat } from 'lucide-react';

const FollowUpLauncher: React.FC = () => {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2">
        <Repeat size={20} className="text-primary-500" />
        <h2 className="text-lg font-semibold">Follow-Up Launcher</h2>
      </div>
    </div>
  );
};

export default FollowUpLauncher;