<img src="./logo.png" alt="The Clomp logo" />

Clomp is a class name composer for React that allows you to use CSS utility frameworks in a more readable way. You can use it with any class names, but it was designed specifically with Tailwind CSS in mind.

# Example

This example illustrates how much more readable an element with a lot of utility classes can be.

```jsx
import React from "react";

// Without Clomp

const NavItem = (props) => (
  <a className="h-full text-gray-500 p-8 hover:text-gray-900 sm:p-4 sm:hover:border-8 sm:hover:background-red-500 sm:hover:animate-ping">
    {props.children}
  </a>
);

// With Clomp

import clomp from "clomp";

const NavItem = clomp.a`
  h-full
  text-gray-500
  p-8

  hover:
    text-gray-900

  sm:
    p-4

    hover:
      border-8
      background-red-500
      animate-ping
`;

// Using either

function Nav(props) {
  return (
    <nav>
      <NavItem href="/">Home</NavItem>
      <NavItem href="/contact">Contact</NavItem>
      <NavItem href="/about">About</NavItem>
    </nav>
  );
}
```

# Installation

To use Clomp, install it using the Node Package Manager.

```bash
npm install --save clomp
```

# Usage

You can use Clomp similarly to `styled-components`. In the below example, we'll use a few of [Tailwind CSS's](https://tailwindcss.com) utility classes to make a navigation item listing.

## Basic Usage

```jsx
import React from "react";
import clomp from "clomp";

const NavItem = clomp.a`
  h-full
  text-gray-500
  p-8

  hover:
    text-gray-900

  sm:
    p-4

    hover:
      border-8
      background-red-500
      animate-ping
`;

function Nav(props) {
  return (
    <nav>
      <NavItem href="/">Home</NavItem>
      <NavItem href="/contact">Contact</NavItem>
      <NavItem href="/about">About</NavItem>
    </nav>
  );
}
```

## Props-Dependent Usage

Any escaped expressions in the template string are assumed to be functions, and are passed any provided props.

```jsx
const NavItem = clomp.a`
  h-full
  text-gray-500
  p-8

  hover:
    text-gray-900

  sm:
    p-4

    hover:
      border-8
      background-red-500
      animate-ping

  ${({ selected }) =>
    selected
      ? `
    text-blue-500
  `
      : `
    text-gray-500
  `}
`;

function Nav(props) {
  return (
    <nav>
      <NavItem selected href="/">
        Home
      </NavItem>
      <NavItem href="/contact">Contact</NavItem>
      <NavItem href="/about">About</NavItem>
    </nav>
  );
}
```

## Usage with Existing Components

You can use existing components with Clomp, much like you can with `styled-components`.

```jsx
import NavItem from "./nav-item";

function Nav(props) {
  return (
    <nav>
      <NavItem selected href="/">
        Home
      </NavItem>
      <NavItem href="/contact">Contact</NavItem>
      <NavItem href="/about">About</NavItem>
    </nav>
  );
}

const StyledNav = clomp(Nav)`
  flex
  flex-col
  
  sm:
    flex-row
`;
```
