import { useState } from "react";
import TestCard from "../components/TestCard";
import Questionnaire from "../utils/Questionnaire";
import useAuthStore from "../store/authStore";
import useAssessmentStore from "../store/assessmentStore";

import { PHQ9_QUESTIONS } from "../data/phq9";
import { GAD7_QUESTIONS } from "../data/gad7";
import { GHQ12_QUESTIONS } from "../data/ghq12";

const Test = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [expanded, setExpanded] = useState({}); // track expanded state per test
  const { token } = useAuthStore();
  const { phq9, gad7, ghq } = useAssessmentStore();

  const tests = [
    {
      title: "Stress Check",
      desc: "Assess your stress levels",
      questions: PHQ9_QUESTIONS,
      result: phq9,
      key: "phq9",
    },
    {
      title: "Anxiety Check",
      desc: "Assess your anxiety",
      questions: GAD7_QUESTIONS,
      result: gad7,
      key: "gad7",
    },
    {
      title: "General Wellbeing",
      desc: "Overall mental health screening",
      questions: GHQ12_QUESTIONS,
      result: ghq,
      key: "ghq",
    },
  ];

  if (selectedTest) {
    return (
      <Questionnaire
        testName={selectedTest.key}
        displayName={selectedTest.title}
        questions={selectedTest.questions}
        token={token}
      />
    );
  }

  return (
    <div className="max-w-5xl min-h-[80vh] mx-auto space-y-8 p-4 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold text-indigo-400 text-center md:text-left">
        Self Assessments
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {tests.map((t, i) => (
          <TestCard
            key={i}
            title={t.title}
            desc={t.desc}
            onClick={() => setSelectedTest(t)}
          />
        ))}
      </div>

      {/* Previous Results */}
      <div className="mt-8 space-y-4">
        {tests.map(
          (t, i) =>
            t.result && (
              <div
                key={i}
                className="p-4 rounded-xl bg-gray-900/60 backdrop-blur-md border border-gray-700 shadow-md"
              >
                <h3 className="text-lg font-semibold text-indigo-400">
                  {t.title} Previous Result
                </h3>
                <p className="text-gray-300 mt-1">
                  Score: {t.result?.[t.key]?.total ?? "N/A"}
                </p>
                <p className="text-gray-200 font-semibold">
                  {t.result?.[t.key]?.result ?? "N/A"}
                </p>

                {t.result?.summary && (
                  <div className="mt-2 text-gray-400">
                    <p className="whitespace-pre-line">
                      {expanded[t.key]
                        ? t.result.summary
                        : `${t.result.summary.slice(0, 120)}${
                            t.result.summary.length > 120 ? "..." : ""
                          }`}
                    </p>
                    {t.result.summary.length > 120 && (
                      <button
                        onClick={() =>
                          setExpanded((prev) => ({
                            ...prev,
                            [t.key]: !prev[t.key],
                          }))
                        }
                        className="text-indigo-400 text-sm mt-2 hover:underline"
                      >
                        {expanded[t.key] ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Test;
