import fs from 'fs';
import axios from 'axios';
import path from 'path';
import FileStatistics from './FileStatistics';

const REGEX = /[.,/#!$%^&*;:{}=\-_`~()|]/g;

class FileStatisticsFactory {
  /**
   * @param urlOrFilePath the path, that could be either a string or an url
   * @returns returns `true` if the string passed is a valid url
   */
  private isUrl(urlOrFilePath: string): boolean {
    try {
      return !!new URL(urlOrFilePath);
    } catch {
      return false;
    }
  }

  /**
   * @param filePath the path to the file that should be opened
   * @returns returns the content of the file as a string
   */
  private openFile(filePath: string): string {
    return fs.readFileSync(path.resolve(filePath), 'utf-8');
  }

  /**
   *
   * @param url the url of the file that should be downloaded
   * @returns returns the content of the file as a string
   */
  private async downloadFile(url: string): Promise<string> {
    const response = await axios.get(url, { responseType: 'text' });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Failed to download file. Status code: ${response.status}`);
  }

  /**
   *
   * @param words the words that should be counted, as a list of string
   * @returns returns an object containing the words repeated at least 10 times as keys
   * and how many times are repeated as a value
   */
  private calculateMostRepeatedWords(words: string[]): Record<string, number> {
    const mostRepeatedWords: Record<string, number> = words.reduce(
      (acc: Record<string, number>, word: string) => {
        const wordCleaned = word.replace(REGEX, '').toLowerCase();

        if (wordCleaned === '') {
          return acc;
        }

        acc[wordCleaned] = (acc[wordCleaned] || 0) + 1;
        return acc;
      },
      {},
    );

    return Object.entries(mostRepeatedWords)
      .filter(([, count]) => count >= 10)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc: Record<string, number>, [word, count]: [string, number]) => {
        acc[word] = count;
        return acc;
      }, {});
  }

  async extractStatisticsFromFile(urlOrFilePath: string): Promise<FileStatistics> {
    const content = this.isUrl(urlOrFilePath)
      ? await this.downloadFile(urlOrFilePath)
      : this.openFile(urlOrFilePath);

    // count the chars
    const charactersCount = content.length;

    // count words and whitespaces
    // we keep it simple by defining words as non-empty content separated by a single whitespace
    // we calculate then the whitespace by checking how many times we split the file
    // to get the words in the array
    const words = content.split(' ').filter((word) => word !== '');
    const wordsCount = words.length;
    const whitespacesCount = wordsCount - 1;

    const mostRepeatedWords = this.calculateMostRepeatedWords(words);

    return new FileStatistics({
      wordsCount,
      charactersCount,
      whitespacesCount,
      mostRepeatedWords,
    });
  }
}

export default FileStatisticsFactory;
