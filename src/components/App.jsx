import Description from './Description/Description';
import Feedback from './Feedback/Feedback';
import Options from './Options/Options';
import { useState, useEffect } from 'react';
import Notification from './Notification/Notification';
import TotalFeedback from './TotalFeedback/TotalFeedback';
import PositiveFeedbackPercentage from './PositiveFeedbackPercentage/PositiveFeedbackPercentage';

export default function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem('feedback');
    return savedFeedback
      ? JSON.parse(savedFeedback)
      : { good: 0, neutral: 0, bad: 0 };
  });

  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  const handleReset = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const hasFeedback = totalFeedback > 0;
  const positiveFeedbackPercentage =
    totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  useEffect(() => {
    const storedFeedback = localStorage.getItem('feedback');
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);
  return (
    <div>
      <Description />
      <Options text="Good" onClick={() => updateFeedback('good')} />
      <Options text="Neutral" onClick={() => updateFeedback('neutral')} />
      <Options text="Bad" onClick={() => updateFeedback('bad')} />
      {hasFeedback && <Options text="Reset" onClick={handleReset} />}
      {hasFeedback ? (
        <>
          <Feedback
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
          />
          <TotalFeedback totalFeedback={totalFeedback} />
          <PositiveFeedbackPercentage
            positiveFeedbackPercentage={positiveFeedbackPercentage}
          />
        </>
      ) : (
        <Notification />
      )}
    </div>
  );
}
