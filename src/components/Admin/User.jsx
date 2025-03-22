import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'

export default function User() {

  const [loading, setLoading] = React.useState(false)

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { name: '', email: '', password: '' },
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const CreateAPI = await axios.post('http://localhost:3000/createUSer', values)
        if (CreateAPI.status === 200 || CreateAPI.status === 201) alert('User Created')

      }
      catch (e) { alert(e.CreateAPI?.data?.msg) }
      finally { setLoading(false) }
    }

  })

  const data = [
    { name: 'name', label: 'Name', },
    { name: 'email', label: 'Email', },
    { name: 'password', label: 'Password', },

  ]

  console.log(values)

  return (

    <form className='pt-32 bg-amber-500 flex flex-col gap-5' action="" onSubmit={handleSubmit}>
      {
        data.map(({ name, label, password }, key) => {
          return (
            <input key={key} type="text" value={values[name]}
              name={name} onChange={handleChange} placeholder={label} />
          )
        })
      }

      <button type="submit">
        {
          loading ? 'Submiting...' : 'Submit'
        }
      </button>

    </form>
  )
}
