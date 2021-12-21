# Code Review

- There's a very consistent feel to the way the components are written. Things feel scoped well to where they make sense, and using CSS variables and NgRx stores keep things simpler to update.
- In the `book-search.component.ts` file, I noticed that the initial store call to get the books is handled with a subscription. This seems to be done so that the books value gets the array directly instead of receiving an observable, but it's not often I've seen it used in this manner. Potentially a more direct selector could be created?
- In the `book-search.component.html` file, I noticed that date formatting is being handled by a function, instead of using the Angular date pipe. While I think small functions used to mutate data are ok (and in this case might be simpler to parse the localization), passing function calls in templates is something to be careful with. It's often good to keep templates as logic-free as possible, though there's always trade offs with this.
- It would be nice to have a loading indicator on the main screen when a search is being activated. It can feel like you're not sure what's going on, or when the search actually starts.
- It's also unusual that the previous search results show up whenever you start to type a new term in the input field. It's a bit confusing as a user to have those search results go away, only to come back the second you start typing something new.
- A note that you need to press enter to start the search would be helpful. Especially with the previous search results re-populating, visually it feels like once you start typing the search should be going, but it doesn't actually send until you press enter. A better way to show that would be helpful.
- The site style is not set up for smaller screens - the grid runs together and makes it hard to read. Would be a nice touch to allow the grid to adjust to one book per row past a smaller breakpoint.

From the Lighthouse testing:

- The search button does not have an accessible name.
- The color contrast of the text does not appear to be quite high enough to pass the AAA specifications.
- In the SEO section, it mentions that the search icon button is too small for mobile devices to be able to tap easily. That size could be increased and it's spacing on the bar, so it's easier to activate on mobile.

Other accessibility issues:

- The input field relies on the placeholder text to tell the user what to do. This should have a visible label as well.
- Though you seemingly can tab through search results, there's no indicator to know which result you're currently on. Changing the color of the book's button when it's focused could help with this.
- Books don't have alt text on their images. Would be helpful to add something there to signify what the image is.

Tests:

- The `reading-list.reducer` test was failing initially, since the failed states for adding and removing books weren't handled in the reducer file. I added reducers to handle those use cases, so the functions would work as the user expected.
