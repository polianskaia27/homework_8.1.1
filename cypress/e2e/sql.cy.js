describe("template spec", () => {
  it("can connect to the db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("input entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
      (1, "Ivan", "02-2022", "Barcelona"),
      (2, "Maria", "03-2022", "Tokio"),
      (3, "Andrey", "02-2023", "Milan")`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(3);
    });
  });

  it("add two more students", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
      (4, "Elena", "02-2022", "Paris"),
      (5, "Dmitriy", "07-2024", "London")`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(2);
    });
  });

  it("select students from group 02-2022", () => {
    cy.task(
      "queryDb",
      `SELECT * FROM Students WHERE StudentGroup="02-2022"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.length).to.equal(2);
    });
  });

  it("can delete the db", () => {
    cy.task("queryDb", "DROP TABLE  Students");
  });
});
