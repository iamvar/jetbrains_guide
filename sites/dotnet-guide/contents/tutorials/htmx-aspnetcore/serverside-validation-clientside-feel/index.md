---
type: TutorialStep
date: 2021-09-29
title: Server-side Validation, Client-side Feel
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

Form Validation With A Clientside Feel

Clientside validation can help users fix problems before making a request, but often client-side validation is insufficient. What do I mean by "insufficient"? By design, clients rarely have the complete information necessary to determine if a user form will pass server-side validation. A typical example is a user registration form. While a username may follow the on-screen criteria for a valid username, newcomers won't know whether their registration will be successful until the application checks the username for uniqueness against existing users.

Generally, forms have input validation and state validation. State validation requires a combination of inputs and external data to determine validity. In these more complex scenarios, you can use HTMX to submit the form and leverage ASP.NET Core's sever-side validation mechanisms to highlight and display problems. The approach also means we can avoid creating incomplete validations clientside that can quickly get out of sync with our server-side counterparts.

Let's have a look at how we can accomplish server-side form validation with a client-side feel.

The first step is to use a validation library. In this sample, we'll use Data Annotations, the built-in validation library for ASP.NET Core. Next, in our PageModel, we need to decorate our parameters with the necessary attributes.

```c#
public class FormValidation : PageModel
{
    [BindProperty, Required]
    public string? Name { get; init; } = string.Empty;

    [BindProperty, Required]
    public int Age { get; init; }

    public async Task<IActionResult> OnPost()
    {
        // see the loading spinner (remove for production)
        await Task.Delay(TimeSpan.FromSeconds(1));
        // handle Htmx request
        return Request.IsHtmx()
            ? Partial("_Form", this)
            : Page();
    }
}
```

We're using the `Required` attribute, but we can use any Data Annotation provided validation. Looking at the `OnPost` method, we see the ternary approach to rendering our page. We have factored our `_Form` into a partial view. Let's see how we've implemented the form.

```html
<form hx-post="@Url.Page("09_FormValidation")"
      hx-swap="outerHTML"
      class="form-horizontal needs-validation"
      _="on htmx:beforeSend set #submitButton.disabled to 'disabled'">

    <!-- Text input-->
    <div class="mb-3">
        <label class="form-label" asp-for="Name"></label>
        <input type="text" class="form-control" asp-for="Name">
        <div class="invalid-feedback">
            <span asp-validation-for="Name"></span>
        </div>
    </div>

    <!-- Text input-->
    <div class="mb-3">
        <label class="form-label" asp-for="Age"></label>
        <input type="text" class="form-control" asp-for="Age">
        <div class="invalid-feedback">
            <span asp-validation-for="Age"></span>
        </div>
    </div>

    <div class="control">
        <button id="submitButton" type="submit" class="btn btn-primary">
            <span class="htmx-indicator">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="visually-hidden">Loading...</span>
            </span>
            Submit
        </button>

        @Html.AntiForgeryToken()
    </div>

</form>
```

We have our form that uses `hx-post` to submit user input. Here we see our first use of **Hyperscript**, a language that allows us to describe behaviors that should occur on a particular event. In this case, we'll disable the submit button to prevent duplicate submissions. Beyond the few HTMX attributes, it is all standard ASP.NET Core validation, with the use of `asp-validation-for` attributes on our message span elements.

Let's try out the form. Submitting an empty form will enable the HTMX indicator and then display the validation messages. You'll notice that the page still has a client-side feel but with no need to sync serverside and clientside validation.  Of course, if you still want to perform clientside validation, you can do so but will need to dedicate more effort and a lot more JavaScript. That said, server-side validation is a must, so why not just leverage it to its fullest?

In the following video, we'll see how to use long polling to create a near real-time experience for users of your applications.