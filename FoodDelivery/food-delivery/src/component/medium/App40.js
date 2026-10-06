import React, { useState, useEffect, useRef } from "react";

// Mock API Call simulating network latency and random failures
const mockFetchTask = (taskId, failureRate = 0.3) => {
  return new Promise((resolve, reject) => {
    const latency = Math.floor(Math.random() * 1500) + 500;
    setTimeout(() => {
      if (Math.random() < failureRate) {
        reject(new Error(`Network error on task #${taskId}`));
      } else {
        resolve({ taskId, status: "Success", duration: `${latency}ms` });
      }
    }, latency);
  });
};

// Async Task Scheduler Class
class TaskScheduler {
  constructor(concurrencyLimit = 2, maxRetries = 2) {
    this.concurrencyLimit = concurrencyLimit;
    this.maxRetries = maxRetries;
    this.queue = [];
    this.activeCount = 0;
    this.onStatusUpdate = null; // UI state sync listener
  }

  // Enqueue job with tracking metadata
  addTask(taskId, taskFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        taskId,
        taskFn,
        retryCount: 0,
        resolve,
        reject,
      });
      this.processQueue();
    });
  }

  processQueue() {
    // Fill execution slots up to maximum concurrency limit
    while (this.activeCount < this.concurrencyLimit && this.queue.length > 0) {
      const task = this.queue.shift();
      this.activeCount++;
      this.executeTask(task);
    }
    if (this.onStatusUpdate) {
      this.onStatusUpdate(this.getStatus());
    }
  }

  async executeTask(task) {
    if (this.onStatusUpdate)
      this.onStatusUpdate(this.getStatus(), task.taskId, "RUNNING");

    try {
      const result = await task.taskFn();
      this.activeCount--;
      if (this.onStatusUpdate)
        this.onStatusUpdate(this.getStatus(), task.taskId, "COMPLETED");
      task.resolve(result);
    } catch (error) {
      if (task.retryCount < this.maxRetries) {
        task.retryCount++;
        const backoffDelay = Math.pow(2, task.retryCount) * 200; // Exponential backoff (400ms, 800ms)

        if (this.onStatusUpdate) {
          this.onStatusUpdate(
            this.getStatus(),
            task.taskId,
            `RETRYING (${task.retryCount}/${this.maxRetries})`,
          );
        }

        setTimeout(() => {
          // Re-queue failed task at high priority (front of queue)
          this.queue.unshift(task);
          this.activeCount--;
          this.processQueue();
        }, backoffDelay);
      } else {
        this.activeCount--;
        if (this.onStatusUpdate)
          this.onStatusUpdate(this.getStatus(), task.taskId, "FAILED");
        task.reject(error);
      }
    } finally {
      this.processQueue();
    }
  }

  getStatus() {
    return {
      active: this.activeCount,
      queued: this.queue.length,
    };
  }
}

// React UI Interface Component
const AsyncQueueScheduler = () => {
  const [tasks, setTasks] = useState([]);
  const [queueMetrics, setQueueMetrics] = useState({ active: 0, queued: 0 });
  const schedulerRef = useRef(null);

  // Initialize persistent TaskScheduler instance
  if (!schedulerRef.current) {
    schedulerRef.current = new TaskScheduler(2, 2); // Max 2 concurrent requests, max 2 retries
  }

  useEffect(() => {
    schedulerRef.current.onStatusUpdate = (metrics, taskId, status) => {
      setQueueMetrics(metrics);
      if (taskId && status) {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, status } : t)),
        );
      }
    };
  }, []);

  const handleAddBatch = () => {
    const newTasks = Array.from({ length: 6 }, (_, i) => {
      const taskId = tasks.length + i + 1;
      return { id: taskId, status: "QUEUED" };
    });

    setTasks((prev) => [...prev, ...newTasks]);

    newTasks.forEach((task) => {
      schedulerRef.current
        .addTask(task.id, () => mockFetchTask(task.id, 0.4))
        .catch((err) =>
          console.log(`Task #${task.id} permanently failed:`, err.message),
        );
    });
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h3>Async Task Scheduler (Concurrency Limit: 2)</h3>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        Throttles concurrent async promises to <strong>2 at a time</strong>.
        Failed requests automatically attempt{" "}
        <strong>exponential backoff retries</strong> up to 2 times.
      </p>

      {/* Control Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <button
          onClick={handleAddBatch}
          style={{
            padding: "8px 16px",
            background: "#0066cc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ➕ Dispatch 6 Parallel Requests
        </button>

        <div style={{ fontSize: "0.85rem", color: "#333" }}>
          Active: <strong>{queueMetrics.active}</strong> | Queued:{" "}
          <strong>{queueMetrics.queued}</strong>
        </div>
      </div>

      {/* Task Monitor Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {tasks.map((t) => {
          const isRunning = t.status === "RUNNING";
          const isSuccess = t.status === "COMPLETED";
          const isFailed = t.status === "FAILED";
          const isRetrying = t.status.startsWith("RETRYING");

          return (
            <div
              key={t.id}
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                background: isSuccess
                  ? "#e8f5e9"
                  : isFailed
                    ? "#ffebee"
                    : isRetrying
                      ? "#fff3e0"
                      : isRunning
                        ? "#e3f2fd"
                        : "#f8f9fa",
                fontSize: "0.85rem",
              }}
            >
              <div style={{ fontWeight: "bold" }}>Task #{t.id}</div>
              <div
                style={{
                  fontSize: "0.75rem",
                  marginTop: "4px",
                  color: isSuccess
                    ? "#2e7d32"
                    : isFailed
                      ? "#c62828"
                      : isRunning
                        ? "#1565c0"
                        : "#666",
                }}
              >
                {t.status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AsyncQueueScheduler;
