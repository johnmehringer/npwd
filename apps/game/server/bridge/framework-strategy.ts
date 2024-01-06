import { mainLogger } from '../sv_logger';
import { ESXFramework } from './esx/esx-server';
import { QBCoreFramework } from './qb/qbcore-server';
import { QBXFramework } from './qbx/qbx-server';
import { Standalone } from './standalone/standalone-server';

export interface Strategy {
  onStart(): void;
  init(): void;
}

export class FrameworkStrategy {
  private strategy: Strategy | null;

  constructor(strategy: 'qbcore' | 'qbx' | 'esx' | 'standalone') {
    switch (strategy) {
      case 'qbcore':
        this.strategy = new QBCoreFramework();
        break;
      case 'qbx':
        this.strategy = new QBXFramework();
        break;
      case 'esx':
        this.strategy = new ESXFramework();
        break;
      case 'standalone':
        this.strategy = new Standalone();
        break;
      default:
        this.strategy = new Standalone();
        break;
    }
  }

  public onStart(): void {
    this.strategy.onStart();
  }

  public init(): void {
    this.strategy.init();
  }
}

const framework = GetConvar('npwd:framework', 'standalone') as
  | 'qbcore'
  | 'qbx'
  | 'esx'
  | 'standalone';

const strategy = new FrameworkStrategy(framework);

if (strategy) {
  strategy.init();
  strategy.onStart();
}
