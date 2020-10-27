const SPACES = 2;

/** Selects the spaces at the beginning (for counting) and the identifier
 * afterwards. */
const lineRegex = /^([ ]*)([\w-:_@=()]+)[ ]*$/;

function repeat(numRepeat, callback) {
  if (numRepeat > 0) {
    callback();
    repeat(numRepeat - 1, callback);
  }
}

function getLineData(line) {
  const match = line.match(lineRegex);
  return match?.[2]
    ? {
        identifier: match[2],
        indentions: match[1].length,
      }
    : undefined;
}

export default function parseClompString(props, clompTemplates, ...fns) {
  if (!clompTemplates) return "";

  let prevIndentions = undefined;
  let prevIdentifier = undefined;
  let groupContext = [];
  let classList = [];
  let parsedStrings = fns.map((fn) =>
    parseClompString(props, [fn(props) ?? ""]),
  );

  [...clompTemplates].map((template) => {
    template &&
      template.split("\n").forEach((line, idx) => {
        const lineData = getLineData(line);
        if (!lineData) return;
        const { identifier, indentions } = lineData;

        if (prevIndentions && indentions === prevIndentions + SPACES) {
          classList.pop();
          groupContext.push(prevIdentifier);
        } else if (
          prevIndentions &&
          Number.isInteger((prevIndentions - indentions) / 2)
        ) {
          const numPops = (prevIndentions - indentions) / 2;
          repeat(numPops, () => {
            const returned = groupContext.pop();
            if (!returned)
              throw new Error(
                `Malformed Clomp on line ${
                  idx + 1
                }:\n> "${line}"\nThis happened because the indention on this line is lesser than the initial indention.`,
              );
          });
        } else if (prevIndentions && prevIndentions > indentions) {
          // The current line has an unrecognized number of indentions.
          throw new Error(
            `Malformed Clomp on line ${
              idx + 1
            }:\n> "${line}"\nThis happened because the indention on this line wasn't a multiple of ${SPACES} less than the one before it. If you would like to be able to change this number, make a feature request on GitHub or upvote an existing one that addresses this.`,
          );
        } else if (prevIndentions && prevIndentions < indentions) {
          throw new Error(
            `Malformed Clomp on line ${
              idx + 1
            }:\n> "${line}"\nThis happened because the indention on this line wasn't ${SPACES} spaces more than the one before it. If you would like to be able to change this number, make a feature request on GitHub or upvote an existing one that addresses this.`,
          );
        }

        classList.push(`${groupContext.join("")}${identifier}`);
        prevIdentifier = identifier;
        prevIndentions = indentions;
      });
  });
  return [...classList, ...parsedStrings].join(" ");
}
