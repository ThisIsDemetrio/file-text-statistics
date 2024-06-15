import FileStatistics from '../src/FileStatistics';
import FileStatisticsFactory from '../src/FileStatisticsFactory';

describe('FileStatisticsFactory', () => {
  const factory = new FileStatisticsFactory();

  describe('From file', () => {
    const testCases: { filePath: string, expected: FileStatistics }[] = [
      {
        filePath: 'tests/docs/small-text.txt',
        expected: new FileStatistics({
          wordsCount: 8,
          charactersCount: 39,
          whitespacesCount: 7,
          mostRepeatedWords: {},
        }),
      },
      {
        filePath: 'tests/docs/lorem-ipsum.txt',
        expected: new FileStatistics({
          wordsCount: 476,
          charactersCount: 3265,
          whitespacesCount: 475,
          mostRepeatedWords: { et: 10 },
        }),
      },
      {
        filePath: 'tests/docs/builder-pattern-from-wikipedia.txt',
        expected: new FileStatistics({
          wordsCount: 283,
          charactersCount: 2123,
          whitespacesCount: 282,
          mostRepeatedWords: {
            the: 22,
            of: 17,
            a: 16,
            to: 13,
            builder: 12,
          },
        }),
      },
    ];

    testCases.forEach((testCase) => {
      const { expected, filePath } = testCase;

      it(`should extract the statistics from the file "${filePath}"`, async () => {
        const result = await factory.extractStatisticsFromFile(filePath);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('From url', () => {
    const testCases: { url: string, expected: FileStatistics }[] = [
      {
        url: 'https://filesamples.com/samples/document/txt/sample1.txt',
        expected: new FileStatistics({
          wordsCount: 86,
          charactersCount: 607,
          whitespacesCount: 85,
          mostRepeatedWords: {},
        }),
      },
      {
        url: 'https://filesamples.com/samples/document/txt/sample2.txt',
        expected: new FileStatistics({
          wordsCount: 416,
          charactersCount: 2859,
          whitespacesCount: 415,
          mostRepeatedWords: {},
        }),
      },
      {
        url: 'https://filesamples.com/samples/document/txt/sample3.txt',
        expected: new FileStatistics({
          wordsCount: 531,
          charactersCount: 3541,
          whitespacesCount: 530,
          mostRepeatedWords: {
            non: 12,
            quod: 10,
          },
        }),
      },
    ];

    testCases.forEach((testCase) => {
      const { expected, url } = testCase;

      it(`should extract the statistics from the file "${url}"`, async () => {
        const result = await factory.extractStatisticsFromFile(url);

        expect(result).toEqual(expected);
      });
    });
  });
});
