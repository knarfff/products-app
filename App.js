class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Name</strong>: ${product.name}
                    <strong>Price</strong>: ${product.price}
                    <strong>Quantity</strong>: ${product.quantity}
                    <a href="#" class="btn btn-outline-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    deleteProduct(element) {
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Successfully', 'danger');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // SHOWING IN DOM //
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000)
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }
}

// DOM Events // 
document.getElementById('product-form')
    .addEventListener('submit', function(e) {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const quantity = document.getElementById('quantity').value;

        const product = new Product(name, price, quantity);
        const ui = new UI();

        if(name === '' || price === '' || quantity === ''){
            ui.showMessage('Complete Fields Please', 'info');
        } else{
            ui.addProduct(product);
            ui.resetForm();
            ui.showMessage('Product Added Successfully', 'success');
        }
    e.preventDefault();
});

document.getElementById('product-list')
    .addEventListener('click', function(e) {
        const ui = new UI();
        ui.deleteProduct(e.target);
    });