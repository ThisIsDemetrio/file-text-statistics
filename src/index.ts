/* eslint-disable no-console */
import FileStatisticsFactory from './FileStatisticsFactory';

async function main(filePath: string): Promise<void> {
  const factory = new FileStatisticsFactory();
  const result = await factory.extractStatisticsFromFile(filePath);
  const {
    wordsCount, charactersCount, whitespacesCount, mostRepeatedWords,
  } = result;

  // Print the results
  console.log(`Words: ${wordsCount}`);
  console.log(`Chars: ${charactersCount}`);
  console.log(`Whitespaces: ${whitespacesCount}`);
  if (Object.keys(mostRepeatedWords).length === 0) {
    console.log("We haven't found any word repeated more than 10 times");
  } else {
    console.log('Most repeated words:');
    Object.entries(mostRepeatedWords).forEach(([word, count]) => {
      console.log(`- ${word}: ${count}`);
    });
  }
}

const filePath = process.argv[3];

if (!filePath) {
  throw new Error('Please define a file path using the "--path" argument.');
}

main(filePath);
