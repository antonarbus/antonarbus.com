import { Code, H, Lnk, useState, jsxToStr } from '/components/post/reExport'

function Component() {
  const [values, setValues] = useState({ first: '', last: '', age: '' })
  const updateValues = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  return (
    <>
      <input type="text" name="first" value={values.first} onChange={updateValues} placeholder='first name' /> <br />
      <input type="text" name="last" value={values.last} onChange={updateValues} placeholder='last name' /> <br />
      <input type="number" name="age" value={values.age} onChange={updateValues} placeholder='age' /> <br />
      <div><h5>{'values state object: '}</h5>{JSON.stringify(values)}</div>
    </>
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

      <p>
        Good <Lnk url="https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react">article</Lnk>{' '}
        how to control multiple inputs with React without creating state variable for every input field.
      </p>

      <Code block jsx>{`
      function Component() {
        const [values, setValues] = useState({ first: '', last: '', age: '' })
        const updateValues = (e) => setValues({ ...values, [e.target.name]: e.target.value })

        return (
          <>
            <input type="text" name="first" value={values.first} onChange={updateValues} placeholder='first name' /> <br />
            <input type="text" name="last" value={values.last} onChange={updateValues} placeholder='last name' /> <br />
            <input type="number" name="age" value={values.age} onChange={updateValues} placeholder='age' /> <br />
            <div><h5>{'values state object: '}</h5>{JSON.stringify(values)}</div>
          </>
        )
      }
      `}</Code>

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
