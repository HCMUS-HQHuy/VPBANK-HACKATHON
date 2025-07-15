import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const RecommendationCard = () => {
  return (
    // This component uses your theme-aware classes
    <div className="bg-card p-7 rounded-xl border border-border shadow-sm flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-yellow-light text-yellow">
        <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-text-primary">Smart Suggestion</h3>
        <p className="text-sm text-text-secondary mt-1">
          I've noticed your 'Fun' jar often runs low, while your 'Education' jar has a surplus. Consider adjusting the allocation to better match your spending habits.
        </p>
      </div>
    </div>
  );
};

export default RecommendationCard;