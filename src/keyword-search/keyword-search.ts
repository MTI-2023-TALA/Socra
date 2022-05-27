export class KeywordSearcher {
  static getScore(keywords: string[], text: string): number {
    return 0;
  }

  calculateScore(keywordFound: number, numberOfKeyword: number, occurences: number): number {
    return keywordFound * occurences - 0.5 * numberOfKeyword * occurences;
  }
}
