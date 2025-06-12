export const initialState = {
  currentQuestionIndex: 0,
  score: 0,
  showResults: false,
  previousScore: null,
};

export function quizReducer(state, action) {
  switch (action.type) {
    case "ANSWER":
      const isCorrect = action.payload === action.correct;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
      };

    case "NEXT_QUESTION":
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex >= action.totalQuestions) {
        return { ...state, showResults: true };
      }
      return { ...state, currentQuestionIndex: nextIndex };

    case "RESTART":
      return {
        ...initialState,
        previousScore: state.score,
      };

    case "SET_QUESTIONS":
      return {
        ...initialState,
        previousScore: state.previousScore,
      };

    default:
      return state;
  }
}
