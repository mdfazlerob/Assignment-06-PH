"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
export const PLAN_CAP = 5;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once on mount.
  useEffect(() => {
    try {
      const storedPlan = JSON.parse(localStorage.getItem(PLAN_KEY) || "[]");
      const storedSaved = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      setPlan(storedPlan);
      setSaved(storedSaved);
    } catch {
      // ignore corrupt storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const isInPlan = (id) => plan.some((w) => w.id === id);
  const isSaved = (id) => saved.some((w) => w.id === id);
  const isPlanFull = () => plan.length >= PLAN_CAP;

  const addToPlan = (workout) => {
    if (isInPlan(workout.id) || isPlanFull()) return false;
    setPlan((prev) => [...prev, { ...workout, done: false }]);
    return true;
  };

  const addToSaved = (workout) => {
    if (isSaved(workout.id)) return false;
    setSaved((prev) => [...prev, workout]);
    return true;
  };

  const removeFromPlan = (id) => setPlan((prev) => prev.filter((w) => w.id !== id));
  const removeFromSaved = (id) => setSaved((prev) => prev.filter((w) => w.id !== id));

  const markDone = (id) =>
    setPlan((prev) => prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w)));

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        isInPlan,
        isSaved,
        isPlanFull,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markDone
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
