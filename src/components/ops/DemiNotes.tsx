import React from 'react';
import { Brain } from 'lucide-react';

const DemiNotes: React.FC = () => {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2">
        <Brain size={20} className="text-primary-500" />
        <h2 className="text-lg font-semibold">DemiNotes Panel</h2>
      </div>
    </div>
  );
};

export default DemiNotes;