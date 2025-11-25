'use client'


import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'string',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/string.png',
  desc: 'Strings in JavaScript',
  body: (
    <>
      <H>Quotation marks</H>

      <Code block jsx>{`
        let single = 'single-quoted';
        let double = "double-quoted";
        let backticks = \`backticks\`;
      `}</Code>

      <H>Interpolation</H>

      <Code block jsx>{`
        alert(\`1 + 2 = \${1 + 2}.\`); // 1 + 2 = 3
      `}</Code>

      <H>Multiline string</H>

      <Code block jsx>{`
        let guestList = \`
          line 1
          line 2
        \`;
      `}</Code>

      <H>Special characters</H>

      <p>Special characters start with a backslash character \, also called an “escape character”</p>

      <Code block jsx>{`
        \\n // New line
        \\r // Carriage return: not used alone. Windows text files use a combination of two characters \\r\\n to represent a line break.
        \\', \\" // Quotes
        \\\\ // Backslash
        \\t // Tab
        \\b, \\f, \\v // Backspace, Form Feed, Vertical Tab – kept for compatibility, not used nowadays.
        \\xXX // Unicode character with the given hexadecimal Unicode XX, e.g. '\\x7A' is the same as 'z'.
        \\uXXXX // A Unicode symbol with the hex code XXXX in UTF-16 encoding, for instance \\u00A9 – is a Unicode for the copyright symbol ©. It must be exactly 4 hex digits.
        \\u{X…XXXXXX} // (1 to 6 hex characters) A Unicode symbol with the given UTF-32 encoding. Some rare characters are encoded with two Unicode symbols, taking 4 bytes. This way we can insert long codes.
      `}</Code>

      <Code block jsx>{`
        "Hello\\nWorld" // two lines using a "newline symbol"
        'I\\'m the Walrus!' // I'm the Walrus!
        "\\u00A9" // ©
        "\\u{20331}" // 佫, a rare Chinese hieroglyph (long Unicode)
        "\\u{1F60D}" // 😍, a smiling face symbol (another long Unicode)
      `}</Code>

      <H>Length</H>

      <Code block jsx>{`
        \`My name is Anton\`.length // 16
        str.length() // NOT working, length is a property
      `}</Code>

      <H>Access characters</H>

      <Code block jsx>{`
        let str = 'Hello'
        str[0] // H
        str[str.length - 1] // o
        str[1000] // undefined
        str.charAt(0) // H
        str.charAt(1000) // '' (an empty string)

        // string is iterable
        for (let char of "Hello") alert(char); 
        // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
      `}</Code>

      <H>Primitives are immutable</H>

      <Code block jsx>{`
        let str = 'Hi'
        str[0] = 'X'
        str // 'Hi'
      `}</Code>

      <H>Case</H>

      <Code block jsx>{`
        'Interface'.toUpperCase() // INTERFACE
        'Interface'.toLowerCase() // interface
      `}</Code>

      <H>Character position</H>

      <Code block jsx>{`
        let str = 'abc0123456789a'
        str.indexOf('a') // 0, found at the beginning
        str.indexOf('z') // -1, not found, the search is case-sensitive
        str.indexOf("2") // 5, found at the position 5
        str.indexOf("2", 6) // -1, not found, because started to search from 6th position
        str.lastIndexOf('a') // 13, searches from the end
      `}</Code>

      <p>All occurrences</p>

      <Code block jsx>{`
          let str = "As sly as a fox, as strong as an ox";
          let pos = -1;
          while ((pos = str.indexOf("as", pos + 1)) != -1) alert( pos ); // 7, 17, 27
      `}</Code>

      <H>Character existence</H>

      <p>With <Code>indexOf()</Code></p>

      <Code block jsx>{`
          if ("Widget".indexOf("dg") != -1) alert('found') // if we check for substring existence
          if (~"Widget".indexOf("dg")) alert('found') // same result // bitwise trick
      `}</Code>

      <p>With <Code> includes()</Code>, <Code>startsWith()</Code>, <Code>endsWith()</Code></p>

      <Code block jsx>{`
          str.includes(substr, pos) // returns true/false // more modern than indexOf()

          let str = 'abc0123456789a'
          str.includes('c') // true
          str.includes('z') // false
          str.startsWith('a') // true
          str.startsWith('b') // false
          str.endsWith('a') // true
          str.endsWith('aa') // false
      `}</Code>

      <H>Substring</H>

      <p><Code>slice(start,end)</Code></p>

      <Code block jsx>{`
        let str = "stringify"
        str.slice(0, 5) // 'strin', the substring from 0 to 5 (not including 5)
        str.slice(0, 1) // 's', from 0 to 1, but not including 1
        str.slice(-4, -1) // 'gif'
        str.slice(2) // 'ringify'
      `}</Code>

      <p><Code>substring(start,end)</Code></p>

      <Code block jsx>{`
          let str = "stringify";
          str.substring(2, 6) // "ring"
          str.substring(6, 2) // "ring"
          // same as slice, but it allows start to be greater than end
          // Negative arguments are (unlike slice) not supported, they are treated as 0.
      `}</Code>

      <p><Code>substr(start,length)</Code></p>

      <Code block jsx>{`
        let str = "stringify";
        alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters
        alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters

        // Returns the part of the string from start, with the given length.
        // In contrast with the previous methods, this one allows us to specify the length instead of the ending position
        // The first argument may be negative, to count from the end
      `}</Code>

      <H>UTF - 16 to string</H>

      <Code block jsx>{`
          'z'.codePointAt(0) // 122 // Returns the code for the character at position pos
      `}</Code>

      <H>String to UTF- 16</H>

      <Code block jsx>{`
          String.fromCodePoint(65); // 'A' // Creates a character by its numeric code
      `}</Code>

      <H>Unicode</H>

      <Code block jsx>{`
          '\\u005a' // Z
      `}</Code>

      <H>Compare strings</H>

      <Code block jsx>{`
        'a' > 'Z' // true // lowercase letter is always greater than the uppercase
        'Österreich' > 'Zealand' // true // Letters with diacritical marks are “out of order”

        localeCompare(compareString, locales, options)
        'Österreich'.localeCompare('Zealand'); // -1 // compare strings with localization 
        // neg num if str1 is less than str2 // pos num if str1 is greater than str2 // 0 if they are equivalent
      `}</Code>

      <H>Surrogate pairs</H>

      <Code block jsx>{`
          // rare symbols are encoded with a pair of 2-byte characters called “a surrogate pair”
          '𝒳'.length // 2
          '😂'.length // 2
      `}</Code>

      <H>Diacritical marks & normalization</H>

      <Code block jsx>{`
          'S' // "S"
          '\\u0307' // "̇" // dots above and below
          'S\\u0307' // Ṡ
          'S\\u0307\\u0323' // Ṩ

          let s1 = 'S\\u0307\\u0323'; // Ṩ, S + dot above + dot below
          let s2 = 'S\\u0323\\u0307'; // Ṩ, S + dot below + dot above
          s1 == s2 // false // though the characters look identical (?!)
          s1.normalize() == s2.normalize() // true
      `}</Code>

      <H>Some string methods</H>

      <H><Code>charAt()</Code></H>

      <Code block jsx>{`
        'abc0123456789a'.charAt(2); // 'c'
      `}</Code>

      <H><Code>charCodeAt()</Code></H>

      <Code block jsx>{`
        'abc0123456789a'.charCodeAt(2); // 99
      `}</Code>

      <H><Code>codePointAt()</Code></H>

      <Code block jsx>{`
        'abc0123456789a'.codePointAt(2); // 99
      `}</Code>

      <H><Code>concat()</Code></H>

      <Code block jsx>{`
        'a'.concat('b'); // 'ab'
      `}</Code>

      <H><Code>match()</Code></H>

      <Code block jsx>{`
        'The Brown Fox.'.match(/[A-Z]/g); // ["T", "B", "F"]
      `}</Code>

      <H><Code>matchAll()</Code></H>

      <Code block jsx>{`
        'The Brown Fox.'.matchAll('o'); // RegExpStringIterator {}
        [...'The Brown Fox.'.matchAll('o')]; // (2) [Array(1), Array(1)] 0: ["o", index: 6, input: "The Brown Fox.", groups: undefined] 1: ["o", index: 11, input: "The Brown Fox.", groups: undefined]
      `}</Code>

      <H><Code>padStart()</Code>, <Code> padEnd()</Code></H>

      <Code block jsx>{`
        '1'.padStart(2, '0'); // "01"
        '1'.padStart(2); // " 1"
        'abc'.padEnd(5, '.'); // "abc.."
        'abc'.padEnd(5); // "abc  "
      `}</Code>

      <H><Code>repeat()</Code></H>

      <Code block jsx>{`
        '*'.repeat(10); // "**********'
      `}</Code>

      <H><Code>replace()</Code></H>

      <Code block jsx>{`
        'abcb'.replace('b', 'B'); // "aBcb"
        'abcb'.replace(/B/i, 'B'); // "aBcb" - RegExp
        'abcb'.replace(/B/ig, 'B'); // "aBcB" - RegExp
      `}</Code>

      <H><Code>replaceAll()</Code></H>

      <Code block jsx>{`
        'abcb'.replaceAll('b', 'B'); // "aBcB"
      `}</Code>

      <H><Code>search()</Code></H>

      <Code block jsx>{`
        'abcb'.search('b'); // 1
        'abcb'.search(/B/gi); // 1 - RegExp
      `}</Code>

      <H><Code>split()</Code></H>

      <Code block jsx>{`
        'abcb'.split(''); // ["a", "b", "c", "b"]
        'abcb'.split('c'); // ["ab", "b"]
      `}</Code>

      <H><Code>trim()</Code>, <Code> trimStart()</Code>, <Code>trimEnd()</Code></H>

      <Code block jsx>{`
        ' abcb  '.trim(); // 'abcd'
        ' abcb  '.trimStart(); // 'abcd  '
        ' abcb  '.trimEnd(); // ' abcd'
      `}</Code>

      <H><Code>toLocaleUpperCase()</Code>, <Code> toLocaleLowerCase()</Code></H>

      <Code block jsx>{`
        'abcb'.toLocaleUpperCase(); // 'ABCD'
        'AbCd'.toLocaleLowerCase(); // 'abcd'
      `}</Code>

      <p>Other string methods find on<Lnk path="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">mdn</Lnk></p>
    </>
  )
}

export default postObj

export const post = {
  title: postObj.title,
  date: postObj.date,
  tags: postObj.tags,
  desc: postObj.desc,
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
