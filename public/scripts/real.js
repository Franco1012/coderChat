const socket = io();
socket.on('products', (data) => {
    console.log(data);
    let template = '';
    template = data.map(product => `
    <div class="card m-2" style="width: 10rem">
      <img src="${product.photo}" class="card-img-top w-50" alt="${product.id}">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <h3>${product.price}</h3>
      </div>
    </div>
  `).join('');
    document.querySelector("#products").innerHTML = template;
});

document.querySelector("#add").addEventListener("click", (event) => {
    const title = document.querySelector("#title").value;
    const photo = document.querySelector("#photo").value;
    const category = document.querySelector("#category").value;
    const price = document.querySelector("#price").value;
    const stock = document.querySelector("#stock").value;
    socket.emit('add', { title, photo, category, price, stock });
});