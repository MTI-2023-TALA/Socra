import { KeywordSearcher } from './keyword-search';
import { deepStrictEqual } from 'assert';

const keywords = ['java', 'api', 'architecture'];

const description1 =
  'Après les études vous serez capable de participer aux Comités d’Architecture pour garantir la\
   bonne conformité des bonnes pratiques des APIs. Promouvoir les pratiques API First au sein du\
    groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)';

const description2 =
  'Après les études vous serez capable de participer aux Comités d’Architecture pour garantir la \
 bonne conformité des bonnes pratiques de développement.';

const description3 =
  'Après les études vous serez capable de garantir la bonne conformité des bonnes pratiques des\
  APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de\
   développement d’API (création de modèle d’API, ...)';

const description4 = 'Après les études vous serez capable de développer l’expérience utilisateur du produit.';
const description5 =
  'Après les études vous serez capable de garantir la bonne conformité des bonnes pratiques des\
 APIs. Promouvoir les pratiques API First au sein du groupe. Développement en Java. Mise en\
  place une architecture micro-services avec une structure de code reposant sur une architecture\
   hexagonale.';

describe('keyword-search', () => {
  describe('Keyword search', () => {
    let keywordSearcher: KeywordSearcher;
    beforeAll(() => {
      keywordSearcher = new KeywordSearcher();
    });

    it('Should return 0 when keyword "Feuille" is not in the text', () => {
      expect(keywordSearcher.getScore(['Feuille'], description1)).toBe(0);
    });

    it('Should return 0 when called with no keywords', () => {
      expect(keywordSearcher.getScore([], description1)).toBe(0);
    });

    it('Should return 2.5 when called with keywords and description 1', () => {
      expect(keywordSearcher.getScore(keywords, description1)).toBe(2.5);
    });

    it('Should return -0.5 when called with keywords and description 2', () => {
      expect(keywordSearcher.getScore(keywords, description2)).toBe(-0.5);
    });

    it('Should return -2 when called with keywords and description 3', () => {
      expect(keywordSearcher.getScore(keywords, description3)).toBe(-2);
    });

    it('Should return 0 when called with keywords and description 4', () => {
      expect(keywordSearcher.getScore(keywords, description4)).toBe(0);
    });

    it('Should return 2.5 when called with keywords and description 5', () => {
      expect(keywordSearcher.getScore(keywords, description5)).toBe(7.5);
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

  describe('Get occurences of a keyword', () => {
    let keywordSearcher: KeywordSearcher;
    beforeAll(() => {
      keywordSearcher = new KeywordSearcher();
    });

    it('Should return 4 when called with "API"', () => {
      expect(keywordSearcher.getOccurencesOfAKeyword('API', description1)).toBe(4);
    });

    it('Should return 4 when called with "Api"', () => {
      expect(keywordSearcher.getOccurencesOfAKeyword('Api', description1)).toBe(4);
    });

    it('Should return 0 when called with "Java"', () => {
      expect(keywordSearcher.getOccurencesOfAKeyword('Java', description1)).toBe(0);
    });

    it('Should return 1 when called with "cOmItÉs"', () => {
      expect(keywordSearcher.getOccurencesOfAKeyword('cOmItÉs', description1)).toBe(1);
    });
  });
});
