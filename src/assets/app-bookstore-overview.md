### Bookstore on Hypermedia

This section will be used to demonstrate hypermedia, and it's impact on things like consistency and caching, as well as some basic security.

**Hypermedia** means that the representations sent from the server contain *affordances* (usually links) that *guide* the consumer through the API.

This is a great pattern for *back-end for front-end* applications.



#### Programatically Caching in the Browser

As we pull hypermedia resources from the server, we can programatically add them to *a* cache in the browser.

[Read about the Cache here](https://developer.mozilla.org/en-US/docs/Web/API/Cache)

**Note**: I have yet to implement this in production code.
