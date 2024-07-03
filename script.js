const apiKey = "8e0b25eba7594173826c3a8eeb6ae6d5";

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched data:", data);
    return data.articles;
  } catch (error) {
    console.error("Error fetching Random News", error);
    return [];
  }
}

searchButton.addEventListener('click',async ()=>{
  const query = searchField.value.trim()
  if (query!==''){
    try {
      const articles = await fetchNewsQuery(query)
      displayBlogs(articles)
      
    } catch (error) {
      console.log('error fetching news by query',error)
    }

  }
})

async function fetchNewsQuery(query){
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched data:", data);
    return data.articles;
  } catch (error) {
    console.error("Error fetching Random News", error);
    return [];
  }


}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  if (!articles || articles.length === 0) {
    blogContainer.innerHTML = "<p>No articles found.</p>";
    return;
  }
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    title.textContent = article.title;
    const description = document.createElement("p");
    description.textContent = article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogContainer.appendChild(blogCard);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news ");
  }
})();
