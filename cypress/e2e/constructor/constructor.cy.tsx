import { TIngredient, TOrder } from '../../../src/utils/types';

describe('Burger constructor', function () {
  const bunId = '643d69a5c3f7b9001cfa093c';
  const mainId = '643d69a5c3f7b9001cfa093e';
  const sauceId = '643d69a5c3f7b9001cfa0942';

  const dataCy = {
    modal: '[data-cy=modal]',
    modalCloseBtn: '[data-cy=modal-close-btn]',
    modalOverlay: '[data-cy=modal-overlay]',
    orderNumber: '[data-cy=order-number]',
    burgerConstructor: '[data-cy=burger-constructor]',
    orderBtn: '[data-cy=order-btn]',
    ingredient: (type: string, id: string) => `[data-cy=${type}-${id}`
  };

  const defaultConstructorLabels = {
    noBuns: 'Выберите булки',
    noFillings: 'Выберите начинку'
  };

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    window.localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.setCookie('accessToken', 'mockAccessToken');

    cy.intercept('POST', 'api/orders', (request) => {
      request.reply((response) => {
        response.send({ fixture: 'order.json' });
      });
    }).as('postOrder');

    cy.visit('/');

    cy.wait('@getUser');
    cy.wait('@getIngredients');

    cy.get(dataCy.ingredient('bun', bunId))
      .as('bun')
      .contains('Добавить')
      .as('bunAddBtn');
    cy.get(dataCy.ingredient('main', mainId))
      .as('main')
      .contains('Добавить')
      .as('mainAddBtn');
    cy.get(dataCy.ingredient('sauce', sauceId))
      .as('sauce')
      .contains('Добавить')
      .as('sauceAddBtn');

    cy.get(dataCy.burgerConstructor).as('burgerConstructor');
    cy.get(dataCy.orderBtn).find('button').as('orderBtn');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearAllCookies();
  });

  it('Добавление ингредиентов в конструктор', function () {
    cy.get('@bunAddBtn').click();
    cy.get('@mainAddBtn').click();
    cy.get('@sauceAddBtn').click();

    cy.fixture('ingredients.json').then((data: { data: TIngredient[] }) => {
      const bun = data.data.find((ing) => ing._id === bunId) as TIngredient;
      const main = data.data.find((ing) => ing._id === mainId) as TIngredient;
      const sauce = data.data.find((ing) => ing._id === sauceId) as TIngredient;

      cy.get('@burgerConstructor')
        .should('contain.text', bun.name)
        .and('contain.text', main.name)
        .and('contain.text', sauce.name);
    });
  });

  it('Открытие и закрытие модального окна с описанием ингредиента', function () {
    cy.fixture('ingredients.json').then((data: { data: TIngredient[] }) => {
      const bun = data.data.find((ing) => ing._id === bunId) as TIngredient;
      const sauce = data.data.find((ing) => ing._id === sauceId) as TIngredient;

      cy.get('@sauce').click();
      cy.get(dataCy.modal).should('contain.text', sauce.name);
      cy.get(dataCy.modalCloseBtn).click();

      cy.get('@bun').click();
      cy.get(dataCy.modal).should('contain.text', bun.name);
      cy.get(dataCy.modalOverlay).click({ force: true });
    });
  });

  it('Процесс создания заказа', function () {
    cy.get('@bunAddBtn').click();
    cy.get('@mainAddBtn').click();
    cy.get('@sauceAddBtn').click();

    cy.get('@orderBtn').click();

    cy.wait('@postOrder');

    cy.fixture('order.json').then((data: { order: TOrder }) => {
      cy.get(dataCy.orderNumber).contains(data.order.number);
      cy.get(dataCy.modalCloseBtn).click();

      cy.get('@burgerConstructor')
        .should('contain.text', defaultConstructorLabels.noBuns)
        .and('contain.text', defaultConstructorLabels.noFillings);
    });
  });
});
