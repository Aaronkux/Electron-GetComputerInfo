const si = require("systeminformation");

async function getCpuInfo() {
  const cpuInfo = await si.cpu();
  const { manufacturer, brand, speedmax } = cpuInfo;
  return `${manufacturer} ${brand} @ ${speedmax}GHz`;
}

async function getComputerName() {
  const osInfo = await si.osInfo();
  const { distro, hostname } = osInfo;
  return { systemVersion: distro, computerName: hostname };
}

async function getMemoryInfo() {
  const memInfo = await si.mem();
  const { total } = memInfo;
  return `${Math.round(total / Math.pow(1024, 3))}GB`;
}

async function getDisksInfo() {
  const disksInfo = await si.diskLayout();
  return disksInfo.map(
    (disk) => `${disk.name} ${Math.floor(disk.size / Math.pow(1024, 3))}GB`
  );
}

async function getGraphicsInfo() {
  const graphicsInfo = await si.graphics();
  return graphicsInfo.controllers.map((graphics) => graphics.model);
}

async function getComputerInfo() {
  const cpuInfo = await getCpuInfo();
  const { systemVersion, computerName } = await getComputerName();
  const memorySize = await getMemoryInfo();
  const disksInfo = await getDisksInfo();
  const graphicsInfo = await getGraphicsInfo();
  return {
    cpuInfo,
    systemVersion,
    computerName,
    memorySize,
    disksInfo,
    graphicsInfo,
  };
}

module.exports = getComputerInfo;
