import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

/**
 * Quotation card
 * Powered by the Quotable API
 * https://github.com/lukePeavey/quotable
 */
export default function Quotable() {
  const [data, setData] = React.useState(null);

  async function updateQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
    } catch (error) {
      // If the API request failed, log the error to console and update state
      // so that the error will be reflected in the UI.
      console.error(error);
      setData({ content: "Opps... Something went wrong" });
    }
  }

  // Run `updateQuote` once when component mounts
  React.useEffect(() => {
    updateQuote();
  }, []);

  // Do not render until the first quote is loaded
  if (!data) return null;
  let twitterhref =
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
    encodeURIComponent('"' + data.content + '" ' + data.author);
  let tumblrhref =
    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
    encodeURIComponent(data.author) +
    "&content=" +
    encodeURIComponent(data.content) +
    "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";
  return (
    <div className="App">
      <Card style={{ width: "90%", maxWidth: "40rem" }} id="quote-box">
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p id="text">{data.content}</p>
            {data.author && (
              <footer className="blockquote-footer">
                <cite title="Source Title" id="author">
                  {data.author}
                </cite>
              </footer>
            )}
          </blockquote>
        </Card.Body>
        <Card.Footer>
          <a id="twitter-quote" title="Tweet this quote!" target="_blank" href={twitterhref}><i className="fa fa-twitter"></i></a>
          <a id="tumblr-quote" rel="noopener noreferrer" title="Post this quote on tumblr!" target="_blank" href={tumblrhref}><i className="fa fa-tumblr"></i></a>
          <Button variant="primary" onClick={updateQuote} id="new-quote">
            New Quote
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
