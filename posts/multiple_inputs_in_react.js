import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

function Component() {
  // const handleInputValueChange = (e) => {
  //   const target = (e.target)
  //   setInputValue({ ...inputValue, [target.name]: target.value })
  // }

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
        <label htmlFor="age">age:</label><br />
        <input type="number" id="age" name="user" defaultValue="35" />
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

      <button>Submit button</button>
      <input type="submit" defaultValue="Submit input" />
      <input type="reset" defaultValue="Reset to default values" />

    </form>
  )
}

const postObj = {
  title: 'multiple inputs in react',
  date: '2022.10.14',
  tags: ['React', 'state'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'multiple inputs in react',
  body: (
    <>
      <H>one useState for multiple inputs</H>

      <Component />

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
