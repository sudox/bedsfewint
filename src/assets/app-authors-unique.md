## Dealing with Uniqueness and Concurrency on Post

**Problem**: Our API only allows unique authors. No two authors can have the same first and last name.

### Scenario

The SQL Server backing up the API has a unique constraint on Author LastName + Author FirstName.

If we add a new author with a unique first and last name combination - no problem.

<div class="alert alert-info">

We are using the standard "eventual consistency redux model" here. Namely, when we add something, we verify as best we can (here it is simple because we just need to make sure both properties are there). So we add it to the state with a fake "temporary" id, send it to the API. When it comes back, we update the state, replacing the old id with the new id.

</div>

### Approaches

- Use an Async Validator with a `HEAD` request:
  - this is covered in the Angular UI Patterns course.
  - Would require a round-trip, but can be useful.

- Consider if this is really an error or not. 
  - Maybe it isn't! If what the user wanted was to add an author, and the API didn't have to do anything to make that happen, why bother the user? 

### Solution

We will take the second approach above. We will have the API catch the `DbUpdateException` and return a redirect to the exisiting author entity. 

We will update our reducer to update the state accordingly.
