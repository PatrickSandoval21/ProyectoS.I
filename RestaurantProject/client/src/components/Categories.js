import React, {useState} from 'react';
import '../styles/Category.css';
import Category from './Category';

function Categories(){

    const [categories, setCategories] = useState([]);
    fetch('http://localhost:3001/categories')
    .then(respond => respond.json())
    .then(categories => setCategories(categories))


    return(
        <Category categories={categories}/>
    );
}
export default Categories;