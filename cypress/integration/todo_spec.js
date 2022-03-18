describe('TodoMVC', function () {
  beforeEach(function () {
    cy.visit('localhost:8000');
  });

  it('Verifica app TodoMVC está disponivel', function () {
    cy.get('.todoapp').should('exist');
    cy.percySnapshot('Aplicativo no estado inicial');
  });

  it('Quando não houve itens na lista a seção main e o footer não devem ser visíveis', function () {
    cy.get('.main').should('not.be.visible');
    cy.get('.footer').should('not.be.visible');
  });

  it('Adiciona uma tarefa na lista', function () {
    cy.get('.todo-count').should('contain', '0 items left');
    cy.get('.todo-list').children('li').should('have.length', 0);

    cy.get('.new-todo').should('exist');
    cy.get('.new-todo').type('Tirar uma screenshot da tela {enter}');

    cy.get('.todo-list').children('li').should('have.length', 1);
    cy.get('.todo-count').should('contain', '1 item left');
    cy.percySnapshot('Item adicionado na lista');
  });

  it('Finaliza uma tarefa', function () {
    cy.get('.new-todo').type('Tirar outra screenshot da tela {enter}');
    cy.get('.todo-count').should('contain', '1 item left');

    cy.get('.toggle').click();
    cy.get('.todo-count').should('contain', '0 items left');
    cy.percySnapshot('Tarefa finalizada');
  });
});
