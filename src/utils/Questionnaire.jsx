import { useState } from "react";
import useAssessmentStore from "../store/assessmentStore";
import { motion, AnimatePresence } from "framer-motion";

const Questionnaire = ({ testName, displayName, questions, token }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [finished, setFinished] = useState(false);
  const [assessment, setAssessment] = useState(null);

  const { submitTest, loading } = useAssessmentStore();

  const handleAnswer = (value) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = value;
    setResponses(newResponses);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting test:", testName, responses);
      const saved = await submitTest(
        testName === "phq9"
          ? "PHQ-9"
          : testName === "gad7"
          ? "GAD-7"
          : "GHQ-12",
        responses,
        token
      );
      setAssessment(saved);
      setFinished(true);
    } catch (err) {
      console.error("Error saving test:", err);
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (finished && assessment) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-8">
        <div className="w-[80vw] mx-auto p-6 bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4">
            {displayName} Results
          </h2>
          <p className="text-gray-300 mb-2">
            Total Score: {assessment[testName]?.total ?? "N/A"}
          </p>
          <p className="text-gray-200 font-semibold text-lg">
            {assessment[testName]?.result ?? "N/A"}
          </p>

          {assessment.summary && (
            <div className="mt-6 p-4 bg-gray-800 rounded-xl text-left">
              <h3 className="text-lg font-semibold text-indigo-400 ">
                AI Summary
              </h3>
              <p className="text-gray-300 my-2">{assessment.summary}</p>
            </div>
          )}

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition-all cursor-pointer"
          >
            Take Another Assessment
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8">
      <div className="w-[80vw] mx-auto p-6 bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-indigo-400 mb-4">
          {displayName}
        </h2>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-300 mb-6">{currentQuestion.text}</p>

            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg transition cursor-pointer ${
                    loading
                      ? "bg-gray-700 cursor-not-allowed"
                      : responses[currentIndex] === idx
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-800 hover:bg-indigo-600 text-white"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleBack}
                disabled={currentIndex === 0 || loading}
                className={`px-4 py-2 rounded-lg transition ${
                  currentIndex === 0 || loading
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-indigo-600 text-white"
                }`}
              >
                Back
              </button>

              <p className="text-gray-300 text-sm">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>

            {/* Show submit button + loader only on last question */}
            {currentIndex === questions.length - 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={handleSubmit}
                  disabled={responses.some((r) => r === undefined) || loading}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-all disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? "Submitting..." : "Submit Assessment"}
                </button>

                {loading && (
                  <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Questionnaire;
