import React from 'react';
import { Command } from 'lucide-react';
import PersonalizedGenerator from '../components/ops/PersonalizedGenerator';
import DemiNotes from '../components/ops/DemiNotes';
import FollowUpLauncher from '../components/ops/FollowUpLauncher';
import ManualLeadDrop from '../components/ops/ManualLeadDrop';
import MessageStyleSwitcher from '../components/ops/MessageStyleSwitcher';

const DemiOps: React.FC = () => {
  return (
    <main className="flex-1 p-6 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <Command size={24} className="text-primary-500" />
        <h1 className="text-2xl font-bold">DemiOps Control Room</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="space-y-6">
          <PersonalizedGenerator />
          <DemiNotes />
          <MessageStyleSwitcher />
        </section>

        <section className="space-y-6">
          <FollowUpLauncher />
          <ManualLeadDrop />
        </section>
      </div>
    </main>
  );
}

export default DemiOps;