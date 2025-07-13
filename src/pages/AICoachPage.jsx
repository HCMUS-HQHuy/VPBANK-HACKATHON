import JarsAllocation from '@/components/dashboard/JarsAllocation'; // Tái sử dụng từ dashboard
import CategorizeExpenseCard from '@/components/aiCoach/CategorizeExpenseCard';
import ChatInterface from '@/components/aiCoach/ChatInterface';

const AiCoachPage = () => {
  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            <CategorizeExpenseCard />
            <div className="glass-card p-6 rounded-xl border border-border shadow-sm">
                <JarsAllocation />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>

        </div>
      </div>
    </>
  );
};

export default AiCoachPage;