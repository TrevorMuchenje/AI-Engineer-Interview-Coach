import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  padding: 0.8rem;
  margin: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem 0;
  transition: opacity 0.2s;

  &:hover {npm install
    opacity: 0.9;
  }
`;



const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 1rem;
  resize: vertical;
`;

const FeedbackContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 4px;
  white-space: pre-line;
`;

const topics = [
  'Python',
  'Machine Learning',
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'Data Structures',
  'Algorithms',
  'System Design',
  'MLOps',
  'AI Ethics'
];

const difficulties = ['beginner', 'intermediate', 'advanced'];

const InterviewSection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulties[1]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQuestion = async () => {
    try {
      setLoading(true);
      const result = await axios.post('http://localhost:8000/generate-question', {
        topic: selectedTopic,
        difficulty: selectedDifficulty
      });
      setCurrentQuestion(result.data.question);
      setResponse('');
      setFeedback('');
    } catch (error) {
      console.error('Error generating question:', error);
    } finally {
      setLoading(false);
    }
  };

  const evaluateResponse = async () => {
    if (!response.trim()) return;

    try {
      setLoading(true);
      const result = await axios.post('http://localhost:8000/evaluate-response', {
        question: currentQuestion,
        response: response
      });
      setFeedback(result.data.feedback);
    } catch (error) {
      console.error('Error evaluating response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <Select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </Select>
        <Select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
          {difficulties.map(difficulty => (
            <option key={difficulty} value={difficulty}>{difficulty}</option>
          ))}
        </Select>
        <Button onClick={generateQuestion} disabled={loading}>
          Generate Question
        </Button>
      </div>

      {currentQuestion && (
        <>
          <h3>Question:</h3>
          <p>{currentQuestion}</p>
          <TextArea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type your response here..."
          />
          <Button onClick={evaluateResponse} disabled={loading || !response.trim()}>
            Submit Response
          </Button>
        </>
      )}

      {feedback && (
        <FeedbackContainer>
          <h3>Feedback:</h3>
          {feedback}
        </FeedbackContainer>
      )}
    </Container>
  );
};

export default InterviewSection;
