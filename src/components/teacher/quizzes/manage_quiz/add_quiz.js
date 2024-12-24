import React from 'react';
import AddQuizBase from '../../../common/quiz/AddQuizBase';
import config from '../../../../config';

const AddQuiz = ({ visible, onCancel, onSuccess }) => {
  return (
    <AddQuizBase
      visible={visible}
      onCancel={onCancel}
      onSuccess={onSuccess}
      role="teacher"
      apiEndpoint={config.API_URL + '/teacher/quizzes'}
    />
  );
};

export default AddQuiz; 