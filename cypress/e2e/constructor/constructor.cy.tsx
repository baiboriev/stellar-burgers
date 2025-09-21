describe('Burger constructor', function () {
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

    cy.visit('http://localhost:4000');

    cy.wait('@getUser');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearAllCookies();
  });

  it('Добавление ингредиентов в конструктор', function () {
    cy.get('[data-cy=bun-643d69a5c3f7b9001cfa093c]')
      .contains('Добавить')
      .click();
    cy.get('[data-cy=main-643d69a5c3f7b9001cfa093e]')
      .contains('Добавить')
      .click();
    cy.get('[data-cy=sauce-643d69a5c3f7b9001cfa0942]')
      .contains('Добавить')
      .click();

    cy.get('[data-cy=burger-constructor]')
      .should('contain.text', 'Краторная булка N-200i')
      .and('contain.text', 'Филе Люминесцентного тетраодонтимформа')
      .and('contain.text', 'Соус Spicy-X');
  });

  it('Открытие и закрытие модального окна с описанием ингредиента', function () {
    cy.get('[data-cy=sauce-643d69a5c3f7b9001cfa0942]').click();
    cy.get('[data-cy=modal]').should('contain.text', 'Соус Spicy-X');
    cy.get('[data-cy=modal-close-btn]').click();

    cy.get('[data-cy=bun-643d69a5c3f7b9001cfa093c]').click();
    cy.get('[data-cy=modal]').should('contain.text', 'Краторная булка N-200i');
    cy.get('[data-cy=modal-overlay]').click({ force: true });
  });

  it('Процесс создания заказа', function () {
    cy.get('[data-cy=bun-643d69a5c3f7b9001cfa093c]')
      .contains('Добавить')
      .click();
    cy.get('[data-cy=main-643d69a5c3f7b9001cfa093e]')
      .contains('Добавить')
      .click();
    cy.get('[data-cy=sauce-643d69a5c3f7b9001cfa0942]')
      .contains('Добавить')
      .click();

    cy.get('[data-cy=order-btn]').find('button').click();

    cy.wait('@postOrder');

    cy.get('[data-cy=order-number]').contains('12345');

    cy.get('[data-cy=modal-close-btn]').click();

    cy.get('[data-cy=burger-constructor]')
      .should('contain.text', 'Выберите булки')
      .and('contain.text', 'Выберите начинку');
  });
});
