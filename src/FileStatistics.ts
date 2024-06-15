import { type FileStatisticsInfo } from './types';

class FileStatistics {
  wordsCount: number;
  charactersCount: number;
  whitespacesCount: number;
  mostRepeatedWords: Record<string, number>;

  constructor(fileStatisticsInfo: FileStatisticsInfo) {
    this.wordsCount = fileStatisticsInfo.wordsCount;
    this.charactersCount = fileStatisticsInfo.charactersCount;
    this.whitespacesCount = fileStatisticsInfo.whitespacesCount;
    this.mostRepeatedWords = fileStatisticsInfo.mostRepeatedWords;
  }
}

export default FileStatistics;
