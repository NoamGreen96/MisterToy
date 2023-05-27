import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Select } from "antd"

import { toyService } from "../services/toys.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

const { Option } = Select

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const navigate = useNavigate()
  const { toyId } = useParams()

  useEffect(() => {
    if (!toyId) return
    loadToys()
  }, [])

  function loadToys() {
    toyService.getById(toyId)
      .then((toy) => setToyToEdit(toy))
      .catch((err) => {
        console.log('Had issues in toy details', err)
        navigate('/toy')
      })
  }

  function handleChange({ target }) {
    let { value, type, name: field } = target
    value = type === 'number' ? +value : value
    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    toyService.save(toyToEdit)
      .then((toy) => {
        console.log('toy saved', toy)
        showSuccessMsg('Toy saved!')
        navigate('/toy')
      })
      .catch(err => {
        console.log('err', err)
        showErrorMsg('Cannot save toy')
      })
  }

  return <section className="toy-edit">
    <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>

    <form onSubmit={onSaveToy}>
      <label htmlFor="name">Toy name : </label>
      <input type="text"
        name="name"
        id="name"
        placeholder="Enter toy name..."
        value={toyToEdit.name}
        onChange={handleChange}
      />
      <label htmlFor="price">Price : </label>
      <input type="number"
        name="price"
        id="price"
        placeholder="Enter price"
        value={toyToEdit.price}
        onChange={handleChange}
      />
      <div>
        <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
        <Link to="/toy">Cancel</Link>
      </div>
    </form>
  </section>
}
// Try to do the formik

// export function ToyEdit() {
//   const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
//   const navigate = useNavigate()
//   const { toyId } = useParams()


//   const labelOptions = [
//     "On wheels",
//     "Box game",
//     "Art",
//     "Baby",
//     "Doll",
//     "Puzzle",
//     "Outdoor",
//     "Battery Powered",
//   ]

//   const validationSchema = Yup.object({
//     name: Yup.string()
//       .min(2, "Name should be at least 2 characters")
//       .max(10, "Name should be at most 10 characters")
//       .required("Name is required"),
//     price: Yup.number()
//       .min(1, "Price should be at least 1")
//       .max(150, "Price should be at most 150")
//       .required("Price is required"),
//     labels: Yup.array().min(1, 'Select at least one label'),

//   })

//   const formik = useFormik({
//     initialValues: {
//       _id: toyId || "",
//       name: toyToEdit.name || "",
//       price: toyToEdit.price || "",
//       labels: toyToEdit.labels || [],
//     },
//     validationSchema,
//     onSubmit: onSaveToy,
//   })

//   useEffect(() => {
//     if (!toyId) return
//     loadToys()
//   }, [])

//   function loadToys() {
//     toyService
//       .getById(toyId)
//       .then((toy) => setToyToEdit(toy))
//       .catch((err) => {
//         console.log("Had issues in toy details", err)
//         navigate("/toy")
//       })
//   }

//   function handleChange({ target }) {
//     let { value, type, name: field } = target
//     value = type === "number" ? +value : value
//     setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
//   }

//   function onSaveToy() {
//     setToyToEdit((prevToy) => ({ ...prevToy, ...formik.values }))
//     console.log(toyToEdit)
//     console.log('formik.values', formik.values)
//     toyService
//       .save(toyToEdit)
//       .then((toy) => {
//         console.log("toy saved", toy)
//         showSuccessMsg("Toy saved!")
//         navigate("/toy")
//       })
//       .catch((err) => {
//         console.log("err", err)
//         showErrorMsg("Cannot save toy")
//       })
//   }
//   return (
//     <section className="toy-edit">
//       <h2>{toyToEdit.id ? "Edit this toy" : "Add a new toy"}</h2>

//       <form onSubmit={formik.handleSubmit}>
//         <label htmlFor="name">Toy name : </label>
//         <input
//           type="text"
//           name="name"
//           id="name"
//           placeholder="Enter toy name..."
//           value={formik.values.name}
//           onChange={formik.handleChange}
//         />
//         {formik.errors.name && formik.touched.name && (
//           <div>{formik.errors.name}</div>
//         )}

//         <label htmlFor="price">Price : </label>
//         <input
//           type="number"
//           name="price"
//           id="price"
//           placeholder="Enter price"
//           value={formik.values.price}
//           onChange={formik.handleChange}
//         />
//         {formik.errors.price && formik.touched.price && (
//           <div>{formik.errors.price}</div>
//         )}

//         <label htmlFor="labels">Labels:</label>
//         <Select
//           name="labels"
//           id="labels"
//           value={formik.values.labels}
//           onChange={(values) => formik.setFieldValue("labels", values)}
//           onBlur={formik.handleBlur}
//           mode="multiple"
//           style={{ width: "100%" }}
//         >
//           {labelOptions.map((label) => (
//             <Option key={label} value={label}>
//               {label}
//             </Option>
//           ))}
//         </Select>
//         {formik.errors.labels && formik.touched.labels && (
//           <div>{formik.errors.labels}</div>
//         )}

//         <div>
//           <button type="submit">
//             {toyToEdit._id ? "Save" : "Add"}
//           </button>
//           <Link to="/toy">Cancel</Link>
//         </div>
//       </form>
//     </section>
//   )
// }