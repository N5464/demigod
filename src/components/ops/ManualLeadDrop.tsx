import React from 'react';
import { UserPlus } from 'lucide-react';

const ManualLeadDrop: React.FC = () => {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2">
        <UserPlus size={20} className="text-primary-500" />
        <h2 className="text-lg font-semibold">Manual Lead Drop</h2>
      </div>
    </div>
  );
};

export default ManualLeadDrop;