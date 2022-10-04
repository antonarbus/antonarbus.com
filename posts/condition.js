import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'conditions',
  date: '2021.12.22',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/if_else.png',
  desc: 'Conditions in JavaScript',
  body: (
    <>
      <H>If</H>

      <Code block jsx>{`
          const year = 2000

          // one statement
          if (year == 2015) alert( 'You are right!' );

          // multiple statements // better doing this even for one statement for readability 
          if (year == 2015) {
            alert("That's correct!");
            alert("You're so smart!");
          }

          // pre-evaluated boolean value to if
          let cond = (year == 2015); // equality evaluates to true or false
          if (cond) alert( 'You are right!' );
      `}</Code>

      <H>If-else</H>

      <Code block jsx>{`
          const year = 2000
          if (year < 2015) {
            alert( 'Too early...' );
          } else {
            alert( 'Exactly!' );
          }
      `}</Code>

      <H>Else-if</H>

      <Code block jsx>{`
          const year = 2000
          if (year < 2015) {
            alert( 'Too early...' );
          } else if (year > 2015) {
            alert( 'Too late' );
          } else {
            alert( 'Exactly!' );
          }
      `}</Code>

      <H>Ternary operator</H>

      <Code block jsx>{`
          let accessAllowed = (age > 18) ? true : false;
          let accessAllowed = age > 18 ? true : false; // parentheses can be omitted // but it is not readable
        
          // multiple ‘?’
          let age = prompt('age?', 18);
          let message = (age < 3) ? 'Hi, baby!' :
            (age < 18) ? 'Hello!' :
            (age < 100) ? 'Greetings!' :
            'What an unusual age!';
          alert( message );
      `}</Code>

      <H>Switch</H>

      <Code block jsx>{`
          let a = 3;
          switch (a) {
            case 1:
              alert('1'); break;
            case 2: // grouped two cases
            case 3: // grouped two cases
              alert('2 or 2'); break;
            default:
              alert('not 1,2 or 3');
          }
        
          // in some cases to use obj is more elegant
      `}</Code>
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
