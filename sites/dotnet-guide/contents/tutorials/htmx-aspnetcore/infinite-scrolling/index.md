---
type: TutorialStep
date: 2021-09-29
title: The Fun Never Ends With HTMX and Infinite Scrolling
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

Infinite scroll patterns are popular on social media sites, where the app represents content as a stream of time and thoughts. You'll likely never see the beginning or end of the stream, but you can hope to scrub through a specific period. If you're interested in implementing this pattern, well, you're in luck. So far in this video series, we've covered the most common triggers of `click` and `change`, but HTMX has so many more options. We'll also be using the swap value of `afterend` to keep our scrolling going and going and going.

In this example, we'll start by looking at the C# implementation of the Razor page.

```c#
public class Scroll: PageModel
{
    [BindProperty(SupportsGet = true)] 
    public int Cursor { get; set; } = 1;
    
    public IActionResult OnGet()
    {
        return Request.IsHtmx()
            ? Partial("_Cards", this)
            : Page();
    }
}
```

Here we see the same ternary pattern used in a previous example. The ternary design is to support both the initial page load and subsequent requests to the same endpoint. I prefer this approach, but you could also separate the two behaviors of "full page load" and "partial page load" into distinct endpoints. As you may have noticed, we have a partial view of `_Cards`. Let's take a look at it.

```html
@model Exercises.Pages.Scroll
@{
    ArgumentNullException.ThrowIfNull(Model);
    var end = Model.Cursor + 19;
}

@for (var i = Model.Cursor; i <= end; i++)
{
    <div
        class="card mb-4 ms-1" aria-hidden="true"
        @if (i == end)
        {
            // conditional attributes
            <text>
                hx-get="@Url.Page("05_Scroll", new {cursor = end + 1})"
                hx-trigger="revealed"
                hx-swap="afterend"
            </text>
        }>
        <img alt="random image" 
             width="125"
             height="125"
             src="https://picsum.photos/125/125?cache=@DateTime.Now.Ticks" class="card-img-top"/>
        <div class="card-body bg-dark text-white">
            <div class="h6 card-title text-center ">
                Card #@i
            </div>
        </div>
    </div>
}
```

For the sake of this demo, we're faking paging. Every request will generate a new set of elements from a `Cursor` value. Once we have the items, we loop through them, rendering our cards. The last card in the collection is where we add our HTMX attributes.

```html
hx-get="@Url.Page("05_Scroll", new {cursor = end + 1})"
hx-trigger="revealed"
hx-swap="afterend"
```

When the last card is `revealed`, meaning it has scrolled into the client view, we request to get the next set of items, finally adding the response to the end of our current set of cards. An important note here is that HTMX will wire up any HTMX attributes as they appear in our responses, and we can expect any HTMX definitions to work, whether they were on the initial page or our server returns them in an HTML snippet.

This UI pattern is straightforward to implement and ultimately is as complex as your backend paging approach.

In the following video, we'll take a look at another standard UI pattern, the modal.