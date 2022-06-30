import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik'// es un componente con el que encerramos el formulario
import axios from 'axios'
import { useDispatch } from "react-redux";
import { updateUser } from '../../Redux/actions';
import { useRef } from 'react';


//Formik identifica todos los inputs con ese NAME
// renderer prop: renderizamos el formulario dentro de una funcion y por ahi le vamos a pasar props(valores) de Formik
// Como es una funcion le puedo poner props e ingreso poniendo props.handleSubmit o sino {}



const Formu = () => {
	const dispatch = useDispatch();
	const [image, setImage] = useState('')

	const fileInput = useRef()

	const uploadImage = () => {
		const formData = new FormData()
		formData.append('file', image)
		formData.append('upload_preset', 'yqu5aezb')
		console.log(formData)
		axios.post('https://api.cloudinary.com/v1_1/henrymatch/image/upload', formData)
			.then(res => {
				console.log(res.data.url, "URL DE LA IMAGEN")
			}
			)
		fileInput.current.value = null;
	}

	return (
		<>
			<Formik

				initialValues={{
					name: "",
					email: "",
					age: "",
					birthday: "",
					nickname: "",
					password: "",
					gender: "",
					genderInt: "",
					henryLevel: "",
					description: ""
				}}

				validate={(valores) => {
					console.log(valores)

					let errores = {};

					if (!valores.name) {
						errores.name = 'Por favor ingresa un nombre'
					} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
						errores.name = 'El nombre solo puede contene letras y espacios'
					}
					if (!valores.email) {
						errores.email = 'Por favor ingresa un correo electronico'
					} else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
						errores.email = 'El correo solo puede contene letras, numeros, puntos, guiones y guion bajo.'
					}
					if (!valores.age) {
						errores.age = 'Por favor ingrese la edad'
					} else if (!/[0-9]+/.test(valores.age)) {
						errores.age = 'El campo solo admite numeros'
					}
					if (!valores.birthday) {
						errores.birthday = 'Por favor ingresa una fecha de nacimiento'
					} else if (!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(valores.birthday)) {
						errores.birthday = 'Ingrese correctamente la fecha de nacimiento'
					}
					if (!valores.password) {
						errores.password = 'Por favor escribe una contraseña'
					} else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(valores.password)) {
						errores.password = 'La contraseña debe contener al menos: 8 caracteres, mayusculas, minusculas y numeros'
					}
					if (!valores.gender) {
						errores.gender = 'Por favor selecciona un genero'
					}
					if (!valores.genderInt) {
						errores.genderInt = 'Por favor selecciona un genero de interes'
					}
					if (!valores.henryLevel) {
						errores.henryLevel = 'Por favor selecciona una opcion'
					}
					if (!valores.description) {
						errores.description = 'Por favor escribe una descripcion acerca de ti'
					}
					// FALTA VER VALIDACION DEL NIKNAME CON EL ESTADO DE TODOS LOS USUARIOS DE LA DB !!!!!!


					return errores;
				}}

				onSubmit={(valores, { resetForm }) => {
					dispatch(updateUser(valores))
					resetForm();
					alert('Solicitud de actualizacion enviada')
				}}
			>
				{({ errors }) => (
					<Form className='formulario'>
						<div>
							<label htmlFor='name'>Nombre</label>
							<Field
								input='text'
								name='name'
								placeholder='Escribe un nombre..' />
							<ErrorMessage name='name' component={() => (<div className='error'>{errors.name}</div>)} />
						</div>
						<div>
							<label>Correo electronico</label>
							<Field
								type="email"
								name="email"
								placeholder="correo@correo.com"
							/>
							<ErrorMessage name='email' component={() => (<div className='error'>{errors.email}</div>)} />
						</div>
						<div>
							<label htmlFor='age'>Edad</label>
							<Field
								input='number'
								name='age'
								placeholder="Escribe tu edad"
							/>
							<ErrorMessage name='age' component={() => (<div className='error'>{errors.age}</div>)} />
						</div>

						<div>
							<label> Fecha de nacimiento</label>
							<Field
								type="text"
								name="birthday"
								placeholder='dd/mm/aaaa'
							/>
							<ErrorMessage name='birthday' component={() => (<div className='error'>{errors.birthday}</div>)} />
						</div>
						<div>
							<label>Nombre de Usuario</label>
							<Field
								type="text"
								name="nickname"
								placeholder="Escribe un nombre de usurario"
							/>
						</div>

						<div>
							<label>Contraseña</label>
							<Field
								type="password"
								name="password"
								placeholder="............"
							/>
							<ErrorMessage name='password' component={() => (<div className='error'>{errors.password}</div>)} />
						</div>

						<div>
							<label>Me identifico como...</label>
							<label>
								<Field type='radio' name="gender" value='hombre' />  Hombre
							</label>
							<label>
								<Field type='radio' name="gender" value='mujer' />  Mujer
							</label>
							<ErrorMessage name='gender' component={() => (<div className='error'>{errors.gender}</div>)} />
						</div>

						<div>
							<label>Busco encontrarme con...</label>
							<label>
								<Field type='radio' name="genderInt" value='hombres' />  Hombres
							</label>
							<label>
								<Field type='radio' name="genderInt" value='mujeres' />  Mujeres
							</label>
							<label>
								<Field type='radio' name="genderInt" value='ambos' />  Ambos
							</label>
							<ErrorMessage name='genderInt' component={() => (<div className='error'>{errors.genderInt}</div>)} />
						</div>

						<div>
							<label>Estapa del Bootcamp</label>

							<Field name="henryLevel" as='select'>
								<option value='m1'>M 1</option>
								<option value='m2'>M 2</option>
								<option value='m3'>M 3</option>
								<option value='m4'>M 4</option>
								<option value='m5'>M 5</option>
								<option value='m6'>M 6</option>
								<option value='graduado'>Graduado</option>
							</Field>
							<ErrorMessage name='henryLevel' component={() => (<div className='error'>{errors.henryLevel}</div>)} />
						</div>
						<div>
							<label>Sobre mi:</label>{" "}

							<Field
								name="description"
								as='textarea'
								placeholder="Mensaje" />
							<ErrorMessage name='description' component={() => (<div className='error'>{errors.description}</div>)} />
						</div>

						<div >
							<input type="file" ref={fileInput} onChange={(event) => { setImage(event.target.files[0]) }} />
						</div>

						<button type='submit' onClick={uploadImage}>Actualizar Datos</button>

					</Form>)}
			</Formik>
		</>
	);
}


export default Formu;
