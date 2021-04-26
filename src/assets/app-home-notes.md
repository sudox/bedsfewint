### Overview of the Class

This class is meant for developers that have completed either Back-End Services 200 or Front-End Web 200. It is great if you have completed *both*, but not necessary.

### Getting Started

This project uses docker. **TODO: Put the instructions for pulling and starting the docker image here**

These notes, and all the notes for the various features are in the `/assets` folder as Markdown files. You can edit them and add your own notes as we go.

### The Plan
We will explore various topics that are on the border between the client and the server. 

### Introductory Stuff


#### Caching
We will start with some general discussion of *caching*, and how it works with Angular clients.

We will look at two forms of caching:
- Response Caching with the `ResponseCache` attribute on our controllers.
- Response Caching with the `HttpCacheFactory` attribute from the CacheCow library.

This will be done with the [http://localhost:4200/books-v1/books](http://localhost:4200/books-v1/books) resource.

This resource is read-only.
> **Note**
> This `/booksv1/books` resource is intentionally designed as "chunky" - embedded data that *should* be either a complete representation or a link. The instructor will show the limitation of this choice, and the "design smells" associated with it. This willl lead us to the next topic.

#### Hypermedia / Caching / 

After we have looked at basic caching, we will look at how we can improve client performance by using Hypermedia to improve both our design for the client, and better cache performance.

#### Using the Store Resource Achetype and Dealing with Asychronous Operations with HTTP

#### Implementing Web Sockets for Real-Time Support

#### Dockerizing Our App

By putting our app in a Docker Container, even if that isn't the container that ultimately ends up in production, we can share it with other developers and testers. 

These notes are in the `/assets/app-home-notes.md` file. Edit at will.
