import * as fs from 'fs';
import * as path from 'path';

export class FileUtils {
  static readJson(filePath: string): any {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  static writeJson(filePath: string, data: any): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  static listJsonFiles(folder: string): string[] {
    return fs.readdirSync(folder).filter((f) => f.endsWith('.json'));
  }

  static resolveFile(folder: string, file: string): string {
    return path.join(folder, file);
  }
}
