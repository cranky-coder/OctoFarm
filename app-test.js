const {
  setupExpressServer,
  serveOctoFarmNormally,
  ensureSystemSettingsInitiated
} = require("./app-core");
const { setupEnvConfig, fetchOctoFarmPort } = require("./app-env");
const { serveDatabaseIssueFallback } = require("./app-fallbacks");

let httpListener;

async function setupTestApp() {
  setupEnvConfig(true);
  const octoFarmTestServer = setupExpressServer();
  await ensureSystemSettingsInitiated().catch();

  // Save listener as state for tests
  httpListener = await serveOctoFarmNormally(
    octoFarmTestServer,
    fetchOctoFarmPort()
  );

  // const stringRouteMap = JSON.stringify(getEndpoints(octoFarmTestServer).map(r => r.path));
  return octoFarmTestServer;
}

async function setupDatabaseIssueApp() {
  setupEnvConfig(true);

  const octoFarmTestServer = setupExpressServer();
  httpListener = await serveDatabaseIssueFallback(
    octoFarmTestServer,
    fetchOctoFarmPort()
  );

  // const stringRouteMap = JSON.stringify(getEndpoints(octoFarmTestServer).map(r => r.path));
  // console.log("Server db issue routes:", stringRouteMap);
  return octoFarmTestServer;
}

function getServer() {
  return httpListener;
}

module.exports = {
  setupTestApp,
  setupDatabaseIssueApp,
  getServer
};
