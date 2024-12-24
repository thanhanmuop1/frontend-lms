import React from 'react';
import EditQuizBase from '../../../common/quiz/EditQuizBase';
import config from '../../config';

const EditQuiz = ({ visible, onCancel, onSuccess, quizData }) => {
  return (
    <EditQuizBase
      visible={visible}
      onCancel={onCancel}
      onSuccess={onSuccess}
      quizData={quizData}
      role="teacher"
      apiEndpoint={config.API_URL + '/teacher/quizzes'}
    />
  );
};

export default EditQuiz; 