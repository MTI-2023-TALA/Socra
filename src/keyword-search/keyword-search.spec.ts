import { KeywordSearcher } from './keyword-search';

const description =
  'Après les études vous serezcapable de participer aux Comités d’Architecture pour garantir la bonne conformité des bonnes pratiquesdes APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)';
describe('Keyword search', () => {
  it('Should return 0 when keyword "Feuille" is not in the text', () => {
    expect(KeywordSearcher.getScore(['Feuille'], description)).toBe(0);
  });
});

describe('Keyword score function', () => {
  let keywordSearcher: KeywordSearcher;
  beforeAll(() => {
    keywordSearcher = new KeywordSearcher();
  });
  it('Should return 2.5 when called with (2, 3, 5)', () => {
    expect(keywordSearcher.calculateScore(2, 3, 5)).toBe(2.5);
  });
  it('Should return -0.5 when called with (1, 3, 1)', () => {
    expect(keywordSearcher.calculateScore(1, 3, 1)).toBe(-0.5);
  });
  it('Should return -2 when called with (1, 3, 4)', () => {
    expect(keywordSearcher.calculateScore(1, 3, 4)).toBe(-2);
  });
  it('Should return 0 when called with (0, 3, 0)', () => {
    expect(keywordSearcher.calculateScore(0, 3, 0)).toBe(0);
  });
  it('Should return 2.5 when called with (3, 3, 5)', () => {
    expect(keywordSearcher.calculateScore(3, 3, 5)).toBe(7.5);
  });
});
