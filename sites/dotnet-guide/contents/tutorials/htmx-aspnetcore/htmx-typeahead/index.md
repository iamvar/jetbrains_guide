---
type: TutorialStep
date: 2021-09-29
title: Search as You Type with HTMX
technologies: [.net, asp.net]
products: [rider,resharper]
topics: [data,web,editing,inspections]
author: khalidabuhakmeh
subtitle: Giving context to HTMX
thumbnail: ./thumbnail.png
longVideo:
poster: ./thumbnail.png
url:
---

Search as you type is a mainstay of a modern user interface and a baseline feature most users expect.  While this search sample is more complex than previous examples, it's pretty easy to break down and implement.

Given we have a search textbox, we want to pass the contents of our textbox and return results from our server. We'll be using familiar HTMX attributes of `hx-get` and `hx-target`, along with new attributes `hx-trigger` and `hx-indicator` to complete this solution. We'll also be reusing our search results table by refactoring it into a partial view, a common technique you'll become familiar with as you use HTMX more.

The first step is to decorate our `input` element with the necessary HTMX attributes.

```html
<input type="text"
       asp-for="Query"
       id="query"
       autocomplete="off"
       hx-get="@Url.Page("04_Search")"
       hx-target="#results"
       hx-trigger="keyup changed delay:250ms"
       hx-indicator="#loading"
       placeholder="Search"
       class="form-control"
       aria-label="Username"
       aria-describedby="search-addon">
```

The most notable attribute in this collection is `hx-trigger`. The default trigger for input elements is `change`, but we have changed it to delay the event by `250ms`. Thus, every keystroke resets the change event timer, giving us debounce behavior, limiting the number of requests we issue to the server. Next, let's look at our serverside implementation.

```c#
public IActionResult OnGet()
{
    Results = string.IsNullOrEmpty(Query)
        ? Games
        : Games.Where(g => g.ToString().Contains(Query, StringComparison.OrdinalIgnoreCase)).ToList();

    if (!Request.IsHtmx()) 
        return Page();
    
    Response.Htmx(h => {
        // we want to push the current url 
        // into the history
        h.Push(Request.GetEncodedUrl());
    });

    return Partial("_Results", this);
}
```

There are a few notable elements in the C# method:

1. The page will work with and without HTMX, making our page shareable.
1. We push an HTMX header to change the URL of our current page.
1. We utilize the same `_Results` partial used on initial page load.

Now let's look at the contents of our partial view. How complicated is it?

```html
@model Exercises.Pages.Search
@{ ArgumentNullException.ThrowIfNull(Model); }

@if (Model.Results is {} games)
{
    @foreach (var game in games)
    {
        <tr>
            <td>@game.Year</td>
            <td>@game.Publisher</td>
            <td>@game.Console</td>
            <td>@game.Name</td>
        </tr>
    }
}
else
{
    <tr>
        <td colspan="4">No Results for "@Model.Query"</td>
    </tr>
}
```

Wow! Not complicated at all! It's the same Razor syntax we know and love. In this case, we're even able to use the same `PageModel` that informs our initial page load. Let's test it out!

Typing in the input, we see the results, and the URL in our browser change whenever we stop typing—a fantastic progressive enhancement with a few HTMX attributes and reworking of our C# code.

In the following video, we'll explore infinite scrolling patterns with HTMX and ASP.NET Core.