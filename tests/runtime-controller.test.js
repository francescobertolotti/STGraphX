"use strict";

const assert = require("assert");

require("../runtime-controller.js");

async function run() {
  let intervalCallback = null;
  let initialized = false;
  let refreshCount = 0;
  const execution = {
    t0: 0,
    dt: 1,
    t1: 10,
    delayMs: 1,
    renderEverySteps: 3,
    currentTime: null,
  };
  const timedState = {
    timedRunHandle: null,
    timedStepRunning: false,
    timedRunStartedAt: 0,
    timedStepLastActivityAt: 0,
  };
  const controller = globalThis.STGraphXRuntimeController.createRuntimeController({
    session: {
      hasInitializedStateSnapshot: () => initialized,
      clearSubmodelState: () => {},
      initializeAt: () => { initialized = true; },
      promotePending: () => {},
      evaluateAtTime: () => ({ successCount: 1, errorCount: 0 }),
    },
    getExecution: () => execution,
    timedState,
    t: (key) => key,
    enforceStrictDefinitions: () => true,
    ensureBreakpointReady: () => true,
    prepareForExecution: async () => true,
    isExecutionEnded: () => false,
    refreshRuntimeView: () => { refreshCount += 1; },
    render: () => {},
    updateEditingLockUi: () => {},
    setStatusKey: () => {},
    setStatus: () => {},
    formatNumberValue: (value) => String(value),
    evaluateBreakpointConditionAtTime: () => ({ hit: false, invalid: false }),
    clearVisualHistory: () => {},
    clearSimulationHistory: () => {},
    setIntervalFn: (callback) => {
      intervalCallback = callback;
      return 1;
    },
    clearIntervalFn: () => {},
  });

  await controller.toggleTimedExecution();
  assert.equal(refreshCount, 1, "a timed run refreshes once before its first step");
  await intervalCallback();
  assert.equal(execution.currentTime, 2, "a timed tick evaluates the configured number of steps");
  assert.equal(refreshCount, 2, "each timed tick refreshes the view once");
  await intervalCallback();
  assert.equal(execution.currentTime, 5, "subsequent timed ticks retain the same step batch size");
  assert.equal(refreshCount, 3, "the visual refresh cadence remains the timer delay");
  controller.stopTimedExecution(false);

  let developmentInitialized = false;
  let developmentEvaluations = 0;
  let runtimeValue = null;
  const developmentExecution = {
    t0: 0,
    dt: 1,
    t1: 10,
    delayMs: 1,
    renderEverySteps: 1,
    currentTime: null,
  };
  const developmentController = globalThis.STGraphXRuntimeController.createRuntimeController({
    session: {
      hasInitializedStateSnapshot: () => developmentInitialized,
      clearSubmodelState: () => {},
      initializeAt: () => { developmentInitialized = true; },
      promotePending: () => {},
      evaluateAtTime: (time) => {
        developmentEvaluations += 1;
        runtimeValue = time * 10;
        return { successCount: 1, errorCount: 0 };
      },
    },
    getExecution: () => developmentExecution,
    timedState: {
      timedRunHandle: null,
      timedStepRunning: false,
      timedRunStartedAt: 0,
      timedStepLastActivityAt: 0,
    },
    t: (key) => key,
    enforceStrictDefinitions: () => true,
    ensureBreakpointReady: () => true,
    prepareForExecution: async () => true,
    isExecutionEnded: () => false,
    refreshRuntimeView: () => {},
    render: () => {},
    updateEditingLockUi: () => {},
    setStatusKey: () => {},
    setStatus: () => {},
    formatNumberValue: (value) => String(value),
    evaluateBreakpointConditionAtTime: () => ({ hit: false, invalid: false }),
    clearVisualHistory: () => {},
    clearSimulationHistory: () => {},
    isDevelopmentMode: () => true,
    captureDevelopmentSnapshot: () => ({
      executionCurrentTime: developmentExecution.currentTime,
      runtimeValue,
    }),
    restoreDevelopmentSnapshot: (snapshot) => {
      developmentExecution.currentTime = snapshot.executionCurrentTime;
      runtimeValue = snapshot.runtimeValue;
    },
  });

  for (let step = 0; step < 6; step += 1) {
    await developmentController.runManualStep();
  }
  assert.equal(developmentExecution.currentTime, 5, "development mode records each evaluated step");
  assert.equal(developmentEvaluations, 6, "the six initial development steps are evaluated once");
  for (let step = 0; step < 4; step += 1) {
    assert.equal(developmentController.stepBackDevelopmentHistory(), true, "the five-state history can go back four steps");
  }
  assert.equal(developmentExecution.currentTime, 1, "the oldest retained state is restored");
  assert.equal(runtimeValue, 10, "restoring a state restores its runtime values");
  assert.equal(developmentController.stepBackDevelopmentHistory(), false, "states older than the five-step history are unavailable");
  const evaluationsBeforeReplay = developmentEvaluations;
  await developmentController.runManualStep();
  assert.equal(developmentExecution.currentTime, 2, "forward stepping returns to the saved next state");
  assert.equal(runtimeValue, 20, "forward replay restores the saved runtime values");
  assert.equal(developmentEvaluations, evaluationsBeforeReplay, "forward replay does not re-evaluate a saved step");

  console.log("runtime-controller.test.js: ok");
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
