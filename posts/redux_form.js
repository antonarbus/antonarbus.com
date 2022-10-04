import { Code, H, Lnk, jsxToStr, LazyImg } from '/components/post/reExport'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reduxForm, reducer as form, Field } from 'redux-form'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  form
})

const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

function UserFormComponent({ handleSubmit, change }) {
  return (
    <form
      onSubmit={handleSubmit(vals => {
        alert(JSON.stringify(vals))
      })}
    >
      <fieldset>
        <legend>Contacts</legend>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
        </div>
        <button type="submit">Submit</button> <br />
        <button
          onClick={e => {
            e.preventDefault()
            change('firstName', 'Jane')
          }}
        >
          Change name programmatically
        </button>
      </fieldset>
    </form>
  )
}

const FormWithReduxForm = reduxForm({ form: 'myUserForm' })(UserFormComponent)

const postObj = {
  title: 'redux-form',
  date: '2021.10.14',
  tags: ['react', 'redux'],
  desc: 'redux-form',
  imgUrl: 'https://antonarbus.com/imgs/redux.png',
  body: (
    <>
      <H>Redux-form</H>

      <ul>
        <li> <Lnk path="https://redux-form.com/">https://redux-form.com/</Lnk> </li>
        <li> <Code bash>npm i redux-form</Code> </li>
      </ul>

      <Code block jsx>{`
      import { Code, H, Lnk, jsxToStr, LazyImg } from '/components/post/reExport'
      import { combineReducers } from 'redux'
      import { Provider } from 'react-redux'
      import { reduxForm, reducer as form, Field } from 'redux-form'
      import { configureStore } from '@reduxjs/toolkit'

      const rootReducer = combineReducers({
        form,
      })

      const store = configureStore({
        reducer: rootReducer,
        devTools: true,
      })

      function UserFormComponent({ handleSubmit, change }) {
        return (
          <form
            onSubmit={handleSubmit(vals => {
              alert(JSON.stringify(vals))
            })}
          >
            <fieldset>
              <legend>Contacts</legend>
              <div>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" component="input" type="text" />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" component="input" type="text" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component="input" type="email" />
              </div>
              <button type="submit">Submit</button> <br />
              <button
                onClick={e => {
                  e.preventDefault()
                  change('firstName', 'Jane')
                }}
              >
                Change name programmatically
              </button>
            </fieldset>
          </form>
        )
      }

      const FormWithReduxForm = reduxForm({ form: 'myUserForm' })(UserFormComponent)

      <Provider store={store}>
        <FormWithReduxForm />
      </Provider>
      `}</Code>

      <LazyImg path="/imgs/redux/redux-form-store.png" />

      <Provider store={store}>
        <FormWithReduxForm />
      </Provider>
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
