
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const initialMetrics = [
  { time: "10:00", cpu: 24, memory: 42 },
  { time: "10:05", cpu: 32, memory: 45 },
  { time: "10:10", cpu: 28, memory: 43 },
  { time: "10:15", cpu: 45, memory: 52 },
  { time: "10:20", cpu: 36, memory: 48 },
  { time: "10:25", cpu: 29, memory: 44 },
];

const initialIncidents = [
  {
    id: 1,
    service: "Payment API",
    issue: "Memory usage exceeded threshold",
    severity: "High",
    status: "Detected",
  },
  {
    id: 2,
    service: "User Service",
    issue: "Increased response time",
    severity: "Medium",
    status: "Monitoring",
  },
];

function App() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [recoveryLog, setRecoveryLog] = useState([]);
  const [notice, setNotice] = useState("");

  function simulateRecovery(incident) {
    setIncidents((current) =>
      current.map((item) =>
        item.id === incident.id
          ? { ...item, status: "Recovery simulated" }
          : item
      )
    );

    setRecoveryLog((current) => [
      {
        id: Date.now(),
        service: incident.service,
        action: "Recovery simulation",
        time: new Date().toLocaleTimeString(),
      },
      ...current,
    ]);

    setNotice(
      `Demo recovery recorded for ${incident.service}. No real service was restarted.`
    );
  }

  const activeCount = incidents.filter(
    (item) => item.status !== "Recovery simulated"
  ).length;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">SH</div>
          <div>
            <strong>HealOps AI</strong>
            <small>SELF-HEALING PLATFORM</small>
          </div>
        </div>

        <p className="nav-label">WORKSPACE</p>
        <div className="nav-item active">▦ &nbsp; Overview</div>
        <div className="nav-item">⌁ &nbsp; Monitoring</div>
        <div className="nav-item">⚠ &nbsp; Incidents</div>
        <div className="nav-item">⟳ &nbsp; Recovery History</div>
        <div className="nav-item">⚙ &nbsp; Settings</div>

        <div className="sidebar-bottom">
          <span className="status-dot" />
          Demo environment
          <small>Backend not connected</small>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">DEVOPS / OVERVIEW</p>
            <h1>System Overview</h1>
            <p className="subtitle">
              Monitor infrastructure health and manage incidents.
            </p>
          </div>
          <div className="environment">
            <span className="status-dot" /> Demo Mode
          </div>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">AI-POWERED OPERATIONS</p>
            <h2>Your infrastructure, intelligently protected.</h2>
            <p>
              Detect anomalies, investigate failures, and track recovery
              actions from one dashboard.
            </p>
          </div>
          <div className="welcome-icon">✳</div>
        </section>

        <section className="metrics">
          <article className="metric-card">
            <p>Application Health</p>
            <h2><span className="health-dot" /> Healthy</h2>
            <small>Demo status · not live monitoring</small>
          </article>
          <article className="metric-card">
            <p>CPU Utilization</p>
            <h2>29%</h2>
            <div className="progress"><span style={{ width: "29%" }} /></div>
            <small>Sample metric</small>
          </article>
          <article className="metric-card">
            <p>Memory Utilization</p>
            <h2>44%</h2>
            <div className="progress memory"><span style={{ width: "44%" }} /></div>
            <small>Sample metric</small>
          </article>
          <article className="metric-card">
            <p>Active Incidents</p>
            <h2>{activeCount}</h2>
            <small>Unresolved demo incidents</small>
          </article>
        </section>

        <section className="content-grid">
          <article className="panel chart-panel">
            <div className="panel-heading">
              <div>
                <h3>Resource Utilization</h3>
                <p>CPU and memory · sample data</p>
              </div>
              <span className="tag">Last 30 minutes</span>
            </div>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={initialMetrics}>
                  <defs>
                    <linearGradient id="cpuFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="memoryFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#7c879e" fontSize={11} />
                  <YAxis stroke="#7c879e" fontSize={11} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="cpu"
                    name="CPU %"
                    stroke="#818cf8"
                    fill="url(#cpuFill)"
                  />
                  <Area
                    type="monotone"
                    dataKey="memory"
                    name="Memory %"
                    stroke="#34d399"
                    fill="url(#memoryFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="panel ai-panel">
            <div className="panel-heading">
              <div>
                <h3>AI Insights</h3>
                <p>Example diagnostic summary</p>
              </div>
              <span className="ai-icon">✳</span>
            </div>
            <div className="insight">
              <span className="severity high">HIGH</span>
              <h4>Memory pressure detected</h4>
              <p>
                The sample Payment API incident indicates possible memory
                pressure. Logs and live metrics are not connected yet.
              </p>
              <div className="recommendation">
                <strong>Suggested investigation</strong>
                <p>Inspect container memory, recent logs, and application changes.</p>
              </div>
            </div>
          </article>
        </section>

        <section className="panel incidents-panel">
          <div className="panel-heading">
            <div>
              <h3>Incident Center</h3>
              <p>Investigate sample incidents and test the demo workflow.</p>
            </div>
            <span className="tag">{activeCount} active</span>
          </div>

          {notice && <div className="notice">{notice}</div>}

          <div className="incident-list">
            {incidents.map((incident) => (
              <div className="incident-row" key={incident.id}>
                <div className="incident-symbol">!</div>
                <div className="incident-info">
                  <strong>{incident.service}</strong>
                  <p>{incident.issue}</p>
                </div>
                <span
                  className={`severity ${
                    incident.severity === "High" ? "high" : "medium"
                  }`}
                >
                  {incident.severity}
                </span>
                <span className="incident-status">{incident.status}</span>
                {incident.status !== "Recovery simulated" ? (
                  <button
                    className="action-button"
                    onClick={() => simulateRecovery(incident)}
                  >
                    Test recovery
                  </button>
                ) : (
                  <span className="completed">Demo recorded ✓</span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="panel history-panel">
          <div className="panel-heading">
            <div>
              <h3>Recovery History</h3>
              <p>Actions recorded during this browser session.</p>
            </div>
          </div>
          {recoveryLog.length === 0 ? (
            <p className="empty-state">
              No recovery actions yet. Use “Test recovery” above to try the demo.
            </p>
          ) : (
            recoveryLog.map((entry) => (
              <div className="history-row" key={entry.id}>
                <span className="health-dot" />
                <div>
                  <strong>{entry.action}</strong>
                  <p>{entry.service} · {entry.time}</p>
                </div>
                <span className="tag">Simulated</span>
              </div>
            ))
          )}
        </section>

        <footer>
          HealOps AI · Development prototype · Metrics and recovery are simulated
        </footer>
      </main>
    </div>
  );
}

export default App;
