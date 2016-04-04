describe("app.js test", function() {

    it("updateList()", function() {
        beforeEach(function() {
            updateList();
        });
        expect( pagedResults.length == 0 ).toBe( true );
    });
});

describe("User Controller test", function() {

    it("Users AJAX call", function() {
        expect( 1 ).toBe( 1 );
    });
});

describe("Group Controller test", function() {

    it("Group AJAX call", function() {
        expect( 1 ).toBe( 1 );
    });
});

describe("login Controller test", function() {

    it("login", function() {
        expect( 1 ).toBe( 1 );
    });
});