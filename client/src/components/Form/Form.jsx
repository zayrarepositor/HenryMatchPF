import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik"; // es un componente con el que encerramos el formulario
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateImg, updateUser } from "../../Redux/actions";
import { useRef } from "react";
import "./Form.css";

//Formik identifica todos los inputs con ese NAME
// renderer prop: renderizamos el formulario dentro de una funcion y por ahi le vamos a pasar props(valores) de Formik
// Como es una funcion le puedo poner props e ingreso poniendo props.handleSubmit o sino {}

const Formu = ({ setUpdate }) => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const [image, setImage] = useState("");

  const fileInput = useRef();

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "yqu5aezb");
    await axios
      .post("https://api.cloudinary.com/v1_1/henrymatch/image/upload", formData)
      .then((res) => {
        const urlImage = res.data.url;
        dispatch(updateImg(userDetail._id, { image: urlImage }));
        setUpdate(true);
        alert("Imagen cargada con exito");
      });
    fileInput.current.value = null;
  };

  return (
    <>
      <div>
        <div>
          <input
            className="selectAr"
            type="file"
            ref={fileInput}
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
          <button className="cargar" onClick={uploadImage}>
            Cargar Imagen
          </button>
        </div>
      </div>
      <Formik
        initialValues={{
          name: "",
          // email: "",
          // age: "",
          // birthday: "",
          // nickname: "",
          // password: "",
          gender: "",
          genderInt: "",
          henryLevel: "",
          description: "",
        }}
        validate={(valores) => {
          let errores = {};

          if (!valores.name) {
            errores.name = "Por favor ingresa un nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
            errores.name = "El nombre solo puede contene letras y espacios";
          }

          // if (!valores.age) {
          // 	errores.age = 'Por favor ingrese la edad'
          // } else if (!/[0-9]+/.test(valores.age)) {
          // 	errores.age = 'El campo solo admite numeros'
          // }
          // if (!valores.birthday) {
          // 	errores.birthday = 'Por favor ingresa una fecha de nacimiento'
          // } else if (!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(valores.birthday)) {
          // 	errores.birthday = 'Ingrese correctamente la fecha de nacimiento'
          // }

          if (!valores.gender) {
            errores.gender = "Por favor selecciona un genero";
          }
          if (!valores.genderInt) {
            errores.genderInt = "Por favor selecciona un genero de interes";
          }

          if (!valores.henryLevel) {
            errores.henryLevel = "Por favor selecciona una opcion";
          }
          if (!valores.description) {
            errores.description =
              "Por favor escribe una descripcion acerca de ti";
          }
          // FALTA VER VALIDACION DEL NIKNAME CON EL ESTADO DE TODOS LOS USUARIOS DE LA DB !!!!!!

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          dispatch(updateUser(userDetail._id, valores));
          resetForm();
          setUpdate(true);
          alert("Solicitud de actualizacion enviada");
        }}>
        {({ errors }) => (
          <Form className="formulario">
            <div>
              <label htmlFor="name">El Nombre que quieres mostrar</label>
              <Field
                input="text"
                name="name"
                placeholder="Escribe un nombre.."
              />
              <ErrorMessage
                name="name"
                component={() => <div className="error">{errors.name}</div>}
              />
            </div>

            {/* <div>
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
						</div> */}
            {/* <div>
							<label>Nombre de Usuario</label>
							<Field
								type="text"
								name="nickname"
								placeholder="Escribe un nombre de usurario"
							/>
						</div> */}

            <div>
              <label>Me identifico como...</label>
              <label>
                <Field type="radio" name="gender" value="male" /> Hombre
              </label>
              <label>
                <Field type="radio" name="gender" value="female" /> Mujer
              </label>
              <ErrorMessage
                name="gender"
                component={() => <div className="error">{errors.gender}</div>}
              />
            </div>

            <div>
              <label>Busco encontrarme con...</label>
              <label>
                <Field type="radio" name="genderInt" value="male" /> Hombres
              </label>
              <label>
                <Field type="radio" name="genderInt" value="female" /> Mujeres
              </label>
              <label>
                <Field type="radio" name="genderInt" value="both" /> Ambos
              </label>
              <ErrorMessage
                name="genderInt"
                component={() => (
                  <div className="error">{errors.genderInt}</div>
                )}
              />
            </div>

            <div>
              <label>Estapa del Bootcamp</label>

              <Field name="henryLevel" as="select">
                <option value="m1">M 1</option>
                <option value="m2">M 2</option>
                <option value="m3">M 3</option>
                <option value="m4">M 4</option>
                <option value="m5">M 5</option>
                <option value="m6">M 6</option>
                <option value="graduado">Graduado</option>
              </Field>
              <ErrorMessage
                name="henryLevel"
                component={() => (
                  <div className="error">{errors.henryLevel}</div>
                )}
              />
            </div>
            <div>
              <label>Sobre mi:</label>{" "}
              <Field name="description" as="textarea" placeholder="Mensaje" />
              <ErrorMessage
                name="description"
                component={() => (
                  <div className="error">{errors.description}</div>
                )}
              />
            </div>
            <button type="submit">Actualizar Datos</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Formu;
