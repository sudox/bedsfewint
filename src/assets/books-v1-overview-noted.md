### Overview of the Books v1 Feature

This is meant to be a relative straight-forward feature for working with books. It is very CRUD like, and has no hypermedia nor caching.

It is designed to be a *reasonable* applications, but not following good Application (SPA) patterns.

It used Redux with @Ngrx/Store, etc. For communicating with the backend.

#### The Back-End

The back-end is a standard .NET Core Web API (V5).

You can see the Swagger UI for it here: [Swagger UI - Click BooksV1](http://localhost:1337/swagger/index.html)

The books model looks like this:

```javascript
{
  "data": [
    {
      "isbn": "string",
      "title": "string",
      "author": "string"
    }
  ]
}
```

And is provided by the API using Entity Framework and Models.

The models are implemented using C# 9 Records.

```csharp
public record BooksModel(string ISBN, string Title, string Author);
public record GetBooksResponse(IList<BooksModel> Data);
```

In the client, we are using `@ngrx/store`, `@ngrx/effects`, etc. Our state looks like this:

```javascript
{
  'books-v1': {
    books: {
      ids: [
        '1-2-3',
        '1-2-4',
        '2-1-1',
        '2-1-2',
        '3-1-1'
      ],
      entities: {
        '1-2-3': {
          isbn: '1-2-3',
          title: 'The Red Book',
          author: 'Carl Gustav Jung'
        },
        '1-2-4': {
          isbn: '1-2-4',
          title: 'Memories, Dreams, Reflections',
          author: 'Carl Gustav Jung'
        },
        '2-1-1': {
          isbn: '2-1-1',
          title: 'The Hobbit',
          author: 'J.R.R. Tokein'
        },
        '2-1-2': {
          isbn: '2-1-2',
          title: 'The Simillirion',
          author: 'J.R.R. Tokein'
        },
        '3-1-1': {
          isbn: '3-1-1',
          title: 'Reality',
          author: 'Peter Kingsley'
        }
      },
      authorFilter: null
    },
    uiHints: {
      booksLoaded: true
    }
  }
}
```

When we load the books in the client, it is happening in response to an action being dispatched from the `app.components.ts`:

Sample:
```typescript
  constructor(store: Store<AppState>) {
    store.dispatch(applicationStarted());
  }

```

This is a command pattern to *preload* all the data when the application launches. This action is 'caught' by `app-book.effects.ts` and redispacted as `loadBooksData()`;

###### Discussion and Modifications

- Review the **Redux** implementation for everyone (especially the back-end people).
- Review the **API** side for everyone. (especially the front-end people).

**Discussion Point 1** - loading the books at the start of application has pros and cons. 

- Pros
  - The data is "pre-loaded" when the user first enters the application.
  - This hides any delays in having the applicaiton responsive.
  - **Some** data can be preloaded this way. Static data, etc. (lookup lists, etc.)
  - Todo: Add the delay in the API `appsettings.development.json` file to see a simulated delay.

- Cons
  - The data could be stale (out of date) by the time we need it.
  - **Note** this isn't *always* a problem, obviously.
    - Some data has a long life and rarely changes.
    - Often data is logically segmented by user. Nobody else will be editing *their* data but them.

**Approaches**

There are several ways of helping with this issue. Each has a tradeoff. 

**Using** `[ResponseCache]` on the API Method.

This technique is "built in" to .NET Core APIs. We cover this in some detail in the **Back End Services 200** course.

In and of itself, all the attribue does is add the `Cache-Control` header to the response. It is up to the client (or intermediaries) to honor it. Fortunately, most web browsers do a good job of that.

You *can* have the service hold cached responses for you, but in a Micro Service architecture it is better to do this with a shared cache of some sort, or the API Gateway.

By adding this header, you are informing the clients and intermediaries how they should treat the response in terms of caching. 

<div class="alert alert-success">

**Demonstration:** Adding Response Caching to the API

We will add the `[ResponseCache]` attribute to the API and consider the options.

Then we will look at configuring the caching within our API.
</div>

**Using** Conditional Gets (E-Tags with `must-revalidate`)

This can be helpful because it allows you to set shorter expirations on resources, and when the client requests the resource from the API after it is expired, the server can tell the client that the representation they have is still useful as is, without returning the entity.

Depending on the client, though, most of the time in making requests for small amounts of data is the request itself.

Using this technique is particularly helpful when:
- The responses are large and rarely change, but when they do, the client **must** have the current version. (e.g. a price list)
- You are trying to save bandwidth by not returning large responses to the client.

<div class="alert alert-success">

**Demonstration**: Using CacheCow for adding entity tags, etc. to responses.

We will decorate our `GET` method with `[HttpCacheFactory]` attribute.

</div>

We will use this more when we discuss **Concurrency in APIs** below.

**Back End**

Utilize caching attributes.

**Discussion** E-Tag generation options.

**Discussion** Data Caching (bringing the data closer to the API)
- CDN
- No Shared Databases
- Using a Distributed Cache 
  - Like Redis as we did in **Back-End Services 200**

The only way to speed up access in many situations is the rely on *eventual consistency* and create event-driven APIs.

**Front End**

- Performing Filtering and Sorting in the Client using the loaded state.
  - The selectors for our `View Books by {{book.author}}` link in the list does this.




<div class="alert alert-danger" markdown=1>

### Anti-Patterns

Caching and cache invalidation are one of the ["hard problems"](https://martinfowler.com/bliki/TwoHardThings.html) in programming.

In terms of caching, like most things, we are best leaving it the "pros". Lots of software has been developed to help with this (things like output caching in .NET Core, API Gateways, etc). But each of these things requires us to follow closely the idiomatic usage of HTTP. 

**DO NOT MAKE CRAP UP**

If you are an API designer, you are beholden to learn the *correct* way, according the the [HTTP Specification (RFC 2616)](https://tools.ietf.org/html/rfc2616).  

For example:
- Use the HTTP Methods correctly.
  - `GET` is the target of caching. 
  -  `GET` should be *safe* and *idempotent*
  - To filter results of a GET request to a `collection` resource, use a Query String parameter.
    - **DO NOT** use 'Custom Headers', etc. (there is no such thing!)
</div>
