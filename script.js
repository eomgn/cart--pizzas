const $decrementModal = document.querySelector('.pizzaInfo--qtmenos')
const $incrementModal = document.querySelector('.pizzaInfo--qtmais')

let Qtd = 1
let modalKey
let cart = []

pizzaJson.map((item, index) => {
  let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)

  // setando novo atributo (data-key) e colocando o parametro index
  pizzaItem.setAttribute('data-key', index)

  // imagem das pizzas
  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  // preço das pizzas
  pizzaItem.querySelector(
    '.pizza-item--price'
  ).innerHTML = `R$ ${item.price.toFixed(2)}`
  // nome das pizzas
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
  // descrição das pizzas
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    // variaveis
    let modal = document.querySelector('.pizzaWindowArea')

    // remove o padrão da tag A que é dar um refresh na tela ao clicar
    e.preventDefault()

    //  identificar em qual item do array do arquivo pizzas.js foi clicado
    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    modalKey = key

    //  abrindo o modal na tela ao clicar
    modal.style.display = 'flex'

    // abrindo modal com um translate aplicado em CSS
    modal.style.opacity = '0'
    setTimeout(() => {
      modal.style.opacity = '1'
    })

    document.querySelector('.pizzaBig img').src = item.img
    document.querySelector('.pizzaInfo h1').innerHTML = item.name
    document.querySelector('.pizzaInfo--desc').innerHTML = item.description
    document.querySelector(
      '.pizzaInfo--actualPrice'
    ).innerHTML = `R$ ${item.price.toFixed(2)}`

    //  --------------------

    //removendo selected da class pizzaInfo--size para abaixo a função de iniciar sempre no tamanho GRANDE rodar
    document
      .querySelector('.pizzaInfo--size.selected')
      .classList.remove('selected')

    document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add('selected')
      }

      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
  })

  document.querySelector('.pizzaInfo--qt').innerHTML = Qtd

  // append para adicionar um item a cada novo objeto colocado dentro do array do arquivo pizzas.js
  document.querySelector('.pizza-area').append(pizzaItem)

  closeModal()
})

/*---------------------------------------------------------------------------------*/

/* eventos de click ------- MODAL -------*/

// adicionando selected ao clicar em algum tamanho
document.querySelectorAll('.pizzaInfo--size').forEach((size) => {
  size.addEventListener('click', () => {
    document
      .querySelector('.pizzaInfo--size.selected')
      .classList.remove('selected')

    size.classList.add('selected')
  })
})

function decrementModal() {
  if (Qtd > 1) {
    Qtd--
  }
  document.querySelector('.pizzaInfo--qt').innerHTML = Qtd
}

function incrementModal() {
  Qtd++
  document.querySelector('.pizzaInfo--qt').innerHTML = Qtd
}

function closeModal() {
  document
    .querySelector('.pizzaInfo--cancelButton')
    .addEventListener('click', () => {
      document.querySelector('.pizzaWindowArea').style.opacity = '0'

      setTimeout(() => {
        document.querySelector('.pizzaWindowArea').style.display = 'none'
      }, 1000)
    })

  window.addEventListener('keyup', (event) => {
    event.key === 'Escape'
      ? (document.querySelector('.pizzaWindowArea').style.display = 'none')
      : ''
  })

  document.querySelector('.pizzaWindowArea').style.opacity = '0'

  setTimeout(() => {
    document.querySelector('.pizzaWindowArea').style.display = 'none'
  }, 1000)
}

/*---------------------------------------------------------------------------------*/

/* dados do carrinho ------- CART -------*/

document
  .querySelector('.pizzaInfo--addButton')
  .addEventListener('click', () => {
    let size = document
      .querySelector('.pizzaInfo--size.selected')
      .getAttribute('data-key')

    cart.push({
      // qual pizza?
      id: pizzaJson[modalKey].id,
      // qual tamanho da pizza?
      size: size,
      // quantas pizzas?
      qtd: Qtd
    })

    if (cart.length > 0) {
      document.querySelector('aside').classList.add('show')
    }

    cartUpdate()
    closeModal()
  })

function cartUpdate() {
  for (let i in cart) {
    let pizzaItem = pizzaJson.find((item) => {
      return item.id == cart[i].id
    })

    let cartShop = document.querySelector('.cart')
    let cartItem = document.querySelector('.models .cart--item').cloneNode(true)

    cartItem.querySelector('img').src = pizzaItem.img

    cartShop.append(cartItem)
  }
}

console.log(cart)

$decrementModal.addEventListener('click', decrementModal)
$incrementModal.addEventListener('click', incrementModal)
