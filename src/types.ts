export type FileStatisticsInfo = {
  wordsCount: number
  charactersCount: number
  whitespacesCount: number
  mostRepeatedWords: Record<string, number>
};
