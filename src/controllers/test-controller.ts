import { Router, Request, Response } from 'express';
import os from 'os';

export const Testing = (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
    hostname: os.hostname(),
    platformInfo: {
      platform: os.platform(),
      release: os.release(),
      type: os.type()
    }
  };
  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message =
      error instanceof Error ? error.message : 'An error occurred';
    res.status(503).json(healthcheck);
  }
};
