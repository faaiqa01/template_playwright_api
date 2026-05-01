import fs from 'fs';
import path from 'path';
import type {
    FullConfig,
    Reporter,
    Suite,
    TestCase,
    TestResult,
} from '@playwright/test/reporter';

class FileLogReporter implements Reporter {
    private logFilePath: string;

    public constructor() {
        const logsDir = path.resolve(process.cwd(), 'logs');
        fs.mkdirSync(logsDir, { recursive: true });
        this.logFilePath = path.join(logsDir, 'test-run.log');
    }

    public onBegin(config: FullConfig, suite: Suite): void {
        const message = [
            '==================================================',
            `Run started: ${new Date().toISOString()}`,
            `Test files: ${suite.allTests().length}`,
            `Workers: ${config.workers}`,
            '==================================================',
        ].join('\n');
        this.append(message);
    }

    public onTestEnd(test: TestCase, result: TestResult): void {
        const durationMs = result.duration;
        const status = result.status.toUpperCase();
        const retry = result.retry;
        const message = `[${new Date().toISOString()}] ${status} | ${test.titlePath().join(' > ')} | duration=${durationMs}ms | retry=${retry}`;
        this.append(message);

        if (result.error) {
            this.append(`ERROR: ${result.error.message}`);
        }
    }

    public onEnd(): void {
        this.append(`Run finished: ${new Date().toISOString()}`);
        this.append('');
    }

    private append(message: string): void {
        fs.appendFileSync(this.logFilePath, `${message}\n`, 'utf8');
    }
}

export default FileLogReporter;
