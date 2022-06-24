//AQUI FUNCIONES PARA DESCONGETIONAR EL REDUCER

//DEJO MIS HELPERS DEL PI DE POKEMONS POR SI QUIERES TENER REFENRENCIA

//CODIGO DE NUESTRO PROYECTO AQUI:

//

//

//

//HELPERS DE EJEMPLO:
//======//DESCOMENTA PARA VERLO MEJOR Y LUEGO NO TE OLVIDES DE COMENTARLA//
/* 
export function filter(criteria, object) {
  if (criteria === "byUser") {
    return object.filter((p) => p.createdByUser === true);
  }
  if (criteria === "byDb") {
    return object.filter((p) => !p.createdByUser);
  } else {
    let pokefiltered = object.filter((p) => p.types.includes(criteria));
    if (pokefiltered.length > 0) return pokefiltered;
    return object;
  }
}
 */
/* 
export function sorter(criteria, object) {
  switch (criteria) {
    case "ascName":
      return object.sort((a, b) => a.name.localeCompare(b.name));
    case "descName":
      return object.sort((a, b) => b.name.localeCompare(a.name));
    case "ascAttack":
      return object.sort((a, b) => {
        return b.attack - a.attack;
      });
    case "descAttack":
      return object.sort((a, b) => {
        return a.attack - b.attack;
      });
    default:
      return object;
  }
}
 */
