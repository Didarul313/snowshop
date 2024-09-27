        let cart = [];

        function addToCart(productId) {
            let product = products.find(p => p.id === productId);
            if (product) {
                cart.push(product);
                document.getElementById(`added-${productId}`).style.display = 'inline';
                setTimeout(() => {
                    document.getElementById(`added-${productId}`).style.display = 'none';
                }, 2000);

                document.getElementById('cart-count').innerText = cart.length;
            }
        }

        function loadProducts() {
            fetch('products.json')
                .then(response => response.json())
                .then(data => {
                    const productSection = document.getElementById('product-section');
                    products = data;
                    products.forEach(product => {
                        const productCard = `
                            <div class="product-card">
                                <img src="${product.image}" alt="${product.name}">
                                <h2>${product.name}</h2>
                                <p>$${product.price.toFixed(2)}</p>
                                <button onclick="addToCart(${product.id})">Add to Cart</button>
                                <span id="added-${product.id}" class="added-text">Added ✔</span>
                            </div>
                        `;
                        productSection.innerHTML += productCard;
                    });
                })
                .catch(error => console.error('Error loading products:', error));
        }

        function toggleChat() {
              var chatWindow = document.getElementById('chat-window');
              chatWindow.style.display = chatWindow.style.display === 'none' || chatWindow.style.display === '' ? 'block' : 'none';
            }
            
            // Close chat if clicked outside
            document.addEventListener('click', function(event) {
              var chatWindow = document.getElementById('chat-window');
              var chatButton = document.querySelector('.chat-btn');
            
              // Check if the clicked target is not the chat button or the chat window
              if (!chatWindow.contains(event.target) && !chatButton.contains(event.target)) {
                chatWindow.style.display = 'none';
              }
            });
            
            function sendMessage() {
              var input = document.getElementById('chat-input').value.toLowerCase(); // Convert input to lowercase
              if (input) {
                // Append user message to the chat window
                var chatMessages = document.getElementById('chat-messages');
                chatMessages.innerHTML += `<div><strong>You:</strong> ${input}</div>`;
                chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
            
                // Fetch chatbot responses from response.json
                fetch('response.json') // Make sure this matches your file name
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                    return response.json();
                  })
                  .then(data => {
                    // Find a matching keyword in the responses
                    var botResponse = "Sorry, I don't understand."; // Default response
                    for (let i = 0; i < data.length; i++) {
                      if (input.includes(data[i].keyword)) {
                        botResponse = data[i].reply;
                        break; // Stop searching after the first match
                      }
                    }
            
                    // Append bot response to the chat window
                    chatMessages.innerHTML += `<div><strong>SNOWSHOP:</strong> ${botResponse}</div>`;
                    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
                  })
                  .catch(error => console.error('Error:', error));
            
                // Clear the input field
                document.getElementById('chat-input').value = '';
              }
            }
            
            function loadProducts() {
              fetch('products.json')
                .then(response => response.json())
                .then(products => {
                  var productSection = document.querySelector('.product-section');
                  products.forEach(product => {
                    productSection.innerHTML += `
                                        <div class="product-card">
                                           <a href="single_product.html"> <img src="${product.image}" alt="${product.name}"></a>
                                            <h2>${product.name}</h2>
                                            <p>$${product.price.toFixed(2)}</p>
                                            <button onclick="addToCart(${product.id})">Add to Cart</button>
                                            <span id="added-${product.id}" class="added-text">Added ✔</span>
                                        </div>
                                    `;
                  });
                })
                .catch(error => console.error('Error loading products:', error));
            }
            
            function addToCart(productId) {
              // Simulate adding product to the cart and updating the cart count
              let addedElement = document.getElementById(`added-${productId}`);
              addedElement.style.display = 'inline';
              setTimeout(() => { addedElement.style.display = 'none'; }, 2000);
            
              let cartCount = document.getElementById('cart-count');
              cartCount.innerText = parseInt(cartCount.innerText) + 1;
            }
            
            document.addEventListener('DOMContentLoaded', () => {
              loadProducts(); // Load products when the page is ready
            });
            
            // Function to toggle the navigation menu
            // Function to toggle the navigation menu and hamburger icon
            // Function to toggle the navigation menu and hamburger icon
            function toggleMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Toggle active classes on both menu and hamburger icon
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu on clicking any link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close menu if clicked outside
  document.addEventListener("click", (event) => {
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// Initialize the toggle function
toggleMenu();