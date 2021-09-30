---
type: TutorialStep
date: 2021-09-29
title: ASP.NET Core Razor TagHelpers for HTMX
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

So far in this video series, we've leaned on HTMX to power a range of user scenarios. It may seem like an obvious statement, but HTMX relies on our ability to generate ASP.NET Core links to endpoints. So far, we've used the `UrlHelper` class, but its use within our HTMX attribute definitions can add unwanted noise to already crowded HTML elements. Luckily for ASP.NET Core developers, we can use TagHelpers. With TagHelpers, we can process HTML elements before we render them to the client. Let's take a look at a before and after using HTMX.NET and the included TagHelpers.

Before using the HTMX.NET TagHelpers, we'd have an HTML element that looks like the following.

```html
<a 
   hx-get="@Url.Page("12_TagHelpers")" 
   hx-target="#target" > Click Me </a>
```

HTMX.NET models its TagHelpers after the ASP.NET Core link helpers. So let's change the previous example to use the HTMX.NET feature.

```html
<a 
   hx-get 
   hx-page="12_TagHelpers" 
   hx-target="#target"> Click Me </a>
```

HTMX.NET recognizes the presence of any `hx-*` method attribute and attempts to resolve a link only if the original value is empty. Using HTMX.NET, we can now generate links to endpoints, routes, controller, and Razor pages, all with the addition of a few HTML attributes.

Using either the `UrlHelper` or the TagHelpers approach is all up to your style, but it is nice to know we have options when integrating HTMX and ASP.NET Core.

There's more to HTMX.NET, and if you're interested in finding out more, [head on over to the GitHub repository](https://github.com/khalidabuhakmeh/htmx.net). I continue to add features to support more of what HTMX offers with an ASP.NET Core flair.

In the following video, let's take a look at using HTMX with client-side templates.