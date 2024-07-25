# Writing conventions

## Style

Our writing style reflects our overall tone of friendly-yet-formal documentation. While we want to deliver content that is both detailed and accurate, we want the reader to relate.

Sometimes, we convey direct instructions in a formal way, where no deviation is possible. Sometimes, we go into more detailed explanations and describe scenarios in a conversational manner, to make the reading experience relatable. As a contributor to the Unraid Docs, consider where best to use each tone.

:::info

Given Unraid OS has global reach, we avoid using jargon, slang, or idioms in general. These may be misinterpreted by non-native English readers, and make translation harder for the community.

:::

### Accuracy, brevity, clarity (ABC)

We prefer to be concise, clear, and precise in our documents, than simply playful and allegorical. Why? Because at the end of the day, our documentation must be accurate enough to guide users through as many options, use cases, and situations as possible, with complete confidence.

For example, if you are writing a set of instructions for our readers, we recommend you try out every step and write as you go along. This ensures the instructions work and  different possible outcomes are covered in your procedure.

### Write for all levels of users

Your audience may be skilled in Linux and have a complete understanding of what's happening behind the UI. They might also come from a different background and may just be individuals from a non-technical background, who are learning on the go.

We write so that everything is clear to both experts and newcomers alike.

## Typographic conventions

Unraid Docs use Markdown syntax for text formatting. The use of bold, italic, a combination of bold and italics, and monospaced font, in turn, help the reader identify common user interface elements and navigation in the WebGUI.

### Referencing WebGUI elements

Use these conventions to signal users what you're writing about:

| Element | Convention | Example |
| ------- | ---------- | ------- |
| Screen option | Bold | Select **Done** |
| User input | Italics| Enter a value of *50gb* |
| Navigation path | Bold + Italics| ***Settings > Disk Settings*** |
| CLI and system responses | Monospace (codeblock) | Navigate to `http://tower.local` |
| Document title | Heading 1 | <h1>Heading</h1> |
| Document section | Heading 2 | <h2>Heading</h2> |
| Document sub-section | Heading 3 | <h3>Heading</h3> |

:::note

Every H2 or smaller heading displays in a table of contents (TOC) on the right side of the screen to help navigate the content of the article.

:::

## Formatting for lists and tables

A correct use of structured information elements such as lists and tables can help the user understand what is going on, provide reference material, describe options and their outcomes, and itemize related items.

### Lists

Lists help readers understand, remember, and review key points. They also help readers follow a sequence of actions or events.

Lists come in two types: unordered (bullet points), and ordered (numbered), and use Markdown syntax. There's a simple rule of thumb:

* Use unordered lists to provide an overview of related items.
* Use numbered lists to indicate a sequence of events. For example, a procedure where a user must follow instructions in a particular order.

Make sure you use introductory sentences to preface numbered and bulleted lists.

For numbered lists, introduce the list with a stem sentence, followed by the numbered list, for example "To start the array:"
For bulleted lists, introduce the content of the list, followed by a colon, for example "List of standard Unraid OS tools:".

If you have a long unordered list, consider using a table, instead. A list should only be display as many bullet points as the user could immediately memorize. This is usually 4-6 items.

Do not make lists with a single bulleted item.

### Tables

Tables use Markdown syntax. Use tables to present related information in a clear and structured way. In a table, related items of information are grouped into individual sets (rows) and are structured according to specific criteria (columns).

Do not make tables with just one or two elements, that might just be a couple of bullet points instead.

Make sure you use introductory sentences to preface a table.

## Prepositions

Use the right preposition for each object, and use it consistently. Not only does it make the documentation look more polished, but it just makes for an easier reading experience for the audience.

Some examples of prepositions:

| UI Element | Preposition |
| ---------- | ----------- |
| screen | on the... |
| section of a screen | in the... |
| menu, submenu | in the... |
| tab | in the... |
| dialog box | in the... |
| virtual machine | in the... |
| cache, pool | in the... |
| array | on the... |
| USB / boot device | on the... |
| toggle | on the... |
| navigation bar | on the... |
| share | in the... |
| server, computer, system | on the... |
| field, cell | in the... |

## Abbreviations, acronyms, and initialisms

Confusion may arise when readers are confronted with abbreviations, acronyms, or initialisms.

* Abbreviations are just shortened versions of a word. There is no real need to do this in Unraid Docs. Some abbreviations have become so common, they make it into everyday language.
* Acronyms combine the first letter of each word in a phrase and create a new word. For example, *RAID*.
* Initialisms, also combine the first letter of each word in a phrase, but each letter is read out separately. For example, *OS* or *ZFS*.

There is a certain amount of technical jargon inherent to Unraid OS. We recommend that you avoid abbreviating words for the sake of abbreviation, but if you must use uncommon acronyms or initialisms, spell them out on the first use, followed by the acronym or initialism in parentheses. For example, you might not feel the need to explain *GPU*, but you might feel the reader benefits from an explanation for *Virtual Machine Disk (VMDK)*.
