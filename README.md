# Calc 02

The second calculator for CS 3100. Made in JavaScript.

# Environment Setup - Windows

### GitHub

1. [Create a GitHub account](https://github.com/join) if you don't already have one. Use a personal email address; you'll be using this for career stuff later anyway.
2. Make sure to add your school email address as a secondary email address to your GitHub account. Click your profile icon in the upper-left corner, click Settings, and click Emails in the left sidebar. Type your school email in the box and click "Add."

### Tools

1. Install Git if you haven't already. The recommended version is [Git Bash](https://git-scm.com/downloads). 
2. Install the **LTS release** of Node.js from https://nodejs.org/en/. That's the left one. As of right now, the current LTS version of Node is 8.11.1. It's ok if the last number is different (8.11.2 is just fine). If you can't find 8.11, search for it under [older releases](https://nodejs.org/en/download/releases/) and find the most recent release of 8.11.*.
3. Optional but recommended: Install [Visual Studio Code](https://code.visualstudio.com/) and use it as your editor for this project. VSC has a lot of tooling that will help with the project, including autocomplete, Git integration, and Chrome debugging integration among other things.

### Cloning

You should only have to do these steps once, when you clone the repository.

1. Open a PowerShell prompt by searching for "powershell" in the Start menu. This is how you will be using command line utilities while developing this project, so you may want to pin PowerShell to your Start menu or to your taskbar. Commands in PowerShell work very similarly to Bash (`ls`, `cd`, etc.), so you'll feel right at home.
2. Run `npm install -g yarn`. This installs Yarn, a package manager that we will be using to manage our dependencies.
3. Run `yarn --version` to ensure that Yarn installed properly. If you get a version number, it works! If you get an error message, you probably need to add `npm` to your `PATH`: Run `npm bin -g`, copy the output, search "edit environment variables for your account" in the Start menu, and add the text you copied to the end of the `PATH` environment variable. Restart the shell and try running `yarn --version` again.
4. Clone the repository into the folder of your choice. You can either use Git commands inside the PowerShell prompt (Bash navigation commands work too!) or you can use a GUI tool like [GitKraken](https://www.gitkraken.com/), [SourceTree](https://www.sourcetreeapp.com/), or [GitHub Desktop](https://desktop.github.com/).
5. Once you clone the repository, navigate to it in PowerShell and configure your Git user like so (substituting your own name and email, of course):

    ```powershell
    git config --local user.name "Andrew Hoog"
    git config --local user.email "arhf79@mst.edu"
    ```

    This sets up your Git user information for this project. Make sure to use your school email for this step. If you want to, you can also configure your global Git user with your personal email address as shown below, but this isn't necessary.

    ```powershell
    git config --global user.name "Andrew Hoog"
    git config --global user.email "andrew.hoog@gmail.com"
    ```
6. Finally, run `yarn install`. This will install all the dependencies and packages that are required to build the project in a local folder called `node_modules` (which is not kept in Git due to its size). It will take a few seconds.


Every now and again, you'll probably have to run `yarn install` to update your local copies of the dependencies.

### Development

1. Use a PowerShell prompt to navigate to the project folder.
2. Run `yarn dev` in PowerShell. This will start up a local web server at http://localhost:8000, which you can use to view the project. If you want to stop the web server, use `^C`.
3. Every time you make a change to the project code inside of the `src` folder, the project will be rebuilt and the web browser will automatically be refreshed for you. Try changing the `background` of the page to `red` in `style.scss`. After you save, the page will automatically refresh itself.

# Resources

## HTML

HTML is the language that structures the content of websites and web applications. With the help of CSS, it replaces the `.ui` files that we used for the first calculator.

For the most part, you will be writing your HTML in React components, but we'll get to that later.

* [HTML on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)

## CSS/Sass

CSS is the language that describes the appearance of websites and web applications. While HTML handles the actual website content (the text, the images, etc.), CSS is the part that makes everything look pretty (colors, fonts, layout, etc.).

Sass is a preprocessor for CSS -- basically, a compiler that compiles Sass to CSS. It adds a lot of productivity features to CSS like nested rules, variables, mixins, and functions.

If Sass seems like a lot, don't worry. All valid CSS is also valid Sass, so if you're confused, just write CSS and it will behave exactly the same way. The build process handles all of the hard stuff -- just run `yarn dev` and it will take care of everything.

* [MDN Getting Started with CSS](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
* [MDN Learn CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS)
* [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
* [Sass Website](http://sass-lang.com/)
* [Sass Reference](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#css_extensions)

## JavaScript/TypeScript

JavaScript is the programming language of the web. It has the same role in this calculator that C++ had in the last one. Whereas C++ typically has big monolithic frameworks, JavaScript usually uses a lot of small modules that are composed together.

JavaScript is an interesting language with a few quirks. One of the more annoying quirks is its type system. To deal with this, we're using the TypeScript compiler.

Just like how all CSS is valid Sass, all JavaScript is valid TypeScript. TypeScript just adds static types, similarly to how types in C++ work. Just code like you normally would and let the build process take care of things.

* [MDN Re-Introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
* [MDN Learn JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)
* [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [TypeScript Website](http://www.typescriptlang.org/)
* [TypeScript in 5 Minutes](http://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
* [TypeScript Handbook](http://www.typescriptlang.org/docs/handbook/basic-types.html) (if you're feeling adventurous)

## React

React is an open-source library from Facebook that is used for building interactive user interfaces for the web. React serves the same purpose in this calculator that Qt did in the last one.

Most of the HTML that we will write in this calculator is written as part of a React component. Facebook calls this HTML "JSX," but it's really just HTML.

* [React Website](https://reactjs.org/)
* [React Introductory Tutorial](https://reactjs.org/tutorial/tutorial.html)

