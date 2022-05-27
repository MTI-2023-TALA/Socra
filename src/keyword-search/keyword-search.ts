export class KeywordSearcher {
  /**
   *
   * @param keywords The keywords to look for
   * @param text The text to look in
   * @returns The score, calculated after the function in the subject
   */
  static getScore(keywords: string[], text: string): number {
    return 0;
  }

  /**
   *
   * @param keywordFound Number of keyword found, called m in the subject
   * @param numberOfKeyword Total number of keyword, called n in the subject
   * @param occurences Total number of occurences found, called o in the subject
   * @returns The score, calculated after the function in the subject
   */
  calculateScore(keywordFound: number, numberOfKeyword: number, occurences: number): number {
    return keywordFound * occurences - 0.5 * numberOfKeyword * occurences;
  }

  /**
   *
   * @param keyword The keyword to look for
   * @param text The text lo look in
   * @returns The number of times the keyword was found
   */
  getOccurencesOfAKeyword(keyword: string, text: string): number {
    const textToLower = text.toLowerCase();
    const keywordToLower = keyword.toLowerCase();
    const matchingRegex = new RegExp(keywordToLower, 'g');
    return (textToLower.match(matchingRegex) || []).length;
  }
}