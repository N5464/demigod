import React, { useState } from 'react';
import { Mail, MessageSquare, Instagram, AlertCircle } from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { logOutreach, sendEmail } from '../services/webhooks';
import { updateLeadStatus } from '../services/googleSheets';
import toast from 'react-hot-toast';
import { Channel } from '../types';

interface OutreachPanelProps {
  editedMessages: {
    email: string;
    whatsapp: string;
    instagram: string;
  };
}

const OutreachPanel: React.FC<OutreachPanelProps> = ({ editedMessages }) => {
  const { selectedLead, refreshLeads } = useLeads();
  const [sendingChannel, setSendingChannel] = useState<Channel | null>(null);

  if (!editedMessages || !selectedLead) {
    return null;
  }

  const handleSend = async (channel: Channel) => {
    if (!selectedLead) return;

    const message = channel === 'Email' ? editedMessages.email :
                   channel === 'WhatsApp' ? editedMessages.whatsapp :
                   editedMessages.instagram;

    if (!message) {
      toast.error('No message content to send');
      return;
    }

    setSendingChannel(channel);
    
    try {
      if (channel === 'Email') {
        toast.loading('Sending email...', { id: 'sending' });
        
        // First, attempt to send the email
        await sendEmail({
          business_name: selectedLead.business_name,
          email: selectedLead.email,
          subject: `Let's talk automation for ${selectedLead.business_name}`,
          message: message,
        });

        // Only after successful email send, log the outreach
        await logOutreach({
          business_name: selectedLead.business_name,
          channel: 'Email',
          message: message,
          timestamp: new Date().toISOString(),
        });

        // Update lead status and refresh the list
        await updateLeadStatus(selectedLead.business_name, 'Contacted');
        await refreshLeads();
        
        toast.success('✅ Email sent successfully!', { id: 'sending' });
      } else {
        toast.loading('Sending message...', { id: 'sending' });
        
        // For non-email channels, just log the outreach
        await logOutreach({
          business_name: selectedLead.business_name,
          channel,
          message,
          timestamp: new Date().toISOString(),
        });

        await updateLeadStatus(selectedLead.business_name, 'Contacted');
        await refreshLeads();
        
        toast.success('✅ Message sent successfully!', { id: 'sending' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message', { id: 'sending' });
    } finally {
      setSendingChannel(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-4">
        <h3 className="font-medium text-sm text-gray-500">OUTREACH ACTIONS</h3>
        
        <div className="flex flex-wrap gap-3">
          {editedMessages.email && (
            <button
              className="btn-primary flex items-center gap-2"
              onClick={() => handleSend('Email')}
              disabled={sendingChannel === 'Email'}
            >
              <Mail size={16} />
              <span>{sendingChannel === 'Email' ? 'Sending...' : 'Send Email'}</span>
            </button>
          )}
          
          {editedMessages.whatsapp && (
            <button
              className="btn-primary flex items-center gap-2"
              onClick={() => handleSend('WhatsApp')}
              disabled={sendingChannel === 'WhatsApp'}
            >
              <MessageSquare size={16} />
              <span>{sendingChannel === 'WhatsApp' ? 'Sending...' : 'Send WhatsApp'}</span>
            </button>
          )}
          
          {editedMessages.instagram && (
            <button
              className="btn-primary flex items-center gap-2"
              onClick={() => handleSend('Instagram DM')}
              disabled={sendingChannel === 'Instagram DM'}
            >
              <Instagram size={16} />
              <span>{sendingChannel === 'Instagram DM' ? 'Sending...' : 'Send Instagram DM'}</span>
            </button>
          )}
        </div>
        
        <div className="flex items-start gap-2 text-sm text-gray-500 mt-2 bg-gray-50 p-3 rounded-md">
          <AlertCircle size={16} className="text-warning-500 mt-0.5 flex-shrink-0" />
          <p>Sending will update the lead's status to 'Contacted' in your Google Sheet.</p>
        </div>
      </div>
    </div>
  );
};

export default OutreachPanel;