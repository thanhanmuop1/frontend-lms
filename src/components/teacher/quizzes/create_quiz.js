import React from 'react';
import CreateQuizBase from '../../common/quiz/CreateQuizBase';
import config from '../../../config';

const CreateQuiz = () => {
  return (
    <CreateQuizBase
      role="teacher"
      apiEndpoint={config.API_URL + '/teacher/quizzes'}
    />
  );
};

export default CreateQuiz; 