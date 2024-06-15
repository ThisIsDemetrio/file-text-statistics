import FileStatistics from '../src/FileStatistics';

describe('FileStatistics', () => {
  it('should be created', () => {
    const statistics = new FileStatistics({
      charactersCount: 100,
      whitespacesCount: 10,
      wordsCount: 10,
      mostRepeatedWords: { something: 10 },
    });

    expect(statistics).not.toBeNull();

    expect(statistics.charactersCount).toBe(100);
    expect(statistics.whitespacesCount).toBe(10);
    expect(statistics.wordsCount).toBe(10);
    expect(statistics.mostRepeatedWords).toEqual({ something: 10 });
  });
});
