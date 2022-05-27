import { KeywordSearcher } from './keyword-search';

const description =
  'Après les études vous serezcapable de participer aux Comités d’Architecture pour garantir la bonne conformité des bonnes pratiquesdes APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)';
describe('Keyword search', () => {
  it('Should return 0 when keyword "Feuille" is not in the text', () => {
    KeywordSearcher.getScore(['Feuille'], description);
  });
});
