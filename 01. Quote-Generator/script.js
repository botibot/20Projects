const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

/* Show Loading */
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

/* Hide Loading */
function complete() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get Quote from API
async function getQuote() {
  loading();
  const proxyUrl = "https://lit-refuge-37920.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiURL);
    const data = await response.json();
    /* if author is blank, add 'unknown' */
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    /*  if quote its too long scale down the font size */
    if (data.quoteText.length > 128) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    /* Stop Loader, show the quote */
    complete();
  } catch (error) {
    console.log("Whops", error);
    getQuote();
  }
}

/* Tweet Quote */
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blonk");
}

/* Event Listener */
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
