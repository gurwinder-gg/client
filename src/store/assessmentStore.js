// src/store/assessmentStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { submitPHQ9, submitGAD7, submitGHQ } from "../api/assessmentApi";

const useAssessmentStore = create(persist(
  (set) => ({
    phq9: null,
    gad7: null,
    ghq: null,
    loading: false,
    error: null,

   submitTest: async (testName, responses, token) => {
  set({ loading: true, error: null });
  try {
    let assessment;
    if (testName === "PHQ-9") assessment = await submitPHQ9(responses, token);
    else if (testName === "GAD-7") assessment = await submitGAD7(responses, token);
    else if (testName === "GHQ-12") assessment = await submitGHQ(responses, token);

    set({
      loading: false,
      [testName === "PHQ-9"
        ? "phq9"
        : testName === "GAD-7"
        ? "gad7"
        : "ghq"]: assessment,
    });

    return assessment; // ✅ already the object you need
  } catch (err) {
    set({
      loading: false,
      error: err.response?.data?.message || err.message,
    });
    throw err;
  }
},


  }),
  { name: "assessment-storage" } // localStorage key
));

export default useAssessmentStore;
