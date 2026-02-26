// ─── MediTrack Shared Data Store ───────────────────────────────────────────

const WARDS = [
  { id: 'icu',      name: 'ICU',           total: 100,  icon: '🫀', color: '#ef4444' },
  { id: 'general',  name: 'General',        total: 120, icon: '🛏️',  color: '#3b82f6' },
  { id: 'pediatric',name: 'Pediatric',      total: 100,  icon: '👶', color: '#a855f7' },
  { id: 'maternity',name: 'Maternity',      total: 100,  icon: '🤱', color: '#ec4899' },
  { id: 'surgical', name: 'Surgical',       total: 50,  icon: '🔬', color: '#f59e0b' },
  { id: 'emergency',name: 'Emergency',      total: 85,  icon: '🚨', color: '#ef4444' },
  { id: 'ortho',    name: 'Orthopedic',     total: 109,  icon: '🦴', color: '#14b8a6' },
  { id: 'oncology', name: 'Oncology',       total: 105,  icon: '🧬', color: '#6366f1' },
];

// Persist state in sessionStorage
function getState() {
  const raw = sessionStorage.getItem('mt_state');
  if (raw) return JSON.parse(raw);
  // Init default state
  const beds = {};
  WARDS.forEach(w => {
    const occupied = Math.floor(w.total * (0.55 + Math.random()*0.35));
    beds[w.id] = {
      total: w.total,
      occupied: occupied,
      maintenance: Math.floor(Math.random()*3),
    };
  });
  const state = {
    beds,
    patients: generatePatients(),
    history: generateHistory(),
    alerts: [
      { id:1, type:'warning', msg:'ICU approaching capacity (90%)', time:'10 min ago', read:false },
      { id:2, type:'info',    msg:'3 patients scheduled for discharge today', time:'25 min ago', read:false },
      { id:3, type:'success', msg:'Emergency ward restocked successfully', time:'1 hr ago', read:true },
    ],
  };
  saveState(state);
  return state;
}

function saveState(state) {
  sessionStorage.setItem('mt_state', JSON.stringify(state));
}

function generatePatients() {
  const names = ['John Smith','Maria Garcia','David Lee','Sarah Johnson','Ahmed Khan','Emily Chen',
    'Robert Wilson','Fatima Ali','James Brown','Lisa Wang','Michael Davis','Priya Sharma',
    'William Taylor','Aisha Mohammed','Thomas Anderson','Sofia Martinez'];
  const wards = WARDS.map(w=>w.id);
  const conditions = ['Stable','Critical','Recovering','Observation','Post-Surgery','Monitoring'];
  const patients = [];
  for(let i=0;i<28;i++){
    const ward = wards[Math.floor(Math.random()*wards.length)];
    patients.push({
      id: 'PT'+String(1000+i).slice(1),
      name: names[i % names.length],
      age: 20 + Math.floor(Math.random()*60),
      ward,
      bed: Math.floor(Math.random()*20)+1,
      admitted: new Date(Date.now() - Math.random()*10*86400000).toLocaleDateString(),
      condition: conditions[Math.floor(Math.random()*conditions.length)],
      doctor: ['Dr. Patel','Dr. Kim','Dr. Rodriguez','Dr. Hassan'][Math.floor(Math.random()*4)],
    });
  }
  return patients;
}

function generateHistory() {
  const history = [];
  const now = Date.now();
  for(let day=13;day>=0;day--){
    const ts = now - day*86400000;
    const dateStr = new Date(ts).toLocaleDateString('en',{month:'short',day:'numeric'});
    WARDS.forEach(w=>{
      const occ = Math.floor(w.total*(0.55+Math.random()*0.35));
      history.push({ date: dateStr, ward: w.id, occupied: occ, total: w.total });
    });
  }
  return history;
}

// Prediction model: simple linear regression + seasonality
function predict(wardId, days=7) {
  const state = getState();
  const wData = getState().history.filter(h=>h.ward===wardId);
  const rates = wData.map(h=>h.occupied/h.total);
  const avg = rates.reduce((a,b)=>a+b,0)/rates.length;
  const trend = (rates[rates.length-1] - rates[0]) / rates.length * 0.3;
  const preds = [];
  for(let d=1;d<=days;d++){
    const seasonal = Math.sin(d/7*Math.PI)*0.05;
    const rate = Math.min(1, Math.max(0, avg + trend*d + seasonal + (Math.random()-0.5)*0.04));
    const ward = WARDS.find(w=>w.id===wardId);
    preds.push({
      day: d,
      date: new Date(Date.now()+d*86400000).toLocaleDateString('en',{month:'short',day:'numeric'}),
      predicted: Math.round(rate * ward.total),
      total: ward.total,
      rate: Math.round(rate*100),
    });
  }
  return preds;
}

function getUser() {
  const raw = sessionStorage.getItem('mt_user');
  if(!raw) { window.location.href='../index.html'; return null; }
  return JSON.parse(raw);
}

function logout() {
  sessionStorage.removeItem('mt_user');
  window.location.href = '../index.html';
}
