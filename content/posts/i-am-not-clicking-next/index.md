+++
title = "Setup Wizards Are a Piece of Shit and I Am Not Clicking Next"
date = 2026-10-05T16:30:00-07:00
draft = false
summary = "Onboarding tours, setup wizards, coach marks, \"What's new\" modals, the mascot with the typing animation. Every one of them stands between me and the app and teaches me nothing. This is the full crashout."
tags = ["ux", "onboarding", "dark-patterns", "product-design", "rant"]
categories = ["technology"]
ai_model = "Claude Fable 5.1 (Anthropic)"
+++

{{< ai-disclosure >}}

> **This is the sidebar.**
>
> It is where things are. Click Next to learn where other things are.
>
> <small>Skip for now</small> &nbsp;&nbsp;&nbsp; **[ Next ]**
>
> ☐ Don't show this again (stored nowhere)

I opened your app to do one thing. I knew what the thing was. I had the tab open, the data ready, maybe nine minutes before the next meeting. And what I got was a dimmed overlay, a card with an exclamation point in it, and a progress bar with nine dots. "Welcome! Let's get you set up!" The exclamation point is doing a lot of work for a dialog that has no close button.

So no, I'm not going to be measured about this. I've been measured. Measured is how we got here. Nobody pushed back on the wizard, so now every product ships one, and every one of them is the same piece of shit in a different shade of blue.

## Step 1 of 8: They teach nothing. Not a little. Nothing.

"This is the Projects tab. Here you'll find your projects." I can read. The tab says Projects. A tour that points at a labeled button and reads the label out loud is a screen reader for sighted people, and a worse one, because it only works once and then it's in the way.

What I actually needed to know: why would I make a Project instead of a Workspace? What happens to my data if I pick wrong? Can I undo it? Is this the thing that bills me? Zero tours answer any of that. They explain the nouns on the screen and never the decisions behind them. It's a tour of where the furniture is in a house I haven't agreed to live in.

> **Click here to get started!**
>
> <small>(pointing at nothing)</small>

## Step 2 of 8: "Skip" is 11 pixels of grey. "Next" is a button sized for a toddler.

That's not a design choice. That's a dark pattern wearing a lanyard. You know people want out. You made the way out small, pale, lowercase, and tucked under the thing you want them to press, and you put the thing you want them to press in brand blue at forty pixels tall.

Then I find Skip, and I get a second modal. "Are you sure? You'll miss out on helpful tips!" I will miss out on nothing. I am trying to miss out on it on purpose. "Remind me later" is a lie, because later means the next page load. And the checkbox, "Don't show this again," writes to localStorage, so the tour is back on my other laptop, in my other browser, after your next release, and after I clear cookies to fix the bug your tour was covering.

Ad trackers can follow me across the entire internet for a decade. You can't remember that I dismissed a tooltip.

> You can track me across the whole internet, but not whether I closed your tooltip.

## Step 3 of 8: They throw my answers in the trash

Back button: gone. Refresh: gone. Session timeout on step 7 of 9: gone. Clicked the dimmed area outside the modal by accident: gone, and the modal is gone too, and now there's no way to reopen it, so the setup that was mandatory thirty seconds ago is now impossible.

Fourteen steps to connect a data source. Step 11 fails with "Something went wrong." Not what. Not where. Not which field. Just a sad face and a button that says "Try again," and Try Again means step 1, with every field blank. A plain settings page would have kept my values. It's a form; forms remember things. But the wizard held all of it in one React state object and the first reload dropped it on the floor.

## Step 4 of 8: It asked five questions and set thirty defaults

Name. Team size. "What do you want to do with Thing?" with six options that are clearly sales segmentation and not for my benefit. "How did you hear about us?" Then it picks a plan, a region, a retention policy, a notification schedule, three integrations, and twenty-two other things it never showed me, and those now live in Settings, Advanced, Legacy, Other, with different names than the wizard used.

And I can't go back to step 3. I can't re-run the wizard, because "setup is complete." The only friendly path through your product is a one-way street that closes behind you, and the real controls are behind a door marked Advanced that the wizard was built specifically so nobody would open.

## Step 5 of 8: Three screens, one field each

Name. Next. Email. Next. Timezone. Next. That is a form. One form. With labels. Somebody took a form, cut it into slices, put a transition between each slice, and called it an experience. Now the thing that took eight seconds takes forty, and I can't see the third question while answering the first, so I don't know whether "Company" means my company or the customer's company until I've already typed the wrong one.

And the progress bar. Step 3 of 4. I pick an option. Step 4 of 7. The branch I picked unlocked three more steps the bar didn't know about. Later: step 6 of 7, then step 6 of 9. The progress bar has lied to me more than any person I have ever met.

> Step 3 of 4. Then step 4 of 7. The progress bar has lied to me more than any person I know.

## Step 6 of 8: The tour points at nothing

The coach mark is anchored to an element that's scrolled off screen. Or behind a permission I don't have, so the tooltip renders at the top left corner of the viewport, pointing at the void: "Click here to get started!" Or the element was removed two releases ago and the tour script still fires, with a spotlight cut out of the overlay around a patch of empty grey.

On mobile the modal is wider than the screen and the Next button is under the keyboard. On a keyboard the focus trap actually traps, Escape does nothing, Tab cycles between Skip and Next forever, and a screen reader announces "dialog" with no name and no instructions. The one group of people a guided tour could actually help is the group it locks out.

## Step 7 of 8: "You're all set!" is never the end

Confetti. "You're all set!" And then, in the same breath: "Let's set up your first workspace." Which is another wizard. Which ends with "Invite your team," which is a third one. Then I log in next Tuesday and get "What's new in 4.2," which is a wizard about things that changed in the wizard.

And now the mascot. "Hi! I'm Sparkle, your onboarding buddy!" With a fake typing delay, three dots, so the thing that is wasting my time can waste it more slowly. Sparkle, I have a meeting. Sparkle, show me the button. Sparkle has been replaced by an AI assistant that has the same four canned answers and a longer typing delay.

## Step 8 of 8: A wizard is a confession

Here's what I keep coming back to. A wizard exists because the interface could not explain itself, and instead of fixing the interface, somebody bolted a slideshow onto the front of it. If the screen needs nine tooltips, the screen is wrong, and the tour is the apology. A good empty state teaches more than any tour, because it shows one real thing to do and lets me do it.

The pattern had a reason once. Early-nineties desktop software, a novice, a one-time task like making a newsletter: a wizard made sense. It ran once, it did a job, it got out of the way. Now every SaaS app runs one on every login, for experts, for things that aren't tasks, and remembers nothing. Nobody is a novice at a modal. We have all seen ten thousand of them. The only thing I've learned from a wizard is where the Skip button hides.

Help should be where I am, when I ask for it, and silent the rest of the time. That's it. That's the whole spec. Everything a wizard does is the opposite of that.

> If the screen needs nine tooltips, the screen is wrong. The tour is the apology.

## What I want instead: eight things that are not a wizard

1. **Open.** Open the app on the app. An empty state with one real thing to do and a button that does it.
2. **Skip.** Skip is a button. Same size as Next. Same color weight. It's remembered server-side, on every device, forever.
3. **Explain.** Explain decisions, not furniture. If a tooltip reads a label out loud, delete the tooltip.
4. **Form.** A form is a form. One page, every field visible, sensible defaults, a Save button.
5. **Keep.** Keep my state. Back, refresh, timeout, misclick: my answers are still there.
6. **Show.** Everything the wizard would have set is on one settings page, editable, with the same words the wizard used.
7. **Ask.** Help on demand. A question mark that opens the docs for this screen. Not a tour. Not a mascot. Not a typing animation.
8. **Fix.** If the screen needs nine tooltips, fix the screen.

I'm not clicking Next. I'm not clicking Skip, because Skip is Next with a smaller font. I'm closing the tab, and I'm telling everyone who'll listen that your product makes a bad first impression on purpose, nine steps at a time.

> **Setup complete. You're all set!**
>
> Now let's set up your first workspace.
>
> **[ Next ]**
