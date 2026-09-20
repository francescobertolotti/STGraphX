/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

(function initRuntimeController(global) {
  function createRuntimeController(options = {}) {
    const {
      session,
      getExecution,
      timedState,
      t,
      enforceStrictDefinitions,
      ensureBreakpointReady,
      prepareForExecution,
      isExecutionEnded,
      refreshRuntimeView,
      render,
      updateEditingLockUi,
      setStatusKey,
      setStatus,
      formatNumberValue,
      formatExecutionDuration,
      evalReasonText,
      evaluateBreakpointConditionAtTime,
      openWatchDebugger,
      clearVisualHistory,
      clearSimulationHistory,
      onTimedExecutionStarted = null,
      onTimedExecutionStopped = null,
      hasStrictExecutionBlock = () => false,
      buildEvaluationEnv = null,
      setIntervalFn = global.setInterval?.bind(global),
      clearIntervalFn = global.clearInterval?.bind(global),
      nowFn = () => Date.now(),
      monotonicNowFn = () => (global.performance?.now ? global.performance.now() : Date.now()),
    } = options;

    if (!session || typeof getExecution !== "function" || !timedState || !t) {
      throw new Error("STGraphXRuntimeController requires session, execution access, timedState, and translation dependencies");
    }

    function validateTimeConfig() {
      const execution = getExecution();
      const t0 = Number(execution?.t0);
      const dt = Number(execution?.dt);
      const t1 = Number(execution?.t1);
      if (!Number.isFinite(t0) || !Number.isFinite(dt) || !Number.isFinite(t1)) {
        setStatusKey?.("error.timeInvalid");
        return null;
      }
      if (dt < 0) {
        setStatusKey?.("error.timeStepNegative");
        return null;
      }
      if (t1 <= t0) {
        setStatusKey?.("error.timeEndAfterStart");
        return null;
      }
      if (dt === 0) {
        setStatusKey?.("error.timeStepZero");
        return null;
      }
      return { t0, dt, t1 };
    }

    function clearTimedExecutionStateSilently() {
      if (timedState.timedRunHandle != null) {
        clearIntervalFn?.(timedState.timedRunHandle);
      }
      timedState.timedRunHandle = null;
      timedState.timedStepRunning = false;
      timedState.timedRunStartedAt = 0;
      timedState.timedStepLastActivityAt = 0;
    }

    function stopTimedExecution(updateStatus = true, reason = "stopped") {
      const hadHandle = timedState.timedRunHandle != null;
      const wasRunningStep = timedState.timedStepRunning === true;
      clearTimedExecutionStateSilently();
      if (hadHandle || wasRunningStep) {
        updateEditingLockUi?.();
        if (updateStatus) {
          setStatusKey?.("status.timedStopped");
        }
        render?.();
        onTimedExecutionStopped?.({ reason });
      }
    }

    function evaluationEnv() {
      return typeof buildEvaluationEnv === "function"
        ? buildEvaluationEnv()
        : { rootExecution: getExecution(), stack: [] };
    }

    function hasReachedExecutionEnd(timeValue, cfg) {
      const epsilon = Math.max(1e-12, Math.abs(cfg.dt) * 1e-9);
      if (cfg.dt > 0) {
        return timeValue >= cfg.t1 - epsilon;
      }
      return timeValue <= cfg.t1 + epsilon;
    }

    function visualRefreshInterval(execution) {
      const value = Number(execution?.renderEverySteps);
      return Number.isFinite(value) && value >= 1 ? Math.round(value) : 1;
    }

    function refreshAfterStep(force = false) {
      refreshRuntimeView?.({ force });
      return true;
    }

    async function ensureExecutionReady() {
      if (!enforceStrictDefinitions?.()) {
        return null;
      }
      if (!ensureBreakpointReady?.()) {
        return null;
      }
      if (!(await prepareForExecution?.())) {
        return null;
      }
      return validateTimeConfig();
    }

    async function executeOneStep(restartIfEnded = true, { refreshView = true } = {}) {
      const execution = getExecution();
      const cfg = await ensureExecutionReady();
      if (!cfg) {
        return false;
      }

      let restarted = false;
      const hasStateSnapshot = session.hasInitializedStateSnapshot();
      if (isExecutionEnded(cfg)) {
        if (!restartIfEnded) {
          setStatusKey?.("status.evalDone", {
            count: 0,
            time: formatNumberValue?.(Number(execution.currentTime ?? cfg.t0)),
          });
          return { ok: false, breakpointHit: false, completed: true };
        }
        execution.currentTime = null;
        restarted = true;
      }
      if (execution.currentTime != null && !hasStateSnapshot) {
        execution.currentTime = null;
        restarted = true;
      }
      const nextTime = execution.currentTime == null ? cfg.t0 : execution.currentTime + cfg.dt;

      const startingFresh = execution.currentTime == null;
      if (restarted) {
        clearVisualHistory?.();
        clearSimulationHistory?.();
      } else if (startingFresh) {
        clearSimulationHistory?.();
      }

      if (execution.currentTime == null) {
        session.clearSubmodelState();
        session.initializeAt(nextTime);
      } else {
        session.promotePending();
      }

      const stepResult = session.evaluateAtTime(nextTime, evaluationEnv());
      execution.currentTime = nextTime;
      const breakpointResult = evaluateBreakpointConditionAtTime?.(nextTime) || { hit: false, invalid: false };

      if (breakpointResult.invalid) {
        if (refreshView) {
          refreshAfterStep(true);
        }
        setStatus?.(
          t("error.breakpointInvalid", {
            reason: breakpointResult.message || t("error.evalReason.runtime"),
          }),
          true,
        );
        openWatchDebugger?.();
        return { ok: false, breakpointHit: false };
      }

      if (breakpointResult.hit) {
        if (refreshView) {
          refreshAfterStep(true);
        }
        setStatusKey?.("status.breakpointHit", {
          time: formatNumberValue?.(Number(nextTime)),
        });
        openWatchDebugger?.();
        return { ok: true, breakpointHit: true, completed: false };
      }

      const completed = hasReachedExecutionEnd(nextTime, cfg);

      if (restarted && stepResult.errorCount === 0) {
        setStatusKey?.("status.executionRestarted", {
          time: formatNumberValue?.(Number(nextTime)),
          count: stepResult.successCount,
        });
      } else if (stepResult.errorCount > 0) {
        setStatusKey?.("error.evalStepFailed", {
          node: stepResult.firstErrorNode,
          reason: evalReasonText?.(stepResult.firstErrorReason),
          time: formatNumberValue?.(Number(nextTime)),
        });
      } else if (completed) {
        setStatusKey?.("status.evalDone", {
          count: stepResult.successCount,
          time: formatNumberValue?.(Number(nextTime)),
        });
      }
      if (refreshView) {
        refreshAfterStep(stepResult.errorCount > 0 || completed);
      }
      return { ok: true, breakpointHit: false, completed };
    }

    async function executeAll() {
      const execution = getExecution();
      if (!enforceStrictDefinitions?.()) {
        return;
      }
      if (!ensureBreakpointReady?.()) {
        return;
      }
      if (!(await prepareForExecution?.())) {
        return;
      }
      stopTimedExecution(false);
      const cfg = validateTimeConfig();
      if (!cfg) {
        return;
      }

      let continuing = execution.currentTime != null && session.hasInitializedStateSnapshot();
      if (continuing && isExecutionEnded(cfg)) {
        continuing = false;
      }

      if (!continuing) {
        execution.currentTime = null;
        clearVisualHistory?.();
        clearSimulationHistory?.();
        session.clearSubmodelState();
        session.initializeAt(cfg.t0);
        refreshRuntimeView?.();
      }

      const execStartedAt = monotonicNowFn();
      const maxSteps = 100000;
      const epsilon = Math.max(1e-12, Math.abs(cfg.dt) * 1e-9);
      const timeValues = [];
      let current = continuing ? execution.currentTime + cfg.dt : cfg.t0;
      for (let i = 0; i < maxSteps; i += 1) {
        if ((cfg.dt > 0 && current > cfg.t1 + epsilon) || (cfg.dt < 0 && current < cfg.t1 - epsilon)) {
          break;
        }
        timeValues.push(current);
        current += cfg.dt;
      }

      if (timeValues.length === 0) {
        setStatusKey?.("error.timeInvalid");
        return;
      }
      if (timeValues.length >= maxSteps) {
        setStatusKey?.("error.timeTooManySteps", { max: maxSteps });
        return;
      }

      let successCount = 0;
      let totalErrorCount = 0;
      let firstErrorNode = null;
      let firstErrorReason = null;
      let firstErrorTime = null;
      let lastTime = timeValues[timeValues.length - 1];
      let breakpointHit = false;

      for (let idx = 0; idx < timeValues.length; idx += 1) {
        const timeValue = timeValues[idx];
        if (continuing || idx > 0) {
          session.promotePending();
        }
        const stepResult = session.evaluateAtTime(timeValue, evaluationEnv());
        successCount = stepResult.successCount;
        totalErrorCount += stepResult.errorCount;
        if (!firstErrorNode && stepResult.firstErrorNode) {
          firstErrorNode = stepResult.firstErrorNode;
          firstErrorReason = stepResult.firstErrorReason;
          firstErrorTime = timeValue;
        }
        lastTime = timeValue;
        const breakpointResult = evaluateBreakpointConditionAtTime?.(timeValue) || { hit: false, invalid: false };
        if (breakpointResult.invalid) {
          refreshRuntimeView?.();
          setStatus?.(
            t("error.breakpointInvalid", {
              reason: breakpointResult.message || t("error.evalReason.runtime"),
            }),
            true,
          );
          openWatchDebugger?.();
          return;
        }
        if (breakpointResult.hit) {
          breakpointHit = true;
          break;
        }
      }

      execution.currentTime = lastTime;
      refreshRuntimeView?.();

      if (breakpointHit) {
        setStatusKey?.("status.breakpointHit", {
          time: formatNumberValue?.(Number(lastTime)),
        });
        openWatchDebugger?.();
      } else if (firstErrorNode) {
        setStatusKey?.("error.evalFailedDetailedTime", {
          node: firstErrorNode,
          count: totalErrorCount,
          reason: evalReasonText?.(firstErrorReason),
          time: formatNumberValue?.(Number(firstErrorTime)),
        });
      } else {
        setStatusKey?.("status.evalDoneTime", {
          count: successCount,
          steps: timeValues.length,
          time: formatNumberValue?.(Number(lastTime)),
          duration: formatExecutionDuration?.(monotonicNowFn() - execStartedAt),
        });
      }
    }

    async function runManualStep() {
      if (!enforceStrictDefinitions?.()) {
        return;
      }
      stopTimedExecution(false);
      await executeOneStep(true);
    }

    async function resetExecution() {
      stopTimedExecution(false);
      if (!(await prepareForExecution?.())) {
        return;
      }
      const execution = getExecution();
      const cfg = validateTimeConfig();
      if (!cfg) {
        return;
      }
      execution.currentTime = null;
      clearVisualHistory?.();
      clearSimulationHistory?.();
      session.clearSubmodelState();
      session.initializeAt(cfg.t0);
      // Reset also restores the t0 preview, including outputs fed by submodels.
      session.evaluateAtTime(cfg.t0, evaluationEnv());
      refreshRuntimeView?.();
      setStatusKey?.("status.executionReset", { time: formatNumberValue?.(Number(cfg.t0)) });
    }

    async function toggleTimedExecution() {
      const execution = getExecution();
      if (timedState.timedRunHandle != null) {
        stopTimedExecution(true, "stopped");
        return;
      }

      const cfg = await ensureExecutionReady();
      const delayMs = Number(execution.delayMs);
      if (!cfg) {
        return;
      }
      if (!Number.isFinite(delayMs) || delayMs <= 0) {
        setStatusKey?.("error.timeDelayInvalid");
        return;
      }

      const ended = isExecutionEnded(cfg);
      const isFreshStart = execution.currentTime == null || ended || !session.hasInitializedStateSnapshot();
      if (isFreshStart) {
        clearVisualHistory?.();
        if (ended) {
          execution.currentTime = null;
        }
        refreshRuntimeView?.();
      }

      timedState.timedStepRunning = false;
      timedState.timedRunStartedAt = nowFn();
      timedState.timedStepLastActivityAt = timedState.timedRunStartedAt;
      updateEditingLockUi?.();

      timedState.timedRunHandle = setIntervalFn(async () => {
        if (timedState.timedStepRunning) {
          return;
        }
        timedState.timedStepRunning = true;
        timedState.timedStepLastActivityAt = nowFn();
        updateEditingLockUi?.();
        try {
          const stepsPerRefresh = visualRefreshInterval(execution);
          let outcome = null;
          for (let step = 0; step < stepsPerRefresh; step += 1) {
            outcome = await executeOneStep(false, { refreshView: false });
            if (!outcome?.ok || outcome.completed || outcome.breakpointHit) {
              break;
            }
          }
          // The delay controls the visual cadence. renderEverySteps only batches
          // calculations between two visual updates.
          if (outcome) {
            refreshRuntimeView?.({
              force: !outcome.ok || outcome.completed || outcome.breakpointHit,
            });
          }
          if (!outcome || !outcome.ok) {
            stopTimedExecution(false, outcome?.completed ? "completed" : "stopped");
            if (!outcome?.completed && !(hasStrictExecutionBlock?.())) {
              setStatusKey?.("status.timedStopped");
            }
          } else if (outcome.completed) {
            stopTimedExecution(false, "completed");
          } else if (outcome.breakpointHit) {
            stopTimedExecution(false, "breakpoint");
            setStatusKey?.("status.breakpointHit", {
              time: formatNumberValue?.(Number(execution.currentTime)),
            });
            openWatchDebugger?.();
          }
        } catch (err) {
          stopTimedExecution(false, "error");
          setStatus?.(err?.message || t("error.evalReason.runtime"), true);
        } finally {
          timedState.timedStepRunning = false;
          timedState.timedStepLastActivityAt = nowFn();
          updateEditingLockUi?.();
        }
      }, delayMs);

      setStatusKey?.("status.timedStarted", { delay: delayMs });
      render?.();
      onTimedExecutionStarted?.({ delay: delayMs });
    }

    return {
      validateTimeConfig,
      stopTimedExecution,
      executeOneStep,
      executeAll,
      runManualStep,
      resetExecution,
      toggleTimedExecution,
    };
  }

  global.STGraphXRuntimeController = {
    createRuntimeController,
  };
})(globalThis);
