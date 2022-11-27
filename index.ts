import fs from "fs";

const outputFilename = "kerning.txt";

const lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
const uppercase = lowercase.map((char) => char.toUpperCase());
const numbers = "0123456789".split("");
const symbols = "!#()+,-./:;=?@[]_©℗".split("");

const characters = [
  ...uppercase,
  "\n",
  ...lowercase,
  "\n",
  ...numbers,
  "\n",
  ...symbols,
];

let kerningStringArray = characters.map((character) => {
  if (character == "\n") return ["\n"];
  return generateKerningString(character, characters);
});

function generateKerningString(char: String, characters: String[]): String[] {
  var kerningString = new Array();

  characters.map((suffixChar) => {
    if (suffixChar == "\n") {
      kerningString.push("\n");
      return;
    }
    let prefix = "nn";
    if (suffixChar == suffixChar.toUpperCase()) prefix = "NN";
    kerningString.push(`${prefix}${char}${suffixChar} `);
  });

  return kerningString;
}

// write kerningString to file
let kerningString = kerningStringArray
  .map((kerningChar) => {
    return kerningChar.join("");
  })
  .join("\n\n");

fs.writeFileSync(outputFilename, kerningString);