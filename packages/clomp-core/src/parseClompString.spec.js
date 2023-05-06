import parseClompString from "./parseClompString";

test("Displays single class from template", () => {
  const template = `
    single-class-name
  `;
  expect(parseClompString(undefined, [template])).toBe("single-class-name");
});

test("Composes single class from template", () => {
  const template = `
    single-
      class-
        name
  `;
  expect(parseClompString(undefined, [template])).toBe("single-class-name");
});

test("Displays multiple classes from template", () => {
  const template = `
    first-class:name
    secondClassName
    THIRD_CLASS_NAME
  `;
  expect(parseClompString(undefined, [template])).toBe(
    "first-class:name secondClassName THIRD_CLASS_NAME",
  );
});

test("Composes multiple classes from template", () => {
  const template = `
    first-class:
      name
    secondClass
      Name
    THIRD_CLASS
      _NAME
  `;
  expect(parseClompString(undefined, [template])).toBe(
    "first-class:name secondClassName THIRD_CLASS_NAME",
  );
});

test("Composes nested class groups", () => {
  const template = `
    attr:
      hover:
        opacity-0
        wide
        flex
        flex-right
  `;

  expect(parseClompString(undefined, [template])).toBe(
    "attr:hover:opacity-0 attr:hover:wide attr:hover:flex attr:hover:flex-right",
  );
});

test("Composes nested class groups at multiple levels", () => {
  const template = `
    attr:
      hover

      hover:
        flex
        flex-right

      opacity-0

    attr:hover

    justify-right

  `;

  expect(parseClompString(undefined, [template])).toBe(
    "attr:hover attr:hover:flex attr:hover:flex-right attr:opacity-0 attr:hover justify-right",
  );
});

test("Throws error when you try to exit the initial group context", () => {
  const template = `
    attr

    attr:
      hover

  opacity-0
  `;

  const errorMessage = `Malformed Clomp on line 7:\n> "  opacity-0"\nThis happened because the indention on this line is lesser than the initial indention.`;

  expect(() => parseClompString(undefined, [template])).toThrow(errorMessage);
});

test("Throws error when you increase or decrease indentions incorrectly", () => {
  const template1 = `
    attr:
      hover:
        mouse-pointer

      active:
         mouse-pointer
  `;

  const errorMessage1 = `Malformed Clomp on line 7:\n> "         mouse-pointer"\nThis happened because the indention on this line wasn't 2 spaces more than the one before it.`;

  const template2 = `
  attr:
    hover:
      mouse-pointer

   active:
      mouse-pointer
  `;

  const errorMessage2 = `Malformed Clomp on line 6:\n> "   active:"\nThis happened because the indention on this line wasn't a multiple of 2 less than the one before it.`;

  expect(() => parseClompString(undefined, [template1])).toThrow(errorMessage1);
  expect(() => parseClompString(undefined, [template2])).toThrow(errorMessage2);
});

test("Returns an empty string given a template with no identifiers", () => {
  const template = `




  `;

  expect(parseClompString(undefined, [template])).toBe("");
});

test("Returns an empty string given a falsey value instead of a template", () => {
  expect(parseClompString(undefined, [false])).toBe("");
  expect(parseClompString(undefined, [""])).toBe("");
  expect(parseClompString(undefined, [0])).toBe("");
  expect(parseClompString(undefined, [-0])).toBe("");
  expect(parseClompString(undefined, [0n])).toBe("");
  expect(parseClompString(undefined, [null])).toBe("");
  expect(parseClompString(undefined, [undefined])).toBe("");
  expect(parseClompString(undefined, [NaN])).toBe("");
});

test("Returns a class list based on props", () => {
  const parseTemplate = (props) => (...args) =>
    parseClompString(props, ...args);

  expect(parseTemplate({ theme: "wide" })`
    opacity-50
    h-8

    ${({ theme }) =>
      theme === "wide" &&
      `
      h-4
      w-full
    `}
  `).toBe("opacity-50 h-8 h-4 w-full");
});
