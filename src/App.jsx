import { useState, useEffect, useRef } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const WORKOUT_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const LUNCH_OPTIONS = ["Ham and cheese sandwich", "Roast beef and cheese sandwich", "Turkey and cheese sandwich", "Chicken wrap"];
const LUNCH_SIDES = ["YoCrunch yogurt", "Goldfish crackers", "Carrots", "Nature Valley bar", "Apple", "Banana"];
const DINNER_SUGGESTIONS = ["Grilled chicken, rice, and broccoli", "Ground beef tacos with beans and rice", "Salmon and rice with green beans", "Chicken stir fry with vegetables and rice", "Turkey meatballs with pasta and marinara", "Steak with sweet potato and asparagus", "Shrimp fried rice with eggs"];

const MEAL_CALORIES = {
  "Protein shake with whole milk + banana": 420,
  "Ham and cheese sandwich": 380, "Roast beef and cheese sandwich": 420, "Turkey and cheese sandwich": 360, "Chicken wrap": 400,
  "YoCrunch yogurt": 150, "Goldfish crackers": 140, "Carrots": 35, "Nature Valley bar": 190, "Apple": 80, "Banana": 90,
  "Peanut butter toast or banana": 280, "Protein shake": 180,
  "Grilled chicken, rice, and broccoli": 520, "Ground beef tacos with beans and rice": 680, "Salmon and rice with green beans": 560,
  "Chicken stir fry with vegetables and rice": 580, "Turkey meatballs with pasta and marinara": 620,
  "Steak with sweet potato and asparagus": 640, "Shrimp fried rice with eggs": 590,
};

const CALORIE_GOAL = 3000;

const initialWeek = () => {
  const week = {};
  DAYS.forEach(day => {
    week[day] = { isWorkoutDay: WORKOUT_DAYS.includes(day), morning: "", morningCalories: 0, lunch: "", lunchSides: [], lunchCustom: "", lunchCalories: 0, dinner: "", dinnerCalories: 0, preWorkout: "", preWorkoutCalories: 0, postWorkout: "", postWorkoutCalories: 0, exercises: [] };
  });
  return week;
};

const formatDuration = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
const formatTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const formatDate = (ts) => new Date(ts).toLocaleDateString([], { month: "short", day: "numeric" });

export default function FitnessTracker() {
  const [week, setWeek] = useState(initialWeek());
  const [activeDay, setActiveDay] = useState("Monday");
  const [view, setView] = useState("meals");
  const [newExercise, setNewExercise] = useState({ name: "", type: "weights", sets: [{ reps: "", weight: "" }], duration: "", distance: "" });
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [templates, setTemplates] = useState({});
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [showLoadTemplate, setShowLoadTemplate] = useState(false);

  // Timer
  const [workoutActive, setWorkoutActive] = useState(false);
  const [workoutStart, setWorkoutStart] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  // Body weight
  const [bodyWeights, setBodyWeights] = useState([{ date: Date.now(), weight: 165 }]);
  const [showWeightPrompt, setShowWeightPrompt] = useState(false);
  const [newBodyWeight, setNewBodyWeight] = useState("");

  // History & progress
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [exerciseProgress, setExerciseProgress] = useState({});
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [startDate] = useState(Date.now());

  useEffect(() => {
    if (workoutActive) { timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000); }
    else { clearInterval(timerRef.current); }
    return () => clearInterval(timerRef.current);
  }, [workoutActive]);

  const day = week[activeDay];
  const updateDay = (fields) => setWeek(w => ({ ...w, [activeDay]: { ...w[activeDay], ...fields } }));

  const toggleLunchSide = (side) => {
    const current = day.lunchSides || [];
    updateDay({ lunchSides: current.includes(side) ? current.filter(s => s !== side) : [...current, side] });
  };

  // Calorie calc
  const getDayCalories = (d) => {
    const dayData = week[d];
    let cal = 0;
    cal += MEAL_CALORIES[dayData.morning] || dayData.morningCalories || 0;
    cal += MEAL_CALORIES[dayData.lunch] || dayData.lunchCalories || 0;
    (dayData.lunchSides || []).forEach(s => { cal += MEAL_CALORIES[s] || 0; });
    cal += MEAL_CALORIES[dayData.dinner] || dayData.dinnerCalories || 0;
    cal += MEAL_CALORIES[dayData.preWorkout] || dayData.preWorkoutCalories || 0;
    cal += MEAL_CALORIES[dayData.postWorkout] || dayData.postWorkoutCalories || 0;
    return cal;
  };

  const todayCalories = getDayCalories(activeDay);
  const calPct = Math.min((todayCalories / CALORIE_GOAL) * 100, 100);

  // Workout actions
  const startWorkout = () => { setWorkoutActive(true); setWorkoutStart(Date.now()); setElapsed(0); };

  const endWorkout = () => {
    setWorkoutActive(false);
    const count = totalWorkouts + 1;
    setTotalWorkouts(count);
    setStreak(s => s + 1);
    const session = { id: Date.now(), day: activeDay, date: Date.now(), duration: elapsed, exercises: JSON.parse(JSON.stringify(day.exercises)) };
    setWorkoutHistory(h => [session, ...h]);
    day.exercises.forEach(ex => {
      const maxWeight = Math.max(...ex.sets.map(s => parseFloat(s.weight) || 0));
      if (maxWeight > 0) {
        setExerciseProgress(p => ({ ...p, [ex.name]: [...(p[ex.name] || []), { date: Date.now(), weight: maxWeight }] }));
      }
    });
    if (count % 20 === 0) setShowWeightPrompt(true);
  };

  const saveBodyWeight = () => {
    if (!newBodyWeight) return;
    setBodyWeights(w => [...w, { date: Date.now(), weight: parseFloat(newBodyWeight) }]);
    setNewBodyWeight(""); setShowWeightPrompt(false);
  };

  // Exercise actions
  const addSet = () => setNewExercise(e => ({ ...e, sets: [...e.sets, { reps: "", weight: "" }] }));
  const removeSet = (i) => setNewExercise(e => ({ ...e, sets: e.sets.filter((_, idx) => idx !== i) }));
  const updateSet = (i, field, val) => setNewExercise(e => { const sets = [...e.sets]; sets[i] = { ...sets[i], [field]: val }; return { ...e, sets }; });

  const saveExercise = () => {
    if (!newExercise.name.trim()) return;
    updateDay({ exercises: [...day.exercises, { ...newExercise, id: Date.now() }] });
    setNewExercise({ name: "", sets: [{ reps: "", weight: "" }] });
    setShowAddExercise(false);
  };

  const removeExercise = (id) => updateDay({ exercises: day.exercises.filter(e => e.id !== id) });

  const saveTemplate = () => {
    if (!templateName.trim() || day.exercises.length === 0) return;
    setTemplates(t => ({ ...t, [templateName]: JSON.parse(JSON.stringify(day.exercises)) }));
    setTemplateName(""); setShowSaveTemplate(false);
  };

  const loadTemplate = (name) => {
    const tpl = templates[name].map(ex => ({ ...ex, id: Date.now() + Math.random(), sets: ex.sets.map(s => ({ ...s })) }));
    updateDay({ exercises: tpl });
    setShowLoadTemplate(false);
  };

  const copyLastWeek = () => {
    const lastSession = workoutHistory.find(s => s.day === activeDay);
    if (lastSession) {
      const exercises = lastSession.exercises.map(ex => ({ ...ex, id: Date.now() + Math.random() }));
      updateDay({ exercises });
    }
  };

  const totalVolume = (ex) => ex.sets.reduce((acc, s) => acc + (parseFloat(s.reps) || 0) * (parseFloat(s.weight) || 0), 0);

  const currentWeight = bodyWeights[bodyWeights.length - 1]?.weight || 165;
  const startWeight = bodyWeights[0]?.weight || 165;
  const weightGain = (currentWeight - startWeight).toFixed(1);

  const navBtn = (label, v) => (
    <button onClick={() => setView(v)} style={{
      flex: 1, padding: "9px 4px", border: "none",
      background: view === v ? "linear-gradient(135deg, #e94560, #f5a623)" : "transparent",
      color: view === v ? "#fff" : "#ffffff50", fontSize: "10px", fontFamily: "inherit",
      cursor: "pointer", letterSpacing: "0.06em", borderRadius: "8px", fontWeight: view === v ? "700" : "400",
    }}>{label}</button>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0f0f0", fontFamily: "'DM Mono', 'Courier New', monospace" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", padding: "18px 20px 14px", borderBottom: "1px solid #ffffff15" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "linear-gradient(135deg, #e94560, #f5a623)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "bold", color: "#fff" }}>A</div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "700", letterSpacing: "0.05em", color: "#fff" }}>FITNESS TRACKER</div>
              <div style={{ fontSize: "10px", color: "#ffffff60", letterSpacing: "0.06em" }}>
                {currentWeight} lbs · {totalWorkouts} workouts · 🔥 {streak} streak
              </div>
            </div>
          </div>
          <button onClick={() => setShowWeightPrompt(true)} style={{ padding: "6px 10px", borderRadius: "16px", border: "1px solid #4ecdc460", background: "#4ecdc410", color: "#4ecdc4", fontSize: "10px", fontFamily: "inherit", cursor: "pointer" }}>+ Weight</button>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", gap: "4px", padding: "10px 14px", background: "#111", borderBottom: "1px solid #ffffff10" }}>
        {navBtn("MEALS", "meals")}
        {navBtn("WORKOUT", "workout")}
        {navBtn("PROGRESS", "progress")}
        {navBtn("HISTORY", "history")}
      </div>

      {/* Weight prompt */}
      {showWeightPrompt && (
        <div style={{ position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" }}>
          <div style={{ background: "#1a1a1a", borderRadius: "16px", border: "1px solid #f5a62340", padding: "24px", width: "100%", maxWidth: "320px" }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#f5a623", marginBottom: "8px" }}>⚖️ LOG YOUR WEIGHT</div>
            <div style={{ fontSize: "11px", color: "#ffffff60", marginBottom: "16px" }}>Start: {startWeight} lbs · Current: {currentWeight} lbs</div>
            <input placeholder="Current weight (lbs)" value={newBodyWeight} onChange={e => setNewBodyWeight(e.target.value)} type="number"
              style={{ width: "100%", background: "#111", border: "1px solid #ffffff20", borderRadius: "8px", padding: "12px", color: "#fff", fontSize: "16px", fontFamily: "inherit", boxSizing: "border-box", marginBottom: "12px" }} />
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={saveBodyWeight} style={{ flex: 2, padding: "12px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #e94560, #f5a623)", color: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", fontWeight: "600" }}>Save</button>
              <button onClick={() => setShowWeightPrompt(false)} style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff60", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}>Skip</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MEALS VIEW ── */}
      {view === "meals" && (
        <div style={{ padding: "16px" }}>
          {/* Day selector */}
          <div style={{ display: "flex", overflowX: "auto", gap: "8px", marginBottom: "16px", scrollbarWidth: "none" }}>
            {DAYS.map(d => (
              <button key={d} onClick={() => setActiveDay(d)} style={{
                flexShrink: 0, padding: "7px 12px", borderRadius: "20px",
                border: activeDay === d ? "1px solid #e94560" : "1px solid #ffffff15",
                background: activeDay === d ? "#e9456015" : "transparent",
                color: activeDay === d ? "#e94560" : week[d].isWorkoutDay ? "#f5a623" : "#ffffff50",
                fontSize: "11px", fontFamily: "inherit", cursor: "pointer",
              }}>{d.slice(0, 3).toUpperCase()}</button>
            ))}
          </div>

          {/* Calorie bar */}
          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", padding: "14px 16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ fontSize: "11px", color: "#ffffff60", letterSpacing: "0.08em" }}>DAILY CALORIES</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: calPct >= 100 ? "#f5a623" : "#fff" }}>{todayCalories} / {CALORIE_GOAL}</div>
            </div>
            <div style={{ background: "#1a1a1a", borderRadius: "6px", height: "10px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${calPct}%`, background: calPct >= 100 ? "linear-gradient(90deg, #f5a623, #e94560)" : "linear-gradient(90deg, #4ecdc4, #44b89a)", borderRadius: "6px", transition: "width 0.3s" }} />
            </div>
            <div style={{ fontSize: "10px", color: "#ffffff30", marginTop: "6px" }}>
              {calPct >= 100 ? "✅ Goal reached!" : `${CALORIE_GOAL - todayCalories} calories to go`}
            </div>
          </div>

          {/* Nutrition */}
          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>NUTRITION — {activeDay.toUpperCase()}</div>

            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ fontSize: "10px", color: "#e94560", letterSpacing: "0.08em" }}>MORNING</div>
                <div style={{ fontSize: "11px", color: "#ffffff40" }}>{MEAL_CALORIES[day.morning] || day.morningCalories || 0} cal</div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input placeholder="What did you eat for breakfast?" value={day.morning || ""} onChange={e => updateDay({ morning: e.target.value })}
                  style={{ flex: 1, background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "12px", fontFamily: "inherit" }} />
                <input placeholder="Cal" value={day.morningCalories || ""} onChange={e => updateDay({ morningCalories: parseInt(e.target.value) || 0 })} type="number"
                  style={{ width: "60px", background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "12px", fontFamily: "inherit" }} />
              </div>
            </div>

            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ fontSize: "10px", color: "#e94560", letterSpacing: "0.08em" }}>LUNCH</div>
                <div style={{ fontSize: "11px", color: "#ffffff40" }}>{(MEAL_CALORIES[day.lunch] || day.lunchCalories || 0) + (day.lunchSides || []).reduce((a, s) => a + (MEAL_CALORIES[s] || 0), 0)} cal</div>
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                {LUNCH_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => updateDay({ lunch: day.lunch === opt ? "" : opt, lunchCustom: "", lunchCalories: 0 })} style={{
                    padding: "6px 10px", borderRadius: "12px",
                    border: day.lunch === opt ? "1px solid #e94560" : "1px solid #ffffff15",
                    background: day.lunch === opt ? "#e9456015" : "transparent",
                    color: day.lunch === opt ? "#e94560" : "#ffffff50",
                    fontSize: "11px", fontFamily: "inherit", cursor: "pointer",
                  }}>{opt}</button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input placeholder="What did you eat for lunch?" value={day.lunchCustom || ""} onChange={e => updateDay({ lunchCustom: e.target.value, lunch: "" })}
                  style={{ flex: 1, background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "12px", fontFamily: "inherit" }} />
                <input placeholder="Cal" value={day.lunchCalories || ""} onChange={e => updateDay({ lunchCalories: parseInt(e.target.value) || 0 })} type="number"
                  style={{ width: "60px", background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "12px", fontFamily: "inherit" }} />
              </div>
              <div style={{ fontSize: "10px", color: "#ffffff30", marginBottom: "6px" }}>SIDES</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {LUNCH_SIDES.map(side => (
                  <button key={side} onClick={() => toggleLunchSide(side)} style={{
                    padding: "5px 10px", borderRadius: "12px",
                    border: (day.lunchSides || []).includes(side) ? "1px solid #f5a623" : "1px solid #ffffff15",
                    background: (day.lunchSides || []).includes(side) ? "#f5a62310" : "transparent",
                    color: (day.lunchSides || []).includes(side) ? "#f5a623" : "#ffffff50",
                    fontSize: "11px", fontFamily: "inherit", cursor: "pointer",
                  }}>{side}</button>
                ))}
              </div>
            </div>

            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ fontSize: "10px", color: "#e94560", letterSpacing: "0.08em" }}>DINNER</div>
                <div style={{ fontSize: "11px", color: "#ffffff40" }}>{MEAL_CALORIES[day.dinner] || day.dinnerCalories || 0} cal</div>
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input placeholder="What did you eat for dinner?" value={day.dinner} onChange={e => updateDay({ dinner: e.target.value })}
                  style={{ flex: 1, background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "12px", fontFamily: "inherit" }} />
                <input placeholder="Cal" value={day.dinnerCalories || ""} onChange={e => updateDay({ dinnerCalories: parseInt(e.target.value) || 0 })} type="number"
                  style={{ width: "60px", background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "12px", fontFamily: "inherit" }} />
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {DINNER_SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => updateDay({ dinner: day.dinner === s ? "" : s, dinnerCalories: 0 })} style={{
                    padding: "5px 10px", borderRadius: "12px",
                    border: day.dinner === s ? "1px solid #f5a623" : "1px solid #ffffff15",
                    background: day.dinner === s ? "#f5a62310" : "transparent",
                    color: day.dinner === s ? "#f5a623" : "#ffffff50",
                    fontSize: "11px", fontFamily: "inherit", cursor: "pointer",
                  }}>{s.split(",")[0]}</button>
                ))}
              </div>
            </div>

            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ fontSize: "10px", color: "#e94560", letterSpacing: "0.08em" }}>PRE-WORKOUT</div>
                <div style={{ fontSize: "11px", color: "#ffffff40" }}>{MEAL_CALORIES[day.preWorkout] || day.preWorkoutCalories || 0} cal</div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input placeholder="What do you eat before working out?" value={day.preWorkout || ""} onChange={e => updateDay({ preWorkout: e.target.value })}
                  style={{ flex: 1, background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "12px", fontFamily: "inherit" }} />
                <input placeholder="Cal" value={day.preWorkoutCalories || ""} onChange={e => updateDay({ preWorkoutCalories: parseInt(e.target.value) || 0 })} type="number"
                  style={{ width: "60px", background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "12px", fontFamily: "inherit" }} />
              </div>
            </div>
            <div style={{ padding: "12px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ fontSize: "10px", color: "#e94560", letterSpacing: "0.08em" }}>POST-WORKOUT</div>
                <div style={{ fontSize: "11px", color: "#ffffff40" }}>{MEAL_CALORIES[day.postWorkout] || day.postWorkoutCalories || 0} cal</div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input placeholder="What do you eat after working out?" value={day.postWorkout || ""} onChange={e => updateDay({ postWorkout: e.target.value })}
                  style={{ flex: 1, background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "12px", fontFamily: "inherit" }} />
                <input placeholder="Cal" value={day.postWorkoutCalories || ""} onChange={e => updateDay({ postWorkoutCalories: parseInt(e.target.value) || 0 })} type="number"
                  style={{ width: "60px", background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "12px", fontFamily: "inherit" }} />
              </div>
            </div>
          </div>

          <div style={{ padding: "12px 16px", borderRadius: "12px", background: "linear-gradient(135deg, #e9456008, #f5a62308)", border: "1px solid #f5a62320" }}>
            <div style={{ fontSize: "10px", color: "#f5a623", letterSpacing: "0.1em", marginBottom: "4px" }}>DAILY TARGET</div>
            <div style={{ fontSize: "12px", color: "#ffffff80", lineHeight: "1.6" }}>🥩 150g+ protein · 🍚 3,000+ calories · 💪 Progressive overload</div>
          </div>
        </div>
      )}

      {/* ── WORKOUT VIEW ── */}
      {view === "workout" && (
        <div style={{ padding: "16px" }}>
          {/* Day selector */}
          <div style={{ display: "flex", overflowX: "auto", gap: "8px", marginBottom: "16px", scrollbarWidth: "none" }}>
            {DAYS.map(d => {
              const hasEx = week[d].exercises.length > 0;
              return (
                <button key={d} onClick={() => setActiveDay(d)} style={{
                  flexShrink: 0, padding: "7px 12px", borderRadius: "20px",
                  border: activeDay === d ? "1px solid #e94560" : "1px solid #ffffff15",
                  background: activeDay === d ? "#e9456015" : "transparent",
                  color: activeDay === d ? "#e94560" : week[d].isWorkoutDay ? "#f5a623" : "#ffffff50",
                  fontSize: "11px", fontFamily: "inherit", cursor: "pointer", position: "relative",
                }}>
                  {d.slice(0, 3).toUpperCase()}
                  {hasEx && <span style={{ position: "absolute", top: "1px", right: "1px", width: "5px", height: "5px", borderRadius: "50%", background: "#e94560" }} />}
                </button>
              );
            })}
          </div>

          {/* Day header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>{activeDay}</div>
              <div style={{ fontSize: "11px", color: day.isWorkoutDay ? "#f5a623" : "#ffffff40" }}>{day.isWorkoutDay ? "🏋️ WORKOUT DAY" : "REST DAY"}</div>
            </div>
            <button onClick={() => updateDay({ isWorkoutDay: !day.isWorkoutDay })} style={{
              padding: "7px 12px", borderRadius: "20px", border: `1px solid ${day.isWorkoutDay ? "#f5a62360" : "#ffffff20"}`,
              background: "transparent", color: day.isWorkoutDay ? "#f5a623" : "#ffffff40", fontSize: "11px", fontFamily: "inherit", cursor: "pointer",
            }}>{day.isWorkoutDay ? "Mark Rest" : "Mark Workout"}</button>
          </div>

          {day.isWorkoutDay ? (
            <>
              {/* Start/End */}
              <div style={{ marginBottom: "16px" }}>
                {!workoutActive ? (
                  <button onClick={startWorkout} style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #e94560, #f5a623)", color: "#fff", fontSize: "15px", fontFamily: "inherit", cursor: "pointer", fontWeight: "700", letterSpacing: "0.05em" }}>▶ START WORKOUT</button>
                ) : (
                  <div style={{ background: "#1a1a1a", borderRadius: "12px", border: "1px solid #e9456040", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div>
                        <div style={{ fontSize: "11px", color: "#e94560", letterSpacing: "0.08em", marginBottom: "2px" }}>IN PROGRESS</div>
                        <div style={{ fontSize: "32px", fontWeight: "700", color: "#fff" }}>{formatDuration(elapsed)}</div>
                        <div style={{ fontSize: "11px", color: "#ffffff40" }}>Started {formatTime(workoutStart)}</div>
                      </div>
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "2px solid #e94560", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#e94560" }} />
                      </div>
                    </div>
                    <button onClick={endWorkout} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #e9456060", background: "#e9456015", color: "#e94560", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", fontWeight: "600" }}>■ END WORKOUT</button>
                  </div>
                )}
              </div>

              {/* Template actions */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <button onClick={() => setShowLoadTemplate(true)} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #4ecdc460", background: "#4ecdc410", color: "#4ecdc4", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>📋 Load Template</button>
                <button onClick={copyLastWeek} disabled={!workoutHistory.find(s => s.day === activeDay)} style={{
                  flex: 1, padding: "10px", borderRadius: "10px",
                  border: workoutHistory.find(s => s.day === activeDay) ? "1px solid #f5a62360" : "1px solid #ffffff15",
                  background: workoutHistory.find(s => s.day === activeDay) ? "#f5a62310" : "transparent",
                  color: workoutHistory.find(s => s.day === activeDay) ? "#f5a623" : "#ffffff30",
                  fontSize: "11px", fontFamily: "inherit", cursor: workoutHistory.find(s => s.day === activeDay) ? "pointer" : "default",
                }}>↩ Copy Last Week</button>
                {day.exercises.length > 0 && (
                  <button onClick={() => setShowSaveTemplate(true)} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff50", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>💾 Save</button>
                )}
              </div>

              {/* Save template modal */}
              {showSaveTemplate && (
                <div style={{ background: "#1a1a1a", borderRadius: "12px", border: "1px solid #4ecdc440", padding: "16px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "12px", color: "#4ecdc4", marginBottom: "10px" }}>Save as Template</div>
                  <input placeholder='e.g. "Push Day" or "Chest & Back"' value={templateName} onChange={e => setTemplateName(e.target.value)}
                    style={{ width: "100%", background: "#111", border: "1px solid #ffffff15", borderRadius: "8px", padding: "10px 12px", color: "#fff", fontSize: "13px", fontFamily: "inherit", boxSizing: "border-box", marginBottom: "10px" }} />
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={saveTemplate} style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", background: "#4ecdc4", color: "#000", fontSize: "12px", fontFamily: "inherit", cursor: "pointer", fontWeight: "700" }}>Save</button>
                    <button onClick={() => setShowSaveTemplate(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff60", fontSize: "12px", fontFamily: "inherit", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              )}

              {/* Load template modal */}
              {showLoadTemplate && (
                <div style={{ background: "#1a1a1a", borderRadius: "12px", border: "1px solid #4ecdc440", padding: "16px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "12px", color: "#4ecdc4", marginBottom: "10px" }}>Load Template</div>
                  {Object.keys(templates).length === 0 ? (
                    <div style={{ fontSize: "12px", color: "#ffffff30", textAlign: "center", padding: "12px 0" }}>No saved templates yet — build a workout and save it!</div>
                  ) : (
                    Object.keys(templates).map(name => (
                      <button key={name} onClick={() => loadTemplate(name)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ffffff15", background: "transparent", color: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", textAlign: "left", marginBottom: "6px" }}>
                        📋 {name} <span style={{ color: "#ffffff40", fontSize: "11px" }}>({templates[name].length} exercises)</span>
                      </button>
                    ))
                  )}
                  <button onClick={() => setShowLoadTemplate(false)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff60", fontSize: "12px", fontFamily: "inherit", cursor: "pointer", marginTop: "4px" }}>Cancel</button>
                </div>
              )}

              {/* Exercise log */}
              <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>EXERCISES ({day.exercises.length})</div>
                  <button onClick={() => setShowAddExercise(true)} style={{ padding: "6px 12px", borderRadius: "16px", border: "1px solid #e9456060", background: "#e9456010", color: "#e94560", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>+ ADD</button>
                </div>

                {day.exercises.length === 0 && !showAddExercise && (
                  <div style={{ padding: "24px 16px", textAlign: "center", color: "#ffffff30", fontSize: "13px" }}>Load a template or add exercises 💪</div>
                )}

                {day.exercises.map(ex => {
                  const isCardio = ex.type === "cardio";
                  const prev = exerciseProgress[ex.name];
                  const lastMax = !isCardio && prev && prev.length > 0 ? prev[prev.length - 1]?.weight : null;
                  const curMax = !isCardio ? Math.max(...(ex.sets || []).map(s => parseFloat(s.weight) || 0)) : 0;
                  const pr = curMax > 0 && lastMax && curMax > lastMax;
                  return (
                    <div key={ex.id} style={{ padding: "14px 16px", borderBottom: "1px solid #ffffff08" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ fontSize: "13px" }}>{isCardio ? "🏃" : "🏋️"}</span>
                          <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>{ex.name}</div>
                          {pr && <span style={{ fontSize: "10px", background: "#f5a62320", color: "#f5a623", padding: "2px 6px", borderRadius: "6px" }}>PR 🔥</span>}
                        </div>
                        <button onClick={() => removeExercise(ex.id)} style={{ background: "transparent", border: "none", color: "#ffffff30", cursor: "pointer", fontSize: "18px", padding: "0" }}>×</button>
                      </div>
                      {isCardio ? (
                        <div style={{ display: "flex", gap: "8px" }}>
                          {ex.duration && <div style={{ padding: "4px 10px", borderRadius: "8px", background: "#1a1a1a", border: "1px solid #ffffff10", fontSize: "12px", color: "#ffffff80" }}>⏱ {ex.duration} min</div>}
                          {ex.distance && <div style={{ padding: "4px 10px", borderRadius: "8px", background: "#1a1a1a", border: "1px solid #ffffff10", fontSize: "12px", color: "#ffffff80" }}>📍 {ex.distance} mi</div>}
                        </div>
                      ) : (
                        <>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {(ex.sets || []).map((s, i) => (
                              <div key={i} style={{ padding: "4px 10px", borderRadius: "8px", background: "#1a1a1a", border: "1px solid #ffffff10", fontSize: "12px", color: "#ffffff80" }}>
                                {i + 1}: {s.reps} × {s.weight} lbs
                              </div>
                            ))}
                          </div>
                          {lastMax && <div style={{ fontSize: "11px", color: "#ffffff30", marginTop: "6px" }}>Last max: {lastMax} lbs</div>}
                        </>
                      )}
                    </div>
                  );
                })}

                {showAddExercise && (
                  <div style={{ padding: "16px", borderTop: "1px solid #ffffff10" }}>
                    {/* Type selector */}
                    <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                      {["weights", "cardio"].map(t => (
                        <button key={t} onClick={() => setNewExercise(ex => ({ ...ex, type: t }))} style={{
                          flex: 1, padding: "9px", borderRadius: "8px",
                          border: newExercise.type === t ? "1px solid #e94560" : "1px solid #ffffff15",
                          background: newExercise.type === t ? "#e9456015" : "transparent",
                          color: newExercise.type === t ? "#e94560" : "#ffffff50",
                          fontSize: "12px", fontFamily: "inherit", cursor: "pointer",
                        }}>{t === "weights" ? "🏋️ Weights" : "🏃 Cardio"}</button>
                      ))}
                    </div>

                    <input
                      placeholder={newExercise.type === "cardio" ? "Cardio type (e.g. Treadmill, Bike)" : "Exercise name (e.g. Bench Press)"}
                      value={newExercise.name} onChange={e => setNewExercise(ex => ({ ...ex, name: e.target.value }))}
                      style={{ width: "100%", background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "10px 12px", color: "#fff", fontSize: "13px", fontFamily: "inherit", boxSizing: "border-box", marginBottom: "12px" }} />

                    {newExercise.type === "cardio" ? (
                      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "10px", color: "#ffffff40", marginBottom: "4px" }}>DURATION (mins)</div>
                          <input placeholder="e.g. 30" value={newExercise.duration} onChange={e => setNewExercise(ex => ({ ...ex, duration: e.target.value }))} type="number"
                            style={{ width: "100%", background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "13px", fontFamily: "inherit", boxSizing: "border-box" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "10px", color: "#ffffff40", marginBottom: "4px" }}>DISTANCE (miles)</div>
                          <input placeholder="e.g. 2.5" value={newExercise.distance} onChange={e => setNewExercise(ex => ({ ...ex, distance: e.target.value }))} type="number"
                            style={{ width: "100%", background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "13px", fontFamily: "inherit", boxSizing: "border-box" }} />
                        </div>
                      </div>
                    ) : (
                      <>
                        {newExercise.sets.map((s, i) => (
                          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
                            <div style={{ fontSize: "11px", color: "#ffffff40", width: "36px" }}>Set {i + 1}</div>
                            <input placeholder="Reps" value={s.reps} onChange={e => updateSet(i, "reps", e.target.value)} type="number"
                              style={{ flex: 1, background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "13px", fontFamily: "inherit" }} />
                            <input placeholder="lbs" value={s.weight} onChange={e => updateSet(i, "weight", e.target.value)} type="number"
                              style={{ flex: 1, background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "13px", fontFamily: "inherit" }} />
                            {newExercise.sets.length > 1 && <button onClick={() => removeSet(i)} style={{ background: "transparent", border: "none", color: "#ffffff30", cursor: "pointer", fontSize: "18px" }}>×</button>}
                          </div>
                        ))}
                        <button onClick={addSet} style={{ width: "100%", padding: "9px", borderRadius: "8px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff60", fontSize: "12px", fontFamily: "inherit", cursor: "pointer", marginBottom: "8px" }}>+ Add Set</button>
                      </>
                    )}

                    <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                      <button onClick={saveExercise} style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #e94560, #f5a623)", color: "#fff", fontSize: "12px", fontFamily: "inherit", cursor: "pointer", fontWeight: "600" }}>Save</button>
                      <button onClick={() => { setShowAddExercise(false); setNewExercise({ name: "", type: "weights", sets: [{ reps: "", weight: "" }], duration: "", distance: "" }); }} style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff60", fontSize: "12px", fontFamily: "inherit", cursor: "pointer" }}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "48px 20px", color: "#ffffff30", fontSize: "14px" }}>😴 Rest day — recovery is part of the process</div>
          )}
        </div>
      )}

      {/* ── PROGRESS VIEW ── */}
      {view === "progress" && (
        <div style={{ padding: "16px" }}>
          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
            {[
              { label: "WORKOUTS", val: totalWorkouts, color: "#e94560" },
              { label: "STREAK", val: `🔥 ${streak}`, color: "#f5a623" },
              { label: "GAINED", val: `${parseFloat(weightGain) > 0 ? "+" : ""}${weightGain} lbs`, color: "#4ecdc4" },
            ].map(s => (
              <div key={s.label} style={{ background: "#111", borderRadius: "10px", border: "1px solid #ffffff10", padding: "14px 10px", textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "700", color: s.color }}>{s.val}</div>
                <div style={{ fontSize: "9px", color: "#ffffff40", letterSpacing: "0.08em", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Body weight */}
          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>BODY WEIGHT</div>
              <button onClick={() => setShowWeightPrompt(true)} style={{ padding: "5px 10px", borderRadius: "12px", border: "1px solid #4ecdc440", background: "#4ecdc410", color: "#4ecdc4", fontSize: "10px", fontFamily: "inherit", cursor: "pointer" }}>+ Log</button>
            </div>
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "16px" }}>
                {[{ l: "START", v: `${startWeight} lbs`, c: "#ffffff60" }, { l: "NOW", v: `${currentWeight} lbs`, c: "#4ecdc4" }, { l: "GOAL", v: "185 lbs", c: "#f5a623" }].map(s => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: s.c }}>{s.v}</div>
                    <div style={{ fontSize: "10px", color: "#ffffff30" }}>{s.l}</div>
                  </div>
                ))}
              </div>
              {bodyWeights.length > 1 ? (
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "70px" }}>
                  {bodyWeights.map((w, i) => {
                    const mn = Math.min(...bodyWeights.map(x => x.weight)) - 2;
                    const mx = Math.max(...bodyWeights.map(x => x.weight)) + 2;
                    const h = ((w.weight - mn) / (mx - mn)) * 100;
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <div style={{ fontSize: "8px", color: "#ffffff40" }}>{w.weight}</div>
                        <div style={{ width: "100%", height: `${Math.max(h, 5)}%`, background: i === bodyWeights.length - 1 ? "#4ecdc4" : "#ffffff20", borderRadius: "3px 3px 0 0" }} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", color: "#ffffff30", fontSize: "12px", padding: "12px 0" }}>Log weight after workouts to see your chart</div>
              )}
            </div>
          </div>

          {/* Exercise PRs */}
          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>EXERCISE PRs</div>
            {Object.keys(exerciseProgress).length === 0 ? (
              <div style={{ padding: "24px 16px", textAlign: "center", color: "#ffffff30", fontSize: "13px" }}>Complete workouts to track PRs</div>
            ) : (
              Object.entries(exerciseProgress).map(([name, entries]) => {
                const max = Math.max(...entries.map(e => e.weight));
                const first = entries[0]?.weight;
                const gained = (max - first).toFixed(0);
                return (
                  <div key={name} style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>{name}</div>
                      <div style={{ fontSize: "12px", color: "#f5a623" }}>🏆 {max} lbs{gained > 0 ? ` (+${gained})` : ""}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "30px" }}>
                      {entries.map((e, i) => {
                        const mn = Math.min(...entries.map(x => x.weight)) - 5;
                        const mx = Math.max(...entries.map(x => x.weight)) + 5;
                        const h = ((e.weight - mn) / (mx - mn)) * 100;
                        return <div key={i} style={{ flex: 1, height: `${Math.max(h, 5)}%`, background: i === entries.length - 1 ? "#e94560" : "#ffffff20", borderRadius: "2px 2px 0 0" }} />;
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ── HISTORY VIEW ── */}
      {view === "history" && (
        <div style={{ padding: "16px" }}>
          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>WORKOUT HISTORY</div>
              <div style={{ fontSize: "12px", color: "#f5a623" }}>{totalWorkouts} total</div>
            </div>
            {workoutHistory.length === 0 ? (
              <div style={{ padding: "32px 16px", textAlign: "center", color: "#ffffff30", fontSize: "13px" }}>No workouts logged yet — hit Start Workout!</div>
            ) : (
              workoutHistory.map(session => (
                <div key={session.id} style={{ padding: "14px 16px", borderBottom: "1px solid #ffffff08" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>{session.day}</div>
                      <div style={{ fontSize: "11px", color: "#ffffff40" }}>{formatDate(session.date)}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "14px", color: "#4ecdc4", fontWeight: "600" }}>{formatDuration(session.duration)}</div>
                      <div style={{ fontSize: "11px", color: "#ffffff40" }}>{session.exercises.length} exercises</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {session.exercises.map(ex => (
                      <div key={ex.id} style={{ padding: "3px 8px", borderRadius: "6px", background: "#1a1a1a", border: "1px solid #ffffff10", fontSize: "11px", color: "#ffffff60" }}>{ex.name}</div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
