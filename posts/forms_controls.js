import { Code, H, Hs, LazyImg, jsxToStr } from '/components/post/reExport'

function Form(props) {
  return (
    <form action="/api/action_for_inputs_post" method="POST" autoComplete="off" name="myForm" >

    <fieldset>
      <legend>Radios</legend>
      <input type="radio" id="html" name="fav_language" defaultValue="HTML" defaultChecked />
      <label htmlFor="html">HTML</label><br />
      <input type="radio" id="css" name="fav_language" defaultValue="CSS" />
      <label htmlFor="css">CSS</label><br />
      <input type="radio" id="javascript" name="fav_language" defaultValue="JavaScript" />
      <label htmlFor="javascript">JavaScript</label>
    </fieldset>

    <fieldset>
      <legend>Checkboxes</legend>
      <input type="checkbox" id="vehicle1" name="vehicles" defaultValue="Bike" defaultChecked />
      <label htmlFor="vehicle1"> I have a bike</label><br />
      <input type="checkbox" id="vehicle2" name="vehicles" defaultValue="Car" defaultChecked />
      <label htmlFor="vehicle2"> I have a car</label><br />
      <input type="checkbox" id="vehicle3" name="vehicles" defaultValue="Boat" />
      <label htmlFor="vehicle3"> I have a boat</label>
    </fieldset>

    <fieldset>
      <legend>Text inputs</legend>
      <label htmlFor="fname">First name - readonly:</label><br />
      <input type="text" id="fname" name="user" defaultValue="John" readOnly /><br />
      <label htmlFor="lname">Last name - disabled:</label><br />
      <input type="text" id="lname" name="user" defaultValue="Doe" disabled /><br />
      <label htmlFor="age">age:</label><br />
      <input type="number" id="age" name="user" defaultValue="35" />
    </fieldset>

    <fieldset>
      <legend>List input with datalist</legend>
      <input list="browsers" name="browser" defaultValue="Chrome" />
      <datalist id="browsers">
        <option defaultValue="Internet Explorer">Internet Explorer</option>
        <option defaultValue="Firefox">Firefox</option>
        <option defaultValue="Chrome">Chrome</option>
        <option defaultValue="Opera">Opera</option>
        <option defaultValue="Safari">Safari</option>
      </datalist>
    </fieldset>

    <fieldset>
      <legend>Select</legend>
      <label htmlFor="cars">Choose a car:</label><br />
      <select id="cars" name="cars" size="3" multiple defaultValue={['Volvo', 'Fiat']}>
        <option>Volvo</option>
        <option>Saab</option>
        <option>Fiat</option>
        <option>Audi</option>
      </select>
    </fieldset>

    <fieldset>
      <legend>Textarea</legend>
      <textarea name="message" rows="10" cols="30" defaultValue='The cat was playing in the garden.' />
    </fieldset>

    <fieldset>
      <legend>Password</legend>
      <label htmlFor="username">Username:</label><br />
      <input type="text" id="username" name="login" defaultValue="login" /><br />
      <label htmlFor="pwd">Password:</label><br />
      <input type="password" id="pwd" name="pwd" defaultValue="password" />
    </fieldset>

    <fieldset>
      <legend>Color</legend>
      <label htmlFor="favcolor">Select your favorite color:</label>
      <input type="color" id="favcolor" name="favcolor" defaultValue="#ff0000" />
    </fieldset>

    <fieldset>
      <legend>Date</legend>
      <label htmlFor="birthday">Birthday:</label>
      <input type="date" id="birthday" name="birthday" min="2010-01-02" max="2025-12-31" defaultValue="2022-06-06" />
    </fieldset>

    <fieldset>
      <legend>Datetime-local</legend>
      <label htmlFor="birthdaytime">Birthday (date and time):</label>
      <input type="datetime-local" id="birthdaytime" name="birthday time" defaultValue="2022-04-08T14:18" />
    </fieldset>

    <fieldset>
      <legend>Email</legend>
      <label htmlFor="email">Enter your email:</label>
      <input type="email" id="email" name="email" defaultValue="mail@gmail.com" />
    </fieldset>

    <fieldset>
      <legend>File</legend>
      <label htmlFor="my-file">Select a file:</label>
      <input type="file" id="myfile1" name="my-file" multiple />
      <input type="file" id="myfile2" name="my-file" multiple />
      <input type="file" id="myfile3" name="my-file" multiple />
    </fieldset>

    <fieldset>
      <legend>Hidden input</legend>
      <label htmlFor="notHidden">Not hidden input:</label>
      <input type="text" id="not-hidden-input" name="notHidden" defaultValue="not hidden value" /> <br />
      <label htmlFor="hidden" style={{ display: 'none' }}>Hidden input:</label>
      <input type="hidden" id="hidden-input" name="hidden" defaultValue="hidden value" />
    </fieldset>

    <fieldset>
      <legend>Month</legend>
      <label htmlFor="bdaymonth">Birthday (month and year):</label>
      <input type="month" id="bdaymonth" name="bdaymonth" defaultValue="2022-05" />
    </fieldset>

    <fieldset>
      <legend>Number</legend>
      <label htmlFor="quantity">Quantity (between 1 and 5):</label>
      <input type="number" id="quantity" name="quantity" min="1" max="5" defaultValue="3" />
    </fieldset>

    <fieldset>
      <legend>Range</legend>
      <label htmlFor="vol">Volume (between 0 and 50):</label>
      <input type="range" id="vol" name="vol" min="0" max="50" defaultValue="10" />
    </fieldset>

    <fieldset>
      <legend>Search</legend>
      <label htmlFor="gsearch">Search Google:</label>
      <input type="search" id="gsearch" name="gsearch" defaultValue="how to cook pasta" />
    </fieldset>

    <fieldset>
      <legend>Tel</legend>
      <label htmlFor="phone">Enter your phone number:</label>
      <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" defaultValue="123-45-678" />
    </fieldset>

    <fieldset>
      <legend>Time</legend>
      <label htmlFor="time">Select a time:</label>
      <input type="time" id="time" name="time" defaultValue="20:46" />
    </fieldset>

    <fieldset>
      <legend>Url</legend>
      <label htmlFor="homepage">Add your homepage:</label>
      <input type="url" id="homepage" name="homepage" defaultValue="https://myvocab.org" />
    </fieldset>

    <fieldset>
      <legend>Week</legend>
      <label htmlFor="week">Select a week:</label>
      <input type="week" id="week" name="week" defaultValue="2022-W15" />
    </fieldset>

    <button>Submit button</button>
    <input type="submit" defaultValue="Submit input" />
    <input type="reset" defaultValue="Reset to default values" />

    <style jsx global>{`
      * { box-sizing: border-box; }
      fieldset { margin-bottom: 20px; padding: 10px; }
      legend { font-weight: 600; }
      label { margin: 5px; }
    `}</style>

  </form>
  )
}

function OnSubmit(props) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        alert('submitted')
      }}
    >
      <input type="text" placeholder='Press Enter' />
      <button>Go</button>
    </form>
  )
}

const postObj = {
  title: 'forms & controls',
  date: '2022.04.08',
  tags: ['html', 'JavaScript', 'basics'],
  desc: 'Different input types inside a form in React and html.',
  body: (
    <>
      <H>input, textarea</H>

      <ul>
        <li><code>input.value = "New value"</code></li>
        <li><code>textarea.value = "New text"</code></li>
        <li><code>input.checked = true</code></li>
        <li><code>textarea.innerHTML</code> - do not use, stores only initial HTML, not the current value</li>
      </ul>

      <H>select, option</H>

      <ul>
        <li><code>select.options</code> the collection of {'<option>'} els</li>
        <li><code>select.value</code> the value of the currently selected {'<option>'}</li>
        <li><code>select.selectedIndex </code> the index of the currently selected {'<option>'}</li>
        <li><code>select.options[2].selected = true</code> set a value for a {'<select>'}</li>
        <li><code>select.selectedIndex = 2</code> same</li>
        <li><code>select.value = 'banana'</code> same</li>
      </ul>

      <Hs>multiple options selection</Hs>

      <ul>
        <li>{'<select>'} allows to select multiple options if it has <i>multiple</i> attribute</li>
        <li>This attribute is rarely used, though</li>
      </ul>

      <Code block html>{`
      <select id="select" multiple>
        <option value="blues" selected>Blues</option>
        <option value="rock" selected>Rock</option>
        <option value="classic">Classic</option>
      </select>
      `}</Code>

      <p>Get all selected values from multi-select...</p>

      <Code block jsx>{`
      const selected = Array.from(select.options)
        .filter(option => option.selected)
        .map(option => option.value);

      alert(selected) // blues,rock
      `}</Code>

      <Hs>new Option</Hs>

      <Code block jsx>{`
      option = new Option(text, value, defaultSelected, selected)
      `}</Code>

      <ul>
        <li><code>text</code> the text inside the option</li>
        <li><code>value</code> the option value</li>
        <li><code>defaultSelected</code> if <code>true</code>, then selected HTML-attribute is created</li>
        <li><code>selected</code> if <code>true</code>, then the option is selected</li>
      </ul>

      <Code block jsx>{`
      let option = new Option("Text", "value", true, true) // selected // set both of them
      let option = new Option("Text", "value") // unselected

      option.selected //  the option selected
      option.index // number of the option among the others in its <select>
      option.text // Text content of the option (seen by the visitor).
      `}</Code>

      <H>Submit on <kbd>Enter</kbd></H>

      <p>To submit a form either click on button or push <kbd>Enter</kbd></p>

      <OnSubmit />

      <Code block>{`
      <form
        onSubmit={e => {
          e.preventDefault()
          alert('submitted')
        }}
      >
        <input type="text" placeholder='Press Enter' />
        <button>Go</button>
      </form>
      `}</Code>

      <H>Inputs in React</H>

      <p>Here are uncontrolled React input elements of different types in a form</p>

      <Code block html>{`
        <form action="/api/action_for_inputs_post" method="POST" autoComplete="off" name="myForm" >
          <fieldset>
            <legend>Radios</legend>
            <input type="radio" id="html" name="fav_language" defaultValue="HTML" defaultChecked />
            <label htmlFor="html">HTML</label><br />
            <input type="radio" id="css" name="fav_language" defaultValue="CSS" />
            <label htmlFor="css">CSS</label><br />
            <input type="radio" id="javascript" name="fav_language" defaultValue="JavaScript" />
            <label htmlFor="javascript">JavaScript</label>
          </fieldset>

          <fieldset>
            <legend>Checkboxes</legend>
            <input type="checkbox" id="vehicle1" name="vehicles" defaultValue="Bike" defaultChecked />
            <label htmlFor="vehicle1"> I have a bike</label><br />
            <input type="checkbox" id="vehicle2" name="vehicles" defaultValue="Car" defaultChecked />
            <label htmlFor="vehicle2"> I have a car</label><br />
            <input type="checkbox" id="vehicle3" name="vehicles" defaultValue="Boat" />
            <label htmlFor="vehicle3"> I have a boat</label>
          </fieldset>

          <fieldset>
            <legend>Text inputs</legend>
            <label htmlFor="fname">First name - readonly:</label><br />
            <input type="text" id="fname" name="user" defaultValue="John" readOnly /><br />
            <label htmlFor="lname">Last name - disabled:</label><br />
            <input type="text" id="lname" name="user" defaultValue="Doe" disabled /><br />
            <label htmlFor="age">age:</label><br />
            <input type="number" id="age" name="user" defaultValue="35"  />
          </fieldset>

          <fieldset>
            <legend>List input with datalist</legend>
            <input list="browsers" name="browser" defaultValue="Chrome" />
            <datalist id="browsers">
              <option defaultValue="Internet Explorer">Internet Explorer</option>
              <option defaultValue="Firefox">Firefox</option>
              <option defaultValue="Chrome">Chrome</option>
              <option defaultValue="Opera">Opera</option>
              <option defaultValue="Safari">Safari</option>
            </datalist>
          </fieldset>

          <fieldset>
            <legend>Select</legend>
            <label htmlFor="cars">Choose a car:</label><br />
            <select id="cars" name="cars" size="3" multiple  defaultValue={["Volvo", "Fiat"]}>
              <option>Volvo</option>
              <option>Saab</option>
              <option>Fiat</option>
              <option>Audi</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>Textarea</legend>
            <textarea name="message" rows="10" cols="30" defaultValue='The cat was playing in the garden.' />
          </fieldset>

          <fieldset>
            <legend>Password</legend>
            <label htmlFor="username">Username:</label><br />
            <input type="text" id="username" name="login" defaultValue="login" /><br />
            <label htmlFor="pwd">Password:</label><br />
            <input type="password" id="pwd" name="pwd" defaultValue="password" />
          </fieldset>

          <fieldset>
            <legend>Color</legend>
            <label htmlFor="favcolor">Select your favorite color:</label>
            <input type="color" id="favcolor" name="favcolor" defaultValue="#ff0000" />
          </fieldset>

          <fieldset>
            <legend>Date</legend>
            <label htmlFor="birthday">Birthday:</label>
            <input type="date" id="birthday" name="birthday" min="2010-01-02" max="2025-12-31" defaultValue="2022-06-06" />
          </fieldset>

          <fieldset>
            <legend>Datetime-local</legend>
            <label htmlFor="birthdaytime">Birthday (date and time):</label>
            <input type="datetime-local" id="birthdaytime" name="birthday time" defaultValue="2022-04-08T14:18" />
          </fieldset>

          <fieldset>
            <legend>Email</legend>
            <label htmlFor="email">Enter your email:</label>
            <input type="email" id="email" name="email" defaultValue="mail@gmail.com" />
          </fieldset>

          <fieldset>
            <legend>File</legend>
            <label htmlFor="my-file">Select a file:</label>
            <input type="file" id="myfile1" name="my-file" multiple  />
            <input type="file" id="myfile2" name="my-file" multiple  />
            <input type="file" id="myfile3" name="my-file" multiple  />
          </fieldset>

          <fieldset>
            <legend>Hidden input</legend>
            <label htmlFor="notHidden">Not hidden input:</label>
            <input type="text" id="not-hidden-input" name="notHidden" defaultValue="not hidden value" /> <br />
            <label htmlFor="hidden" style={{display: 'none'}}>Hidden input:</label>
            <input type="hidden" id="hidden-input" name="hidden" defaultValue="hidden value" />
          </fieldset>

          <fieldset>
            <legend>Month</legend>
            <label htmlFor="bdaymonth">Birthday (month and year):</label>
            <input type="month" id="bdaymonth" name="bdaymonth" defaultValue="2022-05" />
          </fieldset>

          <fieldset>
            <legend>Number</legend>
            <label htmlFor="quantity">Quantity (between 1 and 5):</label>
            <input type="number" id="quantity" name="quantity" min="1" max="5" defaultValue="3" />
          </fieldset>

          <fieldset>
            <legend>Range</legend>
            <label htmlFor="vol">Volume (between 0 and 50):</label>
            <input type="range" id="vol" name="vol" min="0" max="50" defaultValue="10" />
          </fieldset>

          <fieldset>
            <legend>Search</legend>
            <label htmlFor="gsearch">Search Google:</label>
            <input type="search" id="gsearch" name="gsearch" defaultValue="how to cook pasta" />
          </fieldset>

          <fieldset>
            <legend>Tel</legend>
            <label htmlFor="phone">Enter your phone number:</label>
            <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" defaultValue="123-45-678" />
          </fieldset>

          <fieldset>
            <legend>Time</legend>
            <label htmlFor="time">Select a time:</label>
            <input type="time" id="time" name="time" defaultValue="20:46" />
          </fieldset>

          <fieldset>
            <legend>Url</legend>
            <label htmlFor="homepage">Add your homepage:</label>
            <input type="url" id="homepage" name="homepage" defaultValue="https://myvocab.org" />
          </fieldset>

          <fieldset>
            <legend>Week</legend>
            <label htmlFor="week">Select a week:</label>
            <input type="week" id="week" name="week" defaultValue="2022-W15" />
          </fieldset>

          <button>Submit button</button>
          <input type="submit" defaultValue="Submit input" />
          <input type="reset" defaultValue="Reset to default values" />

          <style jsx global>{\`
            * { box-sizing: border-box; }
            fieldset { margin-bottom: 20px; padding: 10px; }
            legend { font-weight: 600; }
            label { margin: 5px; }
          \`}</style>
        </form>
      `}</Code>

      <H>Inputs in HTML</H>

      <Code block html>{`
      <form action="/action" method="POST" autocomplete="off" name="myForm" >

      <fieldset>
        <legend>Radios</legend>
        <input type="radio" id="html" name="fav_language" value="HTML" checked />
        <label for="html">HTML</label><br />
        <input type="radio" id="css" name="fav_language" value="CSS" />
        <label for="css">CSS</label><br />
        <input type="radio" id="javascript" name="fav_language" value="JavaScript" />
        <label for="javascript">JavaScript</label>
      </fieldset>

      <fieldset>
        <legend>Checkboxes</legend>
        <input type="checkbox" id="vehicle1" name="vehicles" value="Bike" checked />
        <label for="vehicle1"> I have a bike</label><br />
        <input type="checkbox" id="vehicle2" name="vehicles" value="Car" checked />
        <label for="vehicle2"> I have a car</label><br />
        <input type="checkbox" id="vehicle3" name="vehicles" value="Boat" />
        <label for="vehicle3"> I have a boat</label>
      </fieldset>

      <fieldset>
        <legend>Text inputs</legend>
        <label for="fname">First name - readonly:</label><br />
        <input type="text" id="fname" name="user" value="John" readonly /><br />
        <label for="lname">Last name - disabled:</label><br />
        <input type="text" id="lname" name="user" value="Doe" disabled /><br />
        <label for="age">age:</label><br />
        <input type="number" id="age" name="user" value="35"  />
      </fieldset>

      <fieldset>
        <legend>List input with datalist</legend>
        <input list="browsers" name="browser" value="Chrome" />
        <datalist id="browsers">
          <option value="Internet Explorer">Internet Explorer</option>
          <option value="Firefox">Firefox</option>
          <option value="Chrome">Chrome</option>
          <option value="Opera">Opera</option>
          <option value="Safari">Safari</option>
        </datalist>
      </fieldset>

      <fieldset>
        <legend>Select</legend>
        <label for="cars">Choose a car:</label><br />
        <select id="cars" name="cars" size="3" multiple>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi" selected>Audi</option>
        </select>
      </fieldset>

      <fieldset>
        <legend>Textarea</legend>
        <textarea name="message" rows="10" cols="30">
          The cat was playing in the garden.
        </textarea>
      </fieldset>

      <fieldset>
        <legend>Password</legend>
        <label for="username">Username:</label><br />
        <input type="text" id="username" name="login" value="login" /><br />
        <label for="pwd">Password:</label><br />
        <input type="password" id="pwd" name="pwd" value="password" />
      </fieldset>

      <fieldset>
        <legend>Color</legend>
        <label for="favcolor">Select your favorite color:</label>
        <input type="color" id="favcolor" name="favcolor" value="#ff0000" />
      </fieldset>

      <fieldset>
        <legend>Date</legend>
        <label for="birthday">Birthday:</label>
        <input type="date" id="birthday" name="birthday" min="2010-01-02" max="2025-12-31" value="2022-06-06" />
      </fieldset>

      <fieldset>
        <legend>Datetime-local</legend>
        <label for="birthdaytime">Birthday (date and time):</label>
        <input type="datetime-local" id="birthdaytime" name="birthday time" value="2022-04-08T14:18" />
      </fieldset>

      <fieldset>
        <legend>Email</legend>
        <label for="email">Enter your email:</label>
        <input type="email" id="email" name="email" value="mail@gmail.com" />
      </fieldset>

      <fieldset>
        <legend>File</legend>
        <label for="my-file">Select a file:</label>
        <input type="file" id="myfile1" name="my-file" multiple  />
        <input type="file" id="myfile2" name="my-file" multiple  />
        <input type="file" id="myfile3" name="my-file" multiple  />
      </fieldset>

      <fieldset>
        <legend>Hidden input</legend>
        <label for="notHidden">Not hidden input:</label>
        <input type="text" id="not-hidden-input" name="notHidden" value="not hidden value" /> <br />
        <label for="hidden" style="display: none;">Hidden input:</label>
        <input type="hidden" id="hidden-input" name="hidden" value="hidden value" />
      </fieldset>

      <fieldset>
        <legend>Month</legend>
        <label for="bdaymonth">Birthday (month and year):</label>
        <input type="month" id="bdaymonth" name="bdaymonth" value="2022-05" />
      </fieldset>

      <fieldset>
        <legend>Number</legend>
        <label for="quantity">Quantity (between 1 and 5):</label>
        <input type="number" id="quantity" name="quantity" min="1" max="5" value="3" />
      </fieldset>

      <fieldset>
        <legend>Range</legend>
        <label for="vol">Volume (between 0 and 50):</label>
        <input type="range" id="vol" name="vol" min="0" max="50" value="10" />
      </fieldset>

      <fieldset>
        <legend>Search</legend>
        <label for="gsearch">Search Google:</label>
        <input type="search" id="gsearch" name="gsearch" value="how to cook pasta" />
      </fieldset>

      <fieldset>
        <legend>Tel</legend>
        <label for="phone">Enter your phone number:</label>
        <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value="123-45-678" />
      </fieldset>

      <fieldset>
        <legend>Time</legend>
        <label for="time">Select a time:</label>
        <input type="time" id="time" name="time" value="20:46" />
      </fieldset>

      <fieldset>
        <legend>Url</legend>
        <label for="homepage">Add your homepage:</label>
        <input type="url" id="homepage" name="homepage" value="https://myvocab.org" />
      </fieldset>

      <fieldset>
        <legend>Week</legend>
        <label for="week">Select a week:</label>
        <input type="week" id="week" name="week" value="2022-W15" />
      </fieldset>


      <button>Submit button</button>
      <input type="submit" value="Submit input" />
      <input type="reset" value="Reset to default values" />
      </form> 
      `}</Code>

      <Form />

      <H>API route in NextJS</H>

      <Code block js>{`
      // pages\\api\\action_for_inputs_post.js
      export default function handler(req, res) {
        res.status(200).json(req.body)
      }
      `}</Code>

      <H>Output</H>

      <LazyImg path='/imgs/next/post_api_route_for_form_in_next.png'/>
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
