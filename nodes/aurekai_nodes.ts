import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
} from 'n8n-workflow';
import { execFileSync } from 'child_process';

function runAkai(args: string[]): Record<string, unknown> {
  const out = execFileSync('akai', [...args, '--json'], { timeout: 300_000, encoding: 'utf8' });
  try { return JSON.parse(out); } catch { return { raw: out }; }
}

export class AurekaiDoctor implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Aurekai: Doctor',
    name: 'aurekaiDoctor',
    icon: 'file:aurekai.svg',
    group: ['transform'],
    version: 1,
    description: 'Run Akai runtime diagnostics',
    defaults: { name: 'Aurekai Doctor' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    properties: [
      {
        displayName: 'Deep',
        name: 'deep',
        type: 'boolean',
        default: true,
        description: 'Run deep diagnostics',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const deep = this.getNodeParameter('deep', 0) as boolean;
    const result = runAkai(deep ? ['doctor', '--deep'] : ['doctor']);
    return [this.helpers.returnJsonArray([result])];
  }
}

export class AurekaiTranscribe implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Aurekai: Transcribe',
    name: 'aurekaiTranscribe',
    icon: 'file:aurekai.svg',
    group: ['transform'],
    version: 1,
    description: 'Transcribe audio file via Akai',
    defaults: { name: 'Aurekai Transcribe' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    properties: [
      { displayName: 'Audio Path', name: 'audioPath', type: 'string', default: '' },
      { displayName: 'Language', name: 'language', type: 'string', default: 'en' },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const audioPath = this.getNodeParameter('audioPath', 0) as string;
    const language = this.getNodeParameter('language', 0) as string;
    const result = runAkai(['transcribe', 'audio', '--input', audioPath, '--language', language]);
    return [this.helpers.returnJsonArray([result])];
  }
}

export class AurekaiProofBundle implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Aurekai: Proof Bundle',
    name: 'aurekaiProofBundle',
    icon: 'file:aurekai.svg',
    group: ['transform'],
    version: 1,
    description: 'Export an Akai proof bundle for the current run',
    defaults: { name: 'Aurekai Proof Bundle' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    properties: [
      { displayName: 'Run ID', name: 'runId', type: 'string', default: '' },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const runId = this.getNodeParameter('runId', 0) as string;
    const args = runId ? ['proof', 'bundle', '--run-id', runId] : ['proof', 'bundle'];
    const result = runAkai(args);
    return [this.helpers.returnJsonArray([result])];
  }
}

export class AurekaiInvoice implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Aurekai: Invoice',
    name: 'aurekaiInvoice',
    icon: 'file:aurekai.svg',
    group: ['transform'],
    version: 1,
    description: 'Generate a client invoice via Akai',
    defaults: { name: 'Aurekai Invoice' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    properties: [
      { displayName: 'Client ID', name: 'clientId', type: 'string', default: '' },
      { displayName: 'Period', name: 'period', type: 'string', default: 'current' },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const clientId = this.getNodeParameter('clientId', 0) as string;
    const period = this.getNodeParameter('period', 0) as string;
    const result = runAkai(['pay', 'invoice', '--client', clientId, '--period', period]);
    return [this.helpers.returnJsonArray([result])];
  }
}

export class AurekaiMeter implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Aurekai: Meter',
    name: 'aurekaiMeter',
    icon: 'file:aurekai.svg',
    group: ['transform'],
    version: 1,
    description: 'Record a metering event via Akai',
    defaults: { name: 'Aurekai Meter' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    properties: [
      { displayName: 'Event', name: 'event', type: 'string', default: '' },
      { displayName: 'Units', name: 'units', type: 'number', default: 1 },
      { displayName: 'Client ID', name: 'clientId', type: 'string', default: '' },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const event = this.getNodeParameter('event', 0) as string;
    const units = this.getNodeParameter('units', 0) as number;
    const clientId = this.getNodeParameter('clientId', 0) as string;
    const args = ['meter', 'record', '--event', event, '--units', String(units)];
    if (clientId) args.push('--client', clientId);
    const result = runAkai(args);
    return [this.helpers.returnJsonArray([result])];
  }
}

export class AurekaiCapabilities implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Aurekai: Capabilities',
    name: 'aurekaiCapabilities',
    icon: 'file:aurekai.svg',
    group: ['transform'],
    version: 1,
    description: 'List all Akai capability families and commands',
    defaults: { name: 'Aurekai Capabilities' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    properties: [],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const result = runAkai(['runtime', 'capabilities']);
    return [this.helpers.returnJsonArray([result])];
  }
}
