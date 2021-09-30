---
type: TutorialStep
date: 2021-09-29
title: Tabs, Tabs, and More Tabs with HTMX
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

Tabs are commonplace in most user interfaces, and you can indeed implement the pattern without HTMX. However, there are circumstances where it makes sense to implement them with HTMX, especially when each tab can have a substantial amount of information that your users do not always access.

In this sample, you'll use HTMX to render only the tab the user has selected. Here we leverage the ideas of Hypermedia as the Engine of Application State, better known as HATEOAS. So no, it's not a breakfast serial, but a concept where the response contains the necessary information to convey state. In this particular example, the state of which tab is selected is already in the HTTP response. Therefore, there is no need to switch which tab is active or inactive on the client. First, let's take a look at the partial view implementation.

```html
<ul class="nav nav-tabs">
    @foreach (var tab in Model.Items)
    {
        <li class="nav-item">
            <a hx-get="@Url.Page("07_Tabs", new {tab})"
               href="#"
               class="nav-link @Model.IsSelectedCss(tab, "active")"
               aria-current="@Model.IsSelectedCss(tab, "page")"
               hx-target="#tabbed-content">
                @tab
            </a>
        </li>
    }
</ul>
```

You'll notice that each tab utilizes `hx-get` and passes the `tab` parameter to the ASP.NET Core endpoint. Upon receiving the request, we render the appropriate HTML. This technique is beneficial for a few reasons:

1. Page loads are much smaller since we only render one tab at a time.
1. Requests can load new tabs that were not available at first.
1. Changing tabs can rerender content updates.

Let's have a look at the `PageModel` implementation.

```c#
public class Tabs : PageModel
{
    public IEnumerable<string> Items { get; }
        = new[] {"First", "Second", "Third"};
    
    [BindProperty(Name = "tab", SupportsGet = true)]
    public string? Tab { get; set; }

    public bool IsSelected(string name) => 
        name.Equals(Tab?.Trim(), StringComparison.OrdinalIgnoreCase);

    public IActionResult OnGet()
    {
        // make sure we have a tab
        Tab = Items.Any(IsSelected) ? Tab : Items.First();
        
        return Request.IsHtmx()
            ? Partial("_Tabs", this)
            : Page();
    }

    public string? IsSelectedCss(string tab, string? cssClass)
        => IsSelected(tab) ? cssClass : null;
}
```

You could imagine calling a database or third-party service to retrieve information. And again, we see the ternary approach used to handle initial page loads and HTMX requests. At this point, you're likely sensing a pattern. As always, consider your use case and whether it would be more beneficial to separate the tabs into different endpoints.

In the following video, we'll see how to handle keyboard shortcuts.