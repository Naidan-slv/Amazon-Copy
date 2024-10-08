import{renderOrderSummary} from'../../scripts/checkout/orderSummary.js';
import { loadFromStorage,cart } from '../../data/cart.js';

describe('test suite : renderOrderSummary',()=>{
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

    beforeEach(()=>{ // it will run this function (all of our setup code) before each test
        spyOn(localStorage, 'setItem');
        document.querySelector('.js-test-container').innerHTML = `
        <div class = "js-order-summary"></div>
        <div class = "js-payment-summary"></div>
        `;
//checking the commits
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
              }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
              }]);
        });
        loadFromStorage();
        // this will setup the html
        renderOrderSummary();
    });
    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = '';

    });


    it('Displays the cart',()=>{
        
        expect(
        document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);
        
        expect(
        document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');

        expect(
        document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

    });

    it('removes a product',()=>{
        
        document.querySelector(`.js-delete-link-${productId1}`).click();
        // this will click delete on the product and remove it
        expect(
            document.querySelectorAll('.js-cart-item-container').length
            ).toEqual(1);
        expect(
        document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
        document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
        // some cleanup at the end of each test
    });
});

// integration test - lots of tests together to check how our page works and how our page looks
// hook lets us run some code for our tests 