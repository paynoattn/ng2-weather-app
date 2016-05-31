describe('App', () => {

    beforeEach(() => {
        browser.get('/');
    });

    it('should search for weather', function () {
        const searchForm = element(by.css('search-form.top'));
        const searchFormInput = searchForm.element(by.css('input[type="text"]'));
        const searchButton = searchForm.element(by.css('input[type="submit"]'));
        const busy = element(by.css('.loading'));
        
        searchFormInput.sendKeys('seattle').then(function(){
            searchButton.click().then(function () {
                // we are testing for busy instead of weather here because the weather is async;
                expect(busy.isDisplayed()).toBe(true);
            });
        });
    });

    it('should change route', function(){
        const menu = element(by.css('.app-nav'));
        const menuLink = menu.all(by.tagName('a')).get(1);
        const routeHeader = element(by.tagName('h2'));
        menuLink.click().then(function(){
            expect(routeHeader.getText()).not.toBe('Get Weather');
        });
    });
});
