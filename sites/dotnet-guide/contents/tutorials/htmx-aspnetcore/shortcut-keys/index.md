---
type: TutorialStep
date: 2021-09-29
title: Shortcut Keys For Web Applications
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

Web applications have seen a transformation over the internet's lifespan and now provide experiences that rival native desktop applications. One of the significant elements that power users look for in their applications is keyboard shortcuts. Keyboard shortcuts can reduce the time it takes to perform an action and increase the productivity of repetitive tasks.

HTMX doesn't restrict triggers to users' clicks or custom DOM events like we've seen in the previous examples. Instead, you can also listen for a combination of keystrokes. So, in the following example, we'll listen to know when the user presses the `?` key and display a toast notification in the bottom-right of our screen.

```html
<div class="mb-5" 
     hx-get="@Url.Page("08_Shortcuts", "Help")"
     hx-target="#toast-goes-here"
     hx-trigger="keyup[key=='?'] from:body"
     hx-swap="innerHtml">
```

Notice that our `hx-trigger` attribute has a value of `keyup[key=='?'] from:body`. HTMX will trigger the `hx-get` request if the `?` keystroke is invoked anywhere within our HTML body. Since DOM events bubble up, we'll see our toast notification injected into our target element of `#toast-goes-here`. In the trigger, we're also using a concept known as a **trigger filter**, which uses brackets (`[]`) and allows you to laser-focus events on specific scenarios.

While this scenario is simple, You can write HTMX triggers to fit some very complex designs, with triggers around visibility, mouse movements,  key combos, timers, and custom events. In general, if you can imagine it, HTMX can trigger requests off of it.

The following video will see a possible option for performing complex server-side form validation with a clientside feel.