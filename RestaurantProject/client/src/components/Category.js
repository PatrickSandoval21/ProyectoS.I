import React from 'react';
import imagenes from '../images/categories/images';
import '../styles/Category.css';

function Category({categories}){

    return(
        <div className="categories_container">    
            {categories.map( (categories,index) => {
                return(
                <div className="category" key={categories.category_id.toString()}>
                    <img alt= "category_image" src = {imagenes[index]} className="category_img" /> 
                    <div className="category_info">
                        <h2 className="category_title">{categories.category_name}</h2> 
                    </div>
                </div>  
                );
            })}           
        </div>              
    );
}
export default Category;


