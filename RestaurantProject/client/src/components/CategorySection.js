import React from 'react'
import Categories from './Categories';

function CategorySection(){
    return(
        <div className = "categorySection">
            <div className="image_background">
              <div className="eslogan">
                  <h1>La comida más rápida, para el hambre instantáneo</h1>
                  <p>"Algunas comidas han tenido un aspecto tan horrible que han parecido algo que el perro ha traído a casa,
                  pero después de una cucharada me he quedado comiendo mis pensamientos, mis palabras y mi comida y he vuelto
                  a por la segunda."</p>
              </div>
            </div>
            <h1 className="titleCatSection">Contamos con Categorias de Comida:</h1>
            <Categories/>
        </div>
    )
}
export default CategorySection;